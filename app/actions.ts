'use server';

import { createProduct, deleteProduct } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { productSchema } from '@/lib/schemas';
import { auth } from '@/auth';

// update the TypeScript
type ActionResponse = {
    success: boolean;
    errors?: Record<string, string[]>;
    error?: string;
    data?: any;
};

// Server Action для создания продукта
export async function createProductAction(formData: FormData): Promise<ActionResponse> {
    // Проверка авторизации
    const session = await auth();
    if (!session) {
        return { success: false, error: 'Вы должны войти в систему' };
    }

    const rawData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        category: formData.get('category') as string,
        brand: formData.get('brand') as string || undefined,
    };

    // Валидация на сервере
    const validation = productSchema.safeParse(rawData);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors
        };
    }

    // Сохранение данных
    try {
        const result = await createProduct(validation.data);
        revalidatePath('/');
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: 'Не удалось создать продукт' };
    }
}

// Server Action для удаления (только admin)
export async function deleteProductAction(id: number) {
    const session = await auth();
    if (!session) {
        throw new Error('Неавторизован');
    }
    if ((session.user as any).role !== 'admin') {
        throw new Error('Доступ запрещён');
    }

    const result = await deleteProduct(id);
    revalidatePath('/');
    return result;
}