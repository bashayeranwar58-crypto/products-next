'use client';

import { deleteProductAction } from '@/app/actions';

type DeleteProductButtonProps = {
    id: number;
    role?: 'admin' | 'user' | string;
};

export function DeleteProductButton({ id, role }: DeleteProductButtonProps) {
    if (role !== 'admin') {
        return null;
    }

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');

        if (!confirmed) {
            return;
        }

        await deleteProductAction(id);
    };

    return (
        <button type="button" onClick={handleDelete}>
            Delete Product
        </button>
    );
}
