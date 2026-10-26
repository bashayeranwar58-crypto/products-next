import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container mx-auto p-6 text-center py-20">
            <h1 className="text-4xl font-bold mb-4"> Product Not Found</h1>
            <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
            <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
    );
}