import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request, locals }) => {
  const { directionId, userId } = await request.json();
  try {
    // Get the count of entries in the usersusbsteps table with the specified roadmap_id and user_id
    const { count, error: userTodoItemsError } = await supabase
      .from("usertodo_items")
      .select("id", { count: "exact", head: true })
      .eq("direction_id", directionId)
      .eq("user_id", userId);

    if (userTodoItemsError) {
      throw new Error(userTodoItemsError.message);
    }

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
