import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Hardcoded users for testing
const users = [
    {
        id: '1',
        email: 'user@test.com',
        password: 'user123',
        role: 'user',
        name: 'Test User',
    },
    {
        id: '2',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
    },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = users.find(u => u.email === credentials.email);

                if (!user) {
                    return null;
                }

                // Simple plain-text check (no bcrypt for now to avoid issues)
                const isValid = credentials.password === user.password;

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
});