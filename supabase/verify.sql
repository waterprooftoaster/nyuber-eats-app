-- Step 9: Verification queries (run manually in SQL Editor after applying migrations)
-- These are SELECT-only checks; they do not modify data.

-- 1. Verify all tables exist
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('profiles', 'schools', 'restaurants', 'menu_items')
order by table_name;

-- 2. Verify RLS is enabled on all tables
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('profiles', 'schools', 'restaurants', 'menu_items');

-- 3. Verify indexes exist
select indexname, tablename
from pg_indexes
where schemaname = 'public'
order by tablename, indexname;

-- 4. Verify triggers exist
select trigger_name, event_object_table, action_timing, event_manipulation
from information_schema.triggers
where trigger_schema = 'public'
order by event_object_table, trigger_name;

-- 5. Verify utility functions exist
select routine_name
from information_schema.routines
where routine_schema = 'public'
  and routine_name in ('set_updated_at', 'handle_new_user');

-- 6. Verify RLS policies
select policyname, tablename, cmd
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
