import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from '../ProductCard';

const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'This is a test',
    category: 'beauty',
    price: 99.99,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    brand: 'TestBrand',
    thumbnail: '/test.png',
};

describe('ProductCard', () => {
    it('Отображает переданные данные продукта', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
        expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
    });
});