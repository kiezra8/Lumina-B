-- 1. Create the product-images bucket as a PUBLIC bucket
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- 2. Allow absolutely anyone to view/read the images (since they will be on the live website)
create policy "Public Access to product-images"
on storage.objects for select
using ( bucket_id = 'product-images' );

-- 3. Allow only logged-in users (you, the Admin) to upload new images
create policy "Authenticated users can upload images"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'product-images' );

-- 4. Allow only logged-in users to update/replace existing images
create policy "Authenticated users can update images"
on storage.objects for update
to authenticated
using ( bucket_id = 'product-images' );

-- 5. Allow only logged-in users to delete images
create policy "Authenticated users can delete images"
on storage.objects for delete
to authenticated
using ( bucket_id = 'product-images' );

-- 6. Add the missing 'description' column to the products table
alter table public.products add column if not exists description text;
