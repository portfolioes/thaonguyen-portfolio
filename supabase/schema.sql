create table if not exists public.portfolio_assets (
  slot_id text primary key,
  media_type text not null check (media_type in ('image', 'video')),
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  title text,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_assets enable row level security;

drop policy if exists "Portfolio assets are publicly readable" on public.portfolio_assets;
create policy "Portfolio assets are publicly readable"
on public.portfolio_assets
for select
using (true);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  314572800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

