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
            <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">

                {/* ================= Top Navbar (Simplified) ================= */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                    <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
                        <Link href="/" className="text-2xl font-black tracking-widest text-blue-900 uppercase">
                            LR Products
                        </Link>
                        <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            ← Back to Catalog
                        </Link>
                    </div>
                </header>

                {/* ================= Breadcrumbs ================= */}
                <div className="container mx-auto max-w-7xl px-6 py-6 text-sm text-gray-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>›</span>
                    <Link href="/" className="hover:text-blue-600 transition-colors">All products</Link>
                    <span>›</span>
                    <span className="text-gray-900 font-semibold capitalize">{product.title}</span>
                </div>

                {/* ================= Product Details ================= */}
                <main className="container mx-auto max-w-6xl px-6 pb-20">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">

                        {/* Image Section */}
                        <div className="md:w-1/2 bg-gray-50 p-12 flex items-center justify-center">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full max-w-sm object-contain hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
                                {product.category}
                            </span>

                            <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex items-end gap-4 mb-8">
                                <span className="text-5xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-lg text-green-600 font-semibold mb-1 bg-green-50 px-2 py-1 rounded">
                                        -{product.discountPercentage}% OFF
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-10 text-sm">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-500 mb-1">Brand</p>
                                    <p className="font-bold text-gray-900">{product.brand || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-500 mb-1">Rating</p>
                                    <p className="font-bold text-gray-900">⭐ {product.rating} / 5</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-500 mb-1">Stock Status</p>
                                    <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-auto pt-6 border-t border-gray-100">
                                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
                                    Add to Cart
                                </button>

                                {/* زر الحذف يظهر فقط للأدمن */}
                                <DeleteProductButton id={product.id} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    } catch {
        notFound();
    }
}