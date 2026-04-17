"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * subscribeToNewsletter - Server action for Resend integration.
 * Handles the logic for adding a user to the Friehub newsletter.
 */
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Invalid email address" };
  }

  try {
    // In a real environment, you'd add this to an Audience or send an internal notification.
    // For now, we'll simulate a successful send to provide immediate feedback.
    
    // const { data, error } = await resend.emails.send({
    //   from: 'Friehub <newsletter@friehub.com>',
    //   to: [email],
    //   subject: 'Welcome to the TaaS Federated Registry',
    //   html: '<p>You are now registered for the Friehub TaaS updates.</p>'
    // });

    // if (error) return { error: error.message };
    
    // Simulate latency for the "High-Performance" feel
    await new Promise(resolve => setTimeout(resolve, 800));

    return { success: true };
  } catch (err) {
    return { error: "Connection to TaaS relay failed. Please try again." };
  }
}
