export default function Loading() {
    return (
        <div className="container mx-auto p-6 text-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-gray-500">Loading product details...</p>
        </div>
    );
}