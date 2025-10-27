import { Outlet } from "react-router";
import { LearnHeader } from "../../features/SectionPath/LearnHeader";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../queries/useQuery/queries";

export function LearnHeaderLayout() {
  const { data: user } = useSuspenseQuery(qo.currentUser())
  const { data: userCourseProgress } = useCourseProgress(user.currentCourseId);

  return (
    <div className="w-full h-full flex flex-col">
      {userCourseProgress && (
        <LearnHeader courseProgress={userCourseProgress} />
      )}
      <Outlet />
    </div>
  );
}
