'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProductAction } from '@/app/actions';
import { productSchema } from '@/lib/schemas';

export function ProductForm({ onClose }: { onClose: () => void }) {
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Extract data from the form
        const rawData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price')),
            category: formData.get('category') as string,
            brand: (formData.get('brand') as string) || undefined,
        };

        // 1. Client-side validation using Zod
        const clientCheck = productSchema.safeParse(rawData);

        if (!clientCheck.success) {
            setErrors(clientCheck.error.flatten().fieldErrors);
            return;
        }

        setErrors({});

        // 2. Send data to the server via Server Action
        startTransition(async () => {
            const res = await createProductAction(formData);

            if (res.success && res.data) {
                onClose();
                // Show success message and redirect to home
                alert('Товар успешно добавлен! (DummyJSON не сохраняет его в базе)');
                router.push('/');
                router.refresh();
            } else {
                // Handle server-side validation errors
                if (res.errors) setErrors(res.errors);
                else alert('Ошибка: ' + res.error);
            }
        });
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                <h2 className="text-xl font-bold mb-4">Добавить товар</h2>

                {/* noValidate disables default browser validation to rely on Zod */}
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>

                    <div>
                        <input
                            name="title"
                            placeholder="Название"
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
                    </div>

                    <div>
                        <input
                            name="description"
                            placeholder="Описание"
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>}
                    </div>

                    <div>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="Цена"
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>}
                    </div>

                    <div>
                        <input
                            name="category"
                            placeholder="Категория (beauty, electronics...)"
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category[0]}</p>}
                    </div>

                    <div>
                        <input
                            name="brand"
                            placeholder="Бренд (опционально)"
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                        />
                        {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand[0]}</p>}
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                            Отмена
                        </button>
                        <button type="submit" disabled={isPending} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                            {isPending ? 'Создание...' : 'Создать'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}