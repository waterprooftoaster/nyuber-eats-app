-- ============================================================
-- FULL DATABASE SETUP — Run this once in Supabase SQL Editor
-- Combines all migrations (00001–00008) into one script.
-- ============================================================

-- 1: Hardening
revoke create on schema public from public;
alter role authenticated set statement_timeout = '5s';
alter role anon set statement_timeout = '3s';

-- 2: Utility functions
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
exception when others then
  raise exception 'handle_new_user failed for user %: %', new.id, sqlerrm;
end;
$$;

-- 3: Schools
create table public.schools (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger schools_set_updated_at
  before update on public.schools
  for each row execute function public.set_updated_at();

-- 4: Profiles
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 50),
  school_id    uuid references public.schools(id) on delete set null,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index profiles_school_id_idx on public.profiles (school_id);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5: Restaurants
create table public.restaurants (
  id                   uuid primary key default gen_random_uuid(),
  school_id            uuid not null references public.schools(id) on delete cascade,
  name                 text not null,
  image_url            text,
  address              text not null,
  delivery_time_label  text,
  is_active            boolean not null default true,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index restaurants_school_active_idx
  on public.restaurants (school_id) where is_active = true;

create trigger restaurants_set_updated_at
  before update on public.restaurants
  for each row execute function public.set_updated_at();

-- 6: Menu items
create table public.menu_items (
  id             uuid primary key default gen_random_uuid(),
  restaurant_id  uuid not null references public.restaurants(id) on delete cascade,
  name           text not null,
  price_cents    integer not null check (price_cents >= 0),
  image_url      text,
  is_available   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index menu_items_restaurant_available_idx
  on public.menu_items (restaurant_id) where is_available = true;

create trigger menu_items_set_updated_at
  before update on public.menu_items
  for each row execute function public.set_updated_at();

-- 7: RLS policies
alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.restaurants enable row level security;
alter table public.menu_items enable row level security;

create policy profiles_select on public.profiles
  for select to authenticated using (true);

create policy profiles_update on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy profiles_insert on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

create policy schools_select on public.schools
  for select to authenticated using (true);

create policy restaurants_select on public.restaurants
  for select to authenticated using (is_active = true);

create policy menu_items_select on public.menu_items
  for select to authenticated using (is_available = true);

-- 8: Location (PostGIS)
create extension if not exists postgis schema extensions;

alter table public.restaurants
  add column latitude  double precision
    check (latitude  between -90  and  90),
  add column longitude double precision
    check (longitude between -180 and 180),
  add column location  geography(Point, 4326)
    generated always as (
      case
        when latitude  is not null
         and longitude is not null
        then extensions.st_makepoint(longitude, latitude)::geography
      end
    ) stored;

create index restaurants_location_gist_idx
  on public.restaurants
  using gist (location)
  where is_active = true;

create or replace function public.find_nearby_restaurants(
  user_lat  double precision,
  user_lng  double precision,
  radius_km double precision
)
returns setof public.restaurants
language plpgsql
stable
security definer
set search_path = public, extensions
as $$
begin
  if radius_km <= 0 or radius_km > 50 then
    raise exception 'radius_km must be between 0 and 50, got %', radius_km;
  end if;

  return query
    select *
    from public.restaurants
    where is_active = true
      and location is not null
      and st_dwithin(
            location,
            st_makepoint(user_lng, user_lat)::geography,
            radius_km * 1000
          )
    order by
      location <-> st_makepoint(user_lng, user_lat)::geography;
end;
$$;

revoke execute
  on function public.find_nearby_restaurants(double precision, double precision, double precision)
  from public;

grant execute
  on function public.find_nearby_restaurants(double precision, double precision, double precision)
  to authenticated;
