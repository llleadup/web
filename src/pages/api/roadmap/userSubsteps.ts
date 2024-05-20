import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request, locals }) => {
  const { roadmapId, userId } = await request.json();
  console.log("roadmapId, userId\n", roadmapId, userId);
  try {
    // Get the count of entries in the usersusbsteps table with the specified roadmap_id and user_id
    const { count, error: usersubstepsError } = await supabase
      .from("usersubsteps")
      .select("id", { count: "exact", head: true })
      .eq("roadmap_id", roadmapId)
      .eq("user_id", userId);

    if (usersubstepsError) {
      throw new Error(usersubstepsError.message);
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
