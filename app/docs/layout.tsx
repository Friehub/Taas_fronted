'use client';

import '../globals.css';

// Docs-only layout WITHOUT the main app sidebar
export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#000000] text-white">
            {/* No Sidebar or Header - docs page has its own navigation */}
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
