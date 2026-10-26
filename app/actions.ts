'use server';

import { createProduct, updateProduct, deleteProduct } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createProductAction(data: any) {
    const result = await createProduct(data);
    revalidatePath('/');
    return result;
}

export async function updateProductAction(id: number, data: any) {
    const result = await updateProduct(id, data);
    revalidatePath('/');
    revalidatePath(`/products/${id}`);
    return result;
}

export async function deleteProductAction(id: number) {
    const result = await deleteProduct(id);
    revalidatePath('/');
    return result;
}