import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { Resend } from 'resend';

const resend = new Resend('re_DzGSrAuN_LbYjwzjGGW5nkfVEpGUeEG8d');

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  resend.contacts.create({
    email: email,
    firstName: 'First',
    lastName: 'Last',
    unsubscribed: false,
    audienceId: 'fb92bb2a-3130-4c15-848d-04102351d601',
  });

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/login");
};
