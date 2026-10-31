import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteProductButton } from '@/components/DeleteProductButton';
import { deleteProductAction } from '@/app/actions';

// 1. Mock للـ next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

// 2. Mock for Server Action
vi.mock('@/app/actions', () => ({
    deleteProductAction: vi.fn(),
}));

describe('DeleteProductButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Скрывает кнопку удаления для обычного пользователя (user)', () => {
        render(<DeleteProductButton id={1} role="user" />);
        expect(screen.queryByRole('button', { name: /Delete Product/i })).not.toBeInTheDocument();
    });

    it('Показывает кнопку удаления для администратора (admin)', () => {
        render(<DeleteProductButton id={1} role="admin" />);
        expect(screen.getByRole('button', { name: /Delete Product/i })).toBeInTheDocument();
    });

    it('Вызывает функцию удаления при клике админом', async () => {
        const user = userEvent.setup();

        // Make window.confirm Returns withtrue
        vi.spyOn(window, 'confirm').mockImplementation(() => true);

        render(<DeleteProductButton id={1} role="admin" />);

        const button = screen.getByRole('button', { name: /Delete Product/i });
        await user.click(button);

        // Verify the Server Action call (instead of searching for loading text)
        expect(deleteProductAction).toHaveBeenCalledWith(1);
    });
});