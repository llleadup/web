import type { APIRoute } from "astro";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { config } from "dotenv";

config(); // Load environment variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10", // Specify the API version if necessary
});

export const POST: APIRoute = async ({ request }) => {
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Retrieve the email from the session object
    const email = session.customer_details?.email;


    // Perform your login logic here, e.g., generate a magic link
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: import.meta.env.DEV
            ? "http://localhost:4321/api/auth/callback"
            : "https://leadup.today/api/auth/callback",
            data: { subscription_level: 1}
        },
      });

      if (error) {
        return new Response(error.message, { status: 500 });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
