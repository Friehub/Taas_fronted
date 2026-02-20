'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('friehub_auth_token');
            const isLoginPage = pathname === '/login';

            if (!token) {
                if (!isLoginPage) {
                    router.push('/login');
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            } else {
                if (isLoginPage) {
                    router.push('/');
                }
                setIsAuthorized(true);
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Initializing Security...</p>
            </div>
        );
    }

    return <>{children}</>;
}
