import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { address, message, signature } = body;

        // 1. Verify with Backend Service (Private Indexer)
        // In production, this URL should be an env var
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3002';

        const verifyRes = await fetch(`${backendUrl}/verify-admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address, message, signature }),
        });

        if (!verifyRes.ok) {
            const error = await verifyRes.json();
            return NextResponse.json({ success: false, error: error.error || 'Verification failed' }, { status: 401 });
        }

        const data = await verifyRes.json();
        if (!data.success) {
            return NextResponse.json({ success: false, error: 'Authorization denied' }, { status: 401 });
        }

        // 2. Set Secure Cookie
        const response = NextResponse.json({ success: true });

        // Calculate expiration (e.g., 24 hours)
        const expiresIn = 24 * 60 * 60 * 1000;

        response.cookies.set('admin-auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: expiresIn,
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error('Login Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
