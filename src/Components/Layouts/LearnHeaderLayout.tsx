import { Outlet } from "react-router";
import { LearnHeader } from "../../features/SectionPath/LearnHeader.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../Constants/QueryConstants/queries.ts";

export function LearnHeaderLayout() {
  const { data: user } = useSuspenseQuery(qo.currentUser())
  const { data: userCourseProgress } = useSuspenseQuery(qo.courseProgress((user.currentCourseId)))

  return (
    <div className="w-full h-full flex flex-col">
      {userCourseProgress && (
        <LearnHeader courseProgress={userCourseProgress} />
      )}
      <Outlet />
    </div>
  );
}
