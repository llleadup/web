import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { directionId } = await request.json();
  
  try {
    // Step 1: Get all todo IDs for the given direction ID
    const { data: todos, error: todosError } = await supabase
      .from("todos")
      .select("id")
      .eq("direction_id", directionId);

    if (todosError) {
      throw new Error(todosError.message);
    }

    if (!todos || todos.length === 0) {
      return new Response(JSON.stringify({ count: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const todoIds = todos.map((todo) => todo.id);

    // Step 2: Count the todo items associated with these todo IDs
    const { count, error: todoItemsError } = await supabase
      .from("todo_items")
      .select("id", { count: "exact", head: true })
      .in("todo_id", todoIds);

    if (todoItemsError) {
      throw new Error(todoItemsError.message);
    }

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error : any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
