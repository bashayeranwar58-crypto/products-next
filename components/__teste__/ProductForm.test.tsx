import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProductForm } from '../ProductForm';

// Mock for Server Action
vi.mock('@/app/actions', () => ({
    createProductAction: vi.fn(),
}));

describe('ProductForm', () => {
    it('Показывает сообщение об ошибке Zod при неверном вводе', async () => {
        const user = userEvent.setup();
        render(<ProductForm onClose={vi.fn()} />);

        //Write a very short address (less than 3 characters)
        await user.type(screen.getByPlaceholderText('Название'), 'ab');
        await user.click(screen.getByRole('button', { name: /Создать/i }));

        // Checking if the error message appears
        expect(
            await screen.findByText('Название должно содержать минимум 3 символа')
        ).toBeInTheDocument();
    });

    it('Показывает ошибку для категории beauty при цене меньше 5', async () => {
        const user = userEvent.setup();
        render(<ProductForm onClose={vi.fn()} />);

        await user.type(screen.getByPlaceholderText('Название'), 'Valid Name');
        await user.type(screen.getByPlaceholderText('Описание'), 'Valid Description here');
        await user.type(screen.getByPlaceholderText('Категория (beauty, electronics...)'), 'beauty');
        await user.type(screen.getByPlaceholderText('Цена'), '2'); // سعر أقل من 5

        await user.click(screen.getByRole('button', { name: /Создать/i }));

        expect(
            await screen.findByText('Товары категории "beauty" не могут стоить меньше 5$')
        ).toBeInTheDocument();
    });
});