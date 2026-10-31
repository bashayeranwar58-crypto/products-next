'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Get the callback URL (where to redirect after login)
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError('Неверный email или пароль');
        } else {
            // Redirect to the homepage (or callback URL) after successful login
            router.push(callbackUrl);
            router.refresh();
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-black text-gray-900 uppercase tracking-widest">
                        Вход в систему
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Войдите, чтобы управлять товарами
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email (admin@test.com)"
                                defaultValue="admin@test.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Пароль (admin123)"
                                defaultValue="admin123"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-semibold bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors shadow-md shadow-blue-200"
                        >
                            {loading ? 'Загрузка...' : 'Войти'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                        ← Вернуться на главную
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Wrap in Suspense because we use useSearchParams
export default function LoginPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">Загрузка...</div>}>
            <LoginForm />
        </Suspense>
    );
}