'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';

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
        return null;
    }

    return <>{children}</>;
}
