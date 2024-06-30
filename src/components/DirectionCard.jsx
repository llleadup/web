import { useEffect, useState } from "react";
import { postRequest } from "@/utils";

const DirectionCard = ({ direction, roadmap, userId }) => {
  const [substepsCount, setSubstepsCount] = useState(null);
  const [userSubstepsCount, setUserSubstepsCount] = useState(null);
  const [todoItemsCount, setTodoItemsCount] = useState(null);
  const [userTodoItemsCount, setUserTodoItemsCount] = useState(null);

  useEffect(() => {
    const fetchSubstepsCount = async () => {
      try {
        const data = await postRequest("/api/roadmap/totalSubsteps", {
          roadmapId: roadmap.id,
        });
        setSubstepsCount(data.count);
      } catch (error) {
        console.error("Error fetching substeps count:", error);
      }
    };

    const fetchUserSubstepsCount = async () => {
      try {
        const data = await postRequest("/api/roadmap/userSubsteps", {
          roadmapId: roadmap.id,
          userId,
        });
        setUserSubstepsCount(data.count);
      } catch (error) {
        console.error("Error fetching user substeps count:", error);
      }
    };
    const fetchTodoItemsCount = async () => {
      try {
        const data = await postRequest("/api/todo/total", {
          directionId: direction.id,
        });
        setTodoItemsCount(data.count);
      } catch (error) {
        console.error("Error fetching substeps count:", error);
      }
    };
    const fetchUserTodoItemsCount = async () => {
      try {
        const data = await postRequest("/api/todo/user", {
          directionId: direction.id,
          userId,
        });
        setUserTodoItemsCount(data.count);
      } catch (error) {
        console.error("Error fetching substeps count:", error);
      }
    };
    fetchUserSubstepsCount();
    fetchSubstepsCount();
    fetchTodoItemsCount();
    fetchUserTodoItemsCount();
  }, [roadmap.id]);

  return (
    <a href={`/dashboard/directions/${direction.slug}`}>
      <div
        className={`cursor-pointer w-full border bg-bg-accent rounded-md p-4 transition-all duration-300 ${
          userSubstepsCount === substepsCount &&
          userTodoItemsCount === todoItemsCount &&
          userSubstepsCount !== null &&
          userTodoItemsCount !== null &&
          substepsCount !== null &&
          todoItemsCount !== null
            ? "border-green-400 hover:border-green-400"
            : "border-transparent hover:border-zinc-100"
        }`}
      >
        <h3 className="text-zinc-100 font-semibold text-base mb-9">
          {direction.name}
        </h3>
        <div className="flex flex-col gap-2 text-xs font-light">
          <div className="flex justify-between items-center">
            <div>Roadmap</div>
            <div>
              {userSubstepsCount}/{substepsCount}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>Todo</div>
            <div>
              {userTodoItemsCount}/{todoItemsCount}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default DirectionCard;
