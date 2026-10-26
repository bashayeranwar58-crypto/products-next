import type { Product, ProductsResponse } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

export async function fetchProducts(limit = 10, skip = 0): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function fetchProduct(id: number): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Product not found');
    return res.json();
}

export async function searchProducts(query: string, limit = 10, skip = 0): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
}

export async function createProduct(data: Partial<Product>) {
    const res = await fetch(`${BASE_URL}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create');
    return res.json();
}

export async function updateProduct(id: number, data: Partial<Product>) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update');
    return res.json();
}

export async function deleteProduct(id: number) {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    return res.json();
}