import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductsState {
    // حالة الـ client-side (مثل عدد المنتجات المضافة/المحذوفة محلياً)
    localProducts: any[];
    addLocalProduct: (p: any) => void;
    removeLocalProduct: (id: number) => void;
    clearLocalProducts: () => void;
}

export const useProductsStore = create<ProductsState>()(
    persist(
        (set) => ({
            localProducts: [],
            addLocalProduct: (p) =>
                set((state) => ({ localProducts: [...state.localProducts, p] })),
            removeLocalProduct: (id) =>
                set((state) => ({
                    localProducts: state.localProducts.filter((p) => p.id !== id),
                })),
            clearLocalProducts: () => set({ localProducts: [] }),
        }),
        { name: 'products-storage' }
    )
);