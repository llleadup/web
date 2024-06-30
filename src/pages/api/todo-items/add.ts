import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { userId, todoItemId, directionId } = await request.json();

  if (!userId || !todoItemId) {
    return new Response("Missing user ID or todo item ID", { status: 400 });
  }

  // Check if the entry already exists
  const { data: existingEntry, error: checkError } = await supabase
    .from("usertodo_items")
    .select("*")
    .eq("user_id", userId)
    .eq("todo_item_id", todoItemId)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    console.error("Error checking existing entry:", checkError);
    return new Response(checkError.message, { status: 500 });
  }

  if (existingEntry) {
    return new Response(
      JSON.stringify({ message: "Progress already exists" }),
      {
        status: 200,
      }
    );
  }

  

  // Insert new progress entry
  const { error: insertError } = await supabase
    .from("usertodo_items")
    .insert([{ user_id: userId, todo_item_id: todoItemId, direction_id: directionId }]);

  if (insertError) {
    console.error("Error inserting progress:", insertError);
    return new Response(insertError.message, { status: 500 });
  }

  return new Response(JSON.stringify({ message: "Progress added" }), {
    status: 200,
  });
};
