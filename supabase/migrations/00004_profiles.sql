-- Step 5: Profiles table
-- Extends Supabase Auth's auth.users with app-specific fields.
-- Auto-created on signup via trigger.

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
