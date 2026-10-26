import Link from 'next/link';
import type { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-gray-200">
            <figure className="h-48 bg-base-200 p-4">
                <img src={product.thumbnail} alt={product.title} className="h-full object-contain" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-base">{product.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex justify-between mt-2 items-center">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    <span className="text-sm bg-yellow-100 px-2 py-1 rounded">⭐ {product.rating.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    );
}