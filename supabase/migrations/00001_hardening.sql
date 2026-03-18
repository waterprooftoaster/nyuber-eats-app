-- Step 2: Database hardening
-- Prevents authenticated users from creating rogue tables
-- and stops runaway queries from blocking the connection pool.

revoke create on schema public from public;
alter role authenticated set statement_timeout = '5s';
alter role anon set statement_timeout = '3s';
