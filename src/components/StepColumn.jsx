import { useState, useEffect } from "react";
import { getRequest, postRequest, slugify } from "@/utils";

const StepColumn = ({ step, userId, direction, roadmap }) => {
  const [substeps, setSubsteps] = useState([]);
  const [completedSubsteps, setCompletedSubsteps] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubsteps = async () => {
      try {
        const { data: allSubsteps } = await getRequest(
          `/api/substeps/all?id=${step.id}`
        );
        setSubsteps(allSubsteps);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCompletedSubsteps = async () => {
      try {
        const { data: userSubsteps } = await getRequest(
          `/api/substeps/user?user_id=${userId}`
        );
        const completedIds = new Set(userSubsteps.map((s) => s.substep_id));
        setCompletedSubsteps(completedIds);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSubsteps();
    fetchCompletedSubsteps();
  }, [step.id, userId]);

  const handleSubstepClick = async (substepId) => {
    try {
      const response = await postRequest("/api/progress/add", {
        userId,
        substepId,
        roadmapId: roadmap.id,
      });

      if (response.message === "Progress added") {
        setCompletedSubsteps((prev) => new Set(prev).add(substepId));
      }
    } catch (error) {
      console.error("Error adding progress:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col border-r-2 border-bg-accent-2">
      <div className="flex items-center min-w-[300px] py-4 px-2 border-b border-bg-accent-2">
        <div
          className="w-full hover:bg-bg-accent-2 text-base font-medium rounded-md py-2 px-3 h-16"
        >
          {step.step_number}. {step.title}
        </div>
      </div>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col gap-1.5 p-3">
          {substeps &&
            substeps.map((s) => (
              <a
                href={`/dashboard/directions/${direction.slug}/${slugify(
                  s.title
                )}`}
                onClick={() => handleSubstepClick(s.id)}
                key={s.id}
                className="overflow-hidden relative flex flex-col items-start min-w-[300px] gap-2 px-4 py-2.5 bg-bg-accent-3 rounded-md border border-transparent transition-all duration-300 hover:border-primary"
              >
                <span className="text-base font-medium">{s.title}</span>
                <div className="w-full flex justify-between items-center">
                  <span
                    className={`text-xs w-8 h-2 rounded-lg ${
                      s.priority === "high" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></span>
                  <div className="text-xs text-zinc-400 flex gap-1 items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                    >
                      <path
                        fill="currentColor"
                        d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z"
                      />
                    </svg>
                    {s.read_time}
                  </div>
                </div>
                {completedSubsteps.has(s.id) && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-green-500"></div>
                )}
              </a>
            ))}
        </div>
      )}
    </div>
  );
};

export default StepColumn;
