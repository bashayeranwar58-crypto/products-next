import { fetchProduct } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteProductButton } from '@/components/DeleteProductButton';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;

    try {
        const product = await fetchProduct(Number(id));

        return (
            <main className="container mx-auto p-6 max-w-4xl">
                <Link href="/" className="btn btn-ghost mb-6">← Back to Products</Link>

                <div className="card lg:card-side bg-base-100 shadow-xl border border-gray-200">
                    <figure className="lg:w-1/2 bg-base-200 p-8">
                        <img src={product.thumbnail} alt={product.title} className="h-64 object-contain" />
                    </figure>
                    <div className="card-body lg:w-1/2">
                        <h1 className="card-title text-3xl mb-2">{product.title}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="badge badge-primary badge-lg font-bold">${product.price}</span>
                            <span className="badge badge-outline badge-lg">{product.category}</span>
                            <span className="badge badge-warning badge-lg">⭐ {product.rating}</span>
                            <span className="badge badge-success text-white badge-lg">Stock: {product.stock}</span>
                        </div>

                        <div className="card-actions justify-end mt-auto">
                            <DeleteProductButton id={product.id} />
                        </div>
                    </div>
                </div>
            </main>
        );
    } catch {
        notFound();
    }
}