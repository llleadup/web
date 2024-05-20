import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const { userId, substepId, roadmapId } = await request.json();

  if (!userId || !substepId) {
    return new Response("Missing user ID or substep ID", { status: 400 });
  }

  //add userroadmap
  const { data: exisitingUserRoadmap, error: errorExisitingUserRoadmap } =
    await supabase
      .from("userroadmaps")
      .select("*")
      .eq("user_id", userId)
      .eq("roadmap_id", roadmapId)
      .single();

  if (exisitingUserRoadmap !== null) {
    console.error("User already has this roadmpa:", exisitingUserRoadmap);
  } else {
    console.log('uesr does not have this roadmap')
    const { error: insertUserRoadmapError } = await supabase
      .from("userroadmaps")
      .insert([{ user_id: userId, roadmap_id: roadmapId }]);

    if (insertUserRoadmapError) {
      console.error("Error inserting user roadmap:", insertUserRoadmapError);
      return new Response(insertUserRoadmapError.message, { status: 500 });
    }
  }


  // Check if the entry already exists
  const { data: existingEntry, error: checkError } = await supabase
    .from("usersubsteps")
    .select("*")
    .eq("user_id", userId)
    .eq("substep_id", substepId)
    .eq('roadmap_id',roadmapId)
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
    .from("usersubsteps")
    .insert([{ user_id: userId, substep_id: substepId, roadmap_id: roadmapId }]);

  if (insertError) {
    console.error("Error inserting progress:", insertError);
    return new Response(insertError.message, { status: 500 });
  }

  return new Response(JSON.stringify({ message: "Progress added" }), {
    status: 200,
  });
};
