'use client';

import { useState } from 'react';
import { ProductForm } from './ProductForm';


export function AddProductButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="hover:text-blue-600 transition-colors"
                title="Добавить товар"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>

            {isOpen && <ProductForm onClose={() => setIsOpen(false)} />}
        </>
    );
}