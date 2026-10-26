'use client';

import { useTransition } from 'react';
import { createProductAction } from '@/app/actions';

export function AddProductButton() {
    const [isPending, startTransition] = useTransition();

    const handleAdd = () => {
        startTransition(async () => {
            const newProduct = {
                title: 'New Test Product',
                description: 'This is a test product created via Server Action',
                price: 99.99,
                category: 'test',
                brand: 'TestBrand',
                thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
            };
            await createProductAction(newProduct);
            alert('Product added (simulated, DummyJSON does not save it permanently)');
        });
    };

    return (
        <button onClick={handleAdd} disabled={isPending} className="btn btn-primary shadow-md">
            {isPending ? 'Adding...' : '+ Add Product'}
        </button>
    );
}