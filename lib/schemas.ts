import { z } from 'zod';

// Схема для валидации формы создания/редактирования продукта
export const productSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Название должно содержать минимум 3 символа' })
        .max(100, { message: 'Название не должно превышать 100 символов' }),

    description: z
        .string()
        .min(10, { message: 'Описание должно содержать минимум 10 символов' }),

    price: z
        .number({ error: 'Цена должна быть числом' })
        .positive({ message: 'Цена должна быть больше нуля' })
        .max(10000, { message: 'Цена не должна превышать 10000' }),

    category: z
        .string()
        .min(1, { message: 'Категория обязательна' }),

    brand: z.string().optional(),
})
    // Правило, зависящее от предметной области: товары категории beauty не могут стоить меньше 5
    .refine((data) => {
        if (data.category === 'beauty' && data.price < 5) return false;
        return true;
    }, {
        message: 'Товары категории "beauty" не могут стоить меньше 5$',
        path: ['price'], // Привязка ошибки к полю price
    });

// Извлекаем TypeScript-тип из схемы
export type ProductFormData = z.infer<typeof productSchema>;

// Схема для проверки ответа от внешнего API DummyJSON
export const dummyProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    thumbnail: z.string().url(),
});