import './main.css';
import { Providers } from '../components/shared/Providers';
import { CustomCursor } from '../components/shared/CustomCursor';
import { SmoothScroll } from '../components/shared/SmoothScroll';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-background text-foreground transition-colors duration-300">
                <CustomCursor />
                <SmoothScroll />
                <Providers themeProps={{ attribute: "class", defaultTheme: "system", enableSystem: true }}>
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
