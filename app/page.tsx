import { auth } from '@/auth';
import { Suspense } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { AddProductButton } from '@/components/AddProductButton';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const session = await auth();
  const page = Number(params.page ?? 1);
  const search = params.search ?? '';

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
      {/* ================= Breadcrumbs ================= */}
      <div className="container mx-auto max-w-7xl px-6 py-6 text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/" className="hover:text-blue-600 transition-colors">All products</Link>
        {search && (
          <>
            <span>›</span>
            <span className="text-gray-900 font-semibold capitalize">{search}</span>
          </>
        )}
      </div>

      {/* ================= 3. Main Content ================= */}
      <main className="container mx-auto max-w-7xl px-6 pb-20 mt-2">


        {/* Products Grid */}
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <span className="animate-spin h-10 w-10 border-4 border-blue-200 border-t-blue-600 rounded-full"></span>
          </div>
        }>
          <ProductGrid page={page} search={search} />
        </Suspense>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-16">
          {page > 1 && (
            <Link href={`/?page=${page - 1}${search ? `&search=${search}` : ''}`} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-blue-50 transition-colors">
              ← Back
            </Link>
          )}
          <span className="px-6 py-2 text-gray-700 text-sm font-bold uppercase tracking-wider">
            Page {page}
          </span>
          <Link href={`/?page=${page + 1}${search ? `&search=${search}` : ''}`} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-blue-50 transition-colors">
            Next →
          </Link>
        </div>
      </main>
    </div>
  );
}