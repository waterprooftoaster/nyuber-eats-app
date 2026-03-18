-- Step 4: Schools table
-- Each university/college is a school. The slug (e.g. "nyu") enables clean lookups.

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
