-- Step 7: Menu items table
-- Food items at each restaurant. Prices stored as integer cents
-- (e.g. $4.50 = 450) to avoid floating-point rounding errors.

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

-- Partial index optimizes "show me available items at this restaurant"
create index menu_items_restaurant_available_idx
  on public.menu_items (restaurant_id) where is_available = true;

create trigger menu_items_set_updated_at
  before update on public.menu_items
  for each row execute function public.set_updated_at();
