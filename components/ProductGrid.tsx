import { ProductCard } from './ProductCard';
import { fetchProducts, searchProducts } from '@/lib/api';

interface Props {
    page?: number;
    limit?: number;
    search?: string;
}

export async function ProductGrid({ page = 1, limit = 10, search = '' }: Props) {
    const skip = (page - 1) * limit;

    try {
        const data = search
            ? await searchProducts(search, limit, skip)
            : await fetchProducts(limit, skip);

        if (data.products.length === 0) {
            return <div className="text-center py-12 text-xl text-gray-500">📦 No products found</div>;
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        );
    } catch (error) {
        throw new Error('Failed to load products');
    }
}