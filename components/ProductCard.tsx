import Link from 'next/link';
import type { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`} className="card bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-200 rounded-lg overflow-hidden block">
            <figure className="h-48 bg-gray-50 flex items-center justify-center p-4">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full object-contain"
                    referrerPolicy="no-referrer"
                />
            </figure>
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold">⭐ {product.rating.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    );
}