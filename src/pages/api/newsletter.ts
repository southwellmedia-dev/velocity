import type { APIRoute } from 'astro';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  honeypot: z.string().max(0).optional(), // Honeypot field for spam protection
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString() || '';
    const honeypot = formData.get('website')?.toString() || ''; // Honeypot field

    // Check honeypot - if filled, it's likely a bot
    if (honeypot) {
      // Silently succeed to avoid giving bots feedback
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = newsletterSchema.safeParse({ email, honeypot });

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error.errors[0]?.message || 'Please enter a valid email address',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Process the subscription
    // In a real application, you would integrate with:
    // - Mailchimp
    // - ConvertKit
    // - Buttondown
    // - Your own email system
    // - etc.

    // For now, we just log it (in production, replace with actual handling)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('Newsletter subscription:', result.data.email);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Newsletter error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Subscription failed. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
