'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProductAction } from '@/app/actions';

export function DeleteProductButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            startTransition(async () => {
                await deleteProductAction(id);
                router.push('/');
            });
        }
    };

    return (
        <button onClick={handleDelete} disabled={isPending} className="btn btn-error text-white">
            {isPending ? 'Deleting...' : '🗑️ Delete Product'}
        </button>
    );
}