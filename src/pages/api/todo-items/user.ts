import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ url }) => {
  const params = url.searchParams;
  const userId = params.get("user_id");

  if (!userId) {
    return new Response("Missing user ID", { status: 400 });
  }

  const { data, error } = await supabase
    .from("usertodo_items")
    .select("todo_item_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user todo items:", error);
    return new Response(error.message, { status: 500 });
  }

  return new Response(
    JSON.stringify({ data }),
    { status: 200 }
  );
};
