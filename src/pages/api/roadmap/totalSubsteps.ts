import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { roadmapId } = await request.json();
  
  try {
    // Step 1: Get all step IDs for the given roadmap ID
    const { data: steps, error: stepsError } = await supabase
      .from("steps")
      .select("id")
      .eq("roadmap_id", roadmapId);

    if (stepsError) {
      throw new Error(stepsError.message);
    }

    if (!steps || steps.length === 0) {
      return new Response(JSON.stringify({ count: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stepIds = steps.map((step) => step.id);

    // Step 2: Count the substeps associated with these step IDs
    const { count, error: substepsError } = await supabase
      .from("substeps")
      .select("id", { count: "exact", head: true })
      .in("step_id", stepIds);

    if (substepsError) {
      throw new Error(substepsError.message);
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
