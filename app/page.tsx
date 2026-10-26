import { Suspense } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { AddProductButton } from '@/components/AddProductButton';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search ?? '';

  return (
    <main className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-primary whitespace-nowrap">🛍️ Products</h1>

        <form className="flex-1 flex gap-2 w-full" action="/">
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search products..."
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-secondary">Search</button>
        </form>

        <AddProductButton />
      </div>

      <Suspense fallback={<div className="text-center py-12 text-xl">⏳ Loading products...</div>}>
        <ProductGrid page={page} search={search} />
      </Suspense>

      <div className="flex justify-center gap-4 mt-10">
        {page > 1 && (
          <Link href={`/?page=${page - 1}${search ? `&search=${search}` : ''}`} className="btn btn-outline">
            ← Previous
          </Link>
        )}
        <span className="btn btn-ghost cursor-default">Page {page}</span>
        <Link href={`/?page=${page + 1}${search ? `&search=${search}` : ''}`} className="btn btn-outline">
          Next →
        </Link>
      </div>
    </main>
  );
}