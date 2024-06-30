import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ request, url, cookies, redirect }) => {
  const params = url.searchParams;
  const { data, error } = await supabase
    .from("todo_items")
    .select("*")
    .eq("todo_id", params.get("id"));

  if (error) {
    console.error("Error fetching substeps:", error);
    return new Response(error.message, { status: 500 });
  }

  if (!data) {
    return new Response(JSON.stringify({ message: "No todo items found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
};
