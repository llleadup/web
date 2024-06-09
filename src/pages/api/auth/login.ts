import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {

  const body = await request.json();
  const email = body.email;

  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  const { data, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("name", email);

  if (userError || data.length === 0) {
    return Response.json({ error: "No user found, you need to have a subscription first" }, { status: 400 });
  }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: import.meta.env.DEV
        ? "http://localhost:4321/api/auth/callback"
        : "https://leadup.today/api/auth/callback",
    },
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify({ sent: true }), { status: 200 });
};
