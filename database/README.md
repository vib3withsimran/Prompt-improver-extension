# Prompt Improver - Database & Authentication Configuration

This directory contains the database schema definitions, Row Level Security (RLS) policies, and Supabase setup instructions for authentication.

---

## 🔐 Supabase Auth Configuration (Google Login)

To enable Google OAuth inside the Chrome Extension using `chrome.identity`, perform the following configurations:

1. **Google Cloud Console Setup**:
   * Create a new project.
   * Go to **APIs & Services > Credentials** and create an **OAuth 2.0 Client ID** (Web Application).
   * Note the **Client ID** and **Client Secret** (you can use the credentials generated for your app).

2. **Supabase Provider Setup**:
   * Navigate to your **Supabase Dashboard > Auth > Providers > Google**.
   * Toggle **Enable Google Provider** to **ON**.
   * Paste your **Google Client ID** and **Client Secret** into the fields.

3. **Redirect URL Integration**:
   * Copy your extension's dynamic redirect URL format: `https://<extension-id>.chromiumapp.org/`
   * (For your current developer build ID, the redirect URL is `https://fddfdmnldbobeilkdcbklleejknblnfk.chromiumapp.org/`).
   * In your **Supabase Dashboard**, navigate to **Auth > URL Configuration**.
   * Add the redirect URL to the **Allowed Redirect URLs** list.

---

## 🗄️ SQL Schema Definitions

Run the following SQL script in your Supabase **SQL Editor** to initialize the database tables, triggers, and Row Level Security policies.

```sql
-- 1. Create Profiles Table (Linked to Supabase Auth users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  plan text default 'free' check (plan in ('free', 'premium')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Usage Quota Table
create table public.usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade unique not null,
  count integer default 0 not null,
  last_reset timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Prompt History Table
create table public.prompt_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  original_prompt text not null,
  improved_prompt text not null,
  score integer not null,
  model text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.usage enable row level security;
alter table public.prompt_history enable row level security;

-- 5. Define Security Policies (Users can only see/edit their own data)
create policy "Users can view own profile" on public.profiles 
  for select using (auth.uid() = id);

create policy "Users can view own usage logs" on public.usage 
  for select using (auth.uid() = user_id);

create policy "Users can modify own prompt history" on public.prompt_history 
  for all using (auth.uid() = user_id);

-- 6. Trigger: Automatically create profiles and usage entries on user sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  
  insert into public.usage (user_id, count)
  values (new.id, 0);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
