-- DAVIDEL CMS — Supabase schema
-- Execute this file once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null,
  name_he text not null,
  description_fr text not null default '',
  description_he text not null default '',
  price numeric(10,2) not null default 0 check (price >= 0),
  image_url text not null default '',
  active boolean not null default true,
  unavailable_label boolean not null default false,
  position integer not null default 0,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null,
  name_he text not null,
  slug text unique not null,
  position integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_categories (
  product_id uuid not null references public.products(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key(product_id, category_id)
);

create table if not exists public.occasions (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null,
  name_he text not null,
  description_fr text not null default '',
  description_he text not null default '',
  image_url text not null default '',
  active boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.occasion_products (
  occasion_id uuid not null references public.occasions(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  primary key(occasion_id, product_id)
);

create table if not exists public.settings (
  id integer primary key default 1 check (id = 1),
  phone text not null default '',
  whatsapp text not null default '',
  email text not null default '',
  address_fr text not null default '',
  address_he text not null default '',
  instagram text not null default '',
  opening_hours jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.settings(id) values (1) on conflict (id) do nothing;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create or replace trigger products_updated_at before update on public.products
for each row execute function public.set_updated_at();
create or replace trigger categories_updated_at before update on public.categories
for each row execute function public.set_updated_at();
create or replace trigger occasions_updated_at before update on public.occasions
for each row execute function public.set_updated_at();
create or replace trigger settings_updated_at before update on public.settings
for each row execute function public.set_updated_at();

create or replace function public.is_davidel_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_davidel_admin() from public;
grant execute on function public.is_davidel_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.product_categories enable row level security;
alter table public.occasions enable row level security;
alter table public.occasion_products enable row level security;
alter table public.settings enable row level security;

-- Admin can verify their own membership.
drop policy if exists "admin reads self" on public.admin_users;
create policy "admin reads self" on public.admin_users for select to authenticated
using (user_id = auth.uid());

-- Public site may only read content intended for display.
drop policy if exists "public reads active products" on public.products;
create policy "public reads active products" on public.products for select to anon, authenticated
using (active = true or public.is_davidel_admin());

drop policy if exists "public reads active categories" on public.categories;
create policy "public reads active categories" on public.categories for select to anon, authenticated
using (active = true or public.is_davidel_admin());

drop policy if exists "public reads active occasions" on public.occasions;
create policy "public reads active occasions" on public.occasions for select to anon, authenticated
using (active = true or public.is_davidel_admin());

drop policy if exists "public reads settings" on public.settings;
create policy "public reads settings" on public.settings for select to anon, authenticated using (true);

drop policy if exists "public reads product categories" on public.product_categories;
create policy "public reads product categories" on public.product_categories for select to anon, authenticated using (true);

drop policy if exists "public reads occasion products" on public.occasion_products;
create policy "public reads occasion products" on public.occasion_products for select to anon, authenticated using (true);

-- Only DAVIDEL admins can mutate CMS data.
do $$
declare t text;
begin
  foreach t in array array['products','categories','product_categories','occasions','occasion_products','settings'] loop
    execute format('drop policy if exists "admin inserts" on public.%I', t);
    execute format('drop policy if exists "admin updates" on public.%I', t);
    execute format('drop policy if exists "admin deletes" on public.%I', t);
    execute format('create policy "admin inserts" on public.%I for insert to authenticated with check (public.is_davidel_admin())', t);
    execute format('create policy "admin updates" on public.%I for update to authenticated using (public.is_davidel_admin()) with check (public.is_davidel_admin())', t);
    execute format('create policy "admin deletes" on public.%I for delete to authenticated using (public.is_davidel_admin())', t);
  end loop;
end $$;

-- Storage bucket for product and occasion photos.
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('davidel-media','davidel-media',true,10485760,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true, file_size_limit=10485760, allowed_mime_types=array['image/jpeg','image/png','image/webp'];

drop policy if exists "public reads davidel media" on storage.objects;
create policy "public reads davidel media" on storage.objects for select to public
using (bucket_id = 'davidel-media');

drop policy if exists "admins upload davidel media" on storage.objects;
create policy "admins upload davidel media" on storage.objects for insert to authenticated
with check (bucket_id='davidel-media' and public.is_davidel_admin());

drop policy if exists "admins update davidel media" on storage.objects;
create policy "admins update davidel media" on storage.objects for update to authenticated
using (bucket_id='davidel-media' and public.is_davidel_admin())
with check (bucket_id='davidel-media' and public.is_davidel_admin());

drop policy if exists "admins delete davidel media" on storage.objects;
create policy "admins delete davidel media" on storage.objects for delete to authenticated
using (bucket_id='davidel-media' and public.is_davidel_admin());

-- Initial categories.
insert into public.categories(name_fr,name_he,slug,position,active) values
('Individuel','ליחיד','individuel',1,true),
('Grand format','פורמט גדול','grand',2,true),
('Salé','מלוח','sale',3,true),
('Sucré','מתוק','sucre',4,true),
('Événement','אירועים','evenement',5,true)
on conflict (slug) do nothing;

-- IMPORTANT AFTER CREATING THE AUTH USER:
-- Copy the user's UUID from Authentication > Users and execute:
-- insert into public.admin_users(user_id) values ('THE-ADMIN-USER-UUID');
