-- Step 6: Restaurants table
-- Campus cafeterias/dining halls, each belonging to one school.
-- is_active allows soft-toggling instead of deleting rows.

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

-- Partial index optimizes "show me active restaurants at my school"
create index restaurants_school_active_idx
  on public.restaurants (school_id) where is_active = true;

create trigger restaurants_set_updated_at
  before update on public.restaurants
  for each row execute function public.set_updated_at();
