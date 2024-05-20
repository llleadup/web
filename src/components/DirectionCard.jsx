import { useEffect, useState } from "react";
import { postRequest } from "@/utils";

const DirectionCard = ({ direction, roadmap, userId }) => {
  const [substepsCount, setSubstepsCount] = useState(0);
  const [userSubstepsCount, setUserSubstepsCount] = useState(0);

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
          userId
        });
        console.log('data: ', data)
        setUserSubstepsCount(data.count);
      } catch (error) {
        console.error("Error fetching user substeps count:", error);
      }
    };
    fetchUserSubstepsCount()
    fetchSubstepsCount();
  }, [roadmap.id]);

  return (
    <a href={`/dashboard/directions/${direction.slug}`}>
      <div className="cursor-pointer w-full border border-transparent bg-bg-accent rounded-md p-4 transition-all duration-300 hover:border-zinc-100">
        <h3 className="text-zinc-100 font-semibold text-base mb-9">
          {direction.name}
        </h3>
        <div className="flex flex-col gap-2 text-xs font-light">
          <div className="flex justify-between items-center">
            <div>Roadmap</div>
            <div>{userSubstepsCount}/{substepsCount}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default DirectionCard;
