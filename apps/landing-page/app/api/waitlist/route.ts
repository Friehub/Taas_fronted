import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address provided.' },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Waitlist service is temporarily unavailable.' },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Resend Integration
        const { data, error } = await resend.emails.send({
            from: 'Friehub <waitlist@friehub.com>', // User needs to verify domain on Resend
            to: [email],
            subject: 'Welcome to the Sovereign Truth',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #AAFFB8; border-radius: 12px; background-color: #010402; color: #ffffff;">
                    <h1 style="font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #AAFFB8;">Friehub</h1>
                    <p style="font-size: 16px; color: rgba(255,255,255,0.6); line-height: 1.6;">
                        You have been attested to the TaaS Waitlist. 
                    </p>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.4);">
                        Stay tuned for protocol updates and early network access.
                    </p>
                    <div style="margin-top: 40px; padding-top: 20px; border-t: 1px solid rgba(170,255,184,0.1); font-size: 10px; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.1em;">
                        Automated Truth. Standardized.
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { message: 'Successfully joined the waitlist.', data },
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
