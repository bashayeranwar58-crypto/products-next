import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function NewProductPage() {
    const session = await auth();

    // If he is not registered, he is directed to the login page
    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className="container mx-auto max-w-3xl px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Добавление нового товара</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 mb-4">
                    Здесь будет форма добавления товара (доступна только авторизованным пользователям).
                </p>
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Вернуться на главную
                </Link>
            </div>
        </div>
    );
}