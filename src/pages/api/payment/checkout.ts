import Stripe from "stripe";
import type { APIRoute } from "astro";
import { config } from "dotenv";

config(); // Load environment variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10", // Specify the API version if necessary
});

const URL = import.meta.env.DEV
  ? "http://localhost:4321"
  : "https://leadup.today";

const plans = [
  "",
  "price_1PXkivHAvG26iv7UYZXwvXFc",
];

export const POST: APIRoute = async ({ request, cookies }) => {
  const { plan } = await request.json();
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: plans[plan - 1],
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${URL}/return/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${URL}/`,
    });

    cookies.set("stripe_session_id", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
