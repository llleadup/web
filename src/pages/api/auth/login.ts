import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://leadup.today/api/auth/callback"
    },
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/magic-link-sent");
};
