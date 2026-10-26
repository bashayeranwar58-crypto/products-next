'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="container mx-auto p-6 text-center py-20">
            <h2 className="text-3xl font-bold text-error mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button onClick={reset} className="btn btn-primary">
                Try again
            </button>
        </div>
    );
}