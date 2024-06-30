import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const DELETE: APIRoute = async ({ request }) => {
  const { userId, todoItemId, directionId } = await request.json();

  if (!userId || !todoItemId) {
    return new Response("Missing user ID or todo item ID", { status: 400 });
  }

  //remove entry
  const { error: removeError } = await supabase
    .from("usertodo_items")
    .delete()
    .eq("user_id", userId)
    .eq("todo_item_id", todoItemId)
    .eq("direction_id", directionId);

  if (removeError) {
    console.error("Error inserting progress:", removeError);
    return new Response(removeError.message, { status: 500 });
  }

  return new Response(JSON.stringify({ message: "Progress removed" }), {
    status: 200,
  });
};
