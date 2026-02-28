import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address provided.' },
                { status: 400 }
            );
        }

        // TODO: Integrate with a database or email service
        // Example: await db.waitlist.create({ data: { email } })
        // For now, we log it to the server console (Vercel logs)
        console.log(`[Waitlist Capture] New email: ${email}`);

        return NextResponse.json(
            { message: 'Successfully joined the waitlist.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}
