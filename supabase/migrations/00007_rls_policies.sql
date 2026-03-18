-- Step 8: Enable RLS and create policies

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.restaurants enable row level security;
alter table public.menu_items enable row level security;

-- Profiles: all authenticated can read; only own row for write ops
create policy profiles_select on public.profiles
  for select to authenticated using (true);

create policy profiles_update on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy profiles_insert on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

-- Schools, restaurants, menu_items: read-only for authenticated users
create policy schools_select on public.schools
  for select to authenticated using (true);

-- Only expose active restaurants and available menu items via RLS
create policy restaurants_select on public.restaurants
  for select to authenticated using (is_active = true);

create policy menu_items_select on public.menu_items
  for select to authenticated using (is_available = true);
