-- Step 9: Location — PostGIS extension, coordinate columns, nearby RPC

-- Enable PostGIS in the extensions schema (Supabase default)
create extension if not exists postgis schema extensions;

-- Add coordinate columns with domain CHECK constraints and a stored generated
-- geography column so the GiST index targets a real column (not a functional
-- expression), which gives the planner an unambiguous index to use for both
-- ST_DWithin range filtering and <-> KNN ordering.
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

-- GiST index on the generated column, scoped to active restaurants.
create index restaurants_location_gist_idx
  on public.restaurants
  using gist (location)
  where is_active = true;

-- RPC: returns active restaurants within radius_km, ordered by distance.
--
-- SECURITY DEFINER bypasses RLS; the `is_active` filter below is therefore
-- load-bearing — do not remove it when editing this function.
--
-- search_path is locked to {public, extensions} to prevent schema-injection
-- attacks where a shadowed name would execute under definer privileges.
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

-- Restrict to authenticated users only; revoke the default PUBLIC grant.
revoke execute
  on function public.find_nearby_restaurants(double precision, double precision, double precision)
  from public;

grant execute
  on function public.find_nearby_restaurants(double precision, double precision, double precision)
  to authenticated;
