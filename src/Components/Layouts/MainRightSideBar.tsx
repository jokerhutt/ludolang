import { useSuspenseQuery } from "@tanstack/react-query";
import { UserMainStats } from "../../features/Common/UserMainStats.tsx";
import { QuestListWidget } from "../../features/Quests/QuestListWidget.tsx";
import { useCourse } from "../../Hooks/Queries/Data/useCourse.tsx";
import type { CourseType } from "../../Types/Catalog/CourseType.ts";
import { ContentWidget } from "../Atoms/Widget/ContentWidget.tsx";
import { qo } from "../../Constants/QueryConstants/queries.ts";

export function MainRightSideBar() {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser())
  const courseId = currentUser.currentCourseId;

  const { data: userCourseProgress } = useSuspenseQuery(qo.courseProgress(courseId))
  const { data: course } = useCourse(currentUser.currentCourseId);

  return (
    <aside className="hidden border-l border-duoGrayBorder lg:flex flex-col bg-duoBackground w-90 xl:w-110 2xl:w-180">
      <div className="flex py-6 px-8 gap-8 sticky top-0 flex-col w-full">
        <div className="w-full flex justify-between">
          {userCourseProgress && (
            <UserMainStats
              currentUser={currentUser}
              courseProgress={userCourseProgress}
              courseObject={course as CourseType}
            />
          )}
        </div>
        <ContentWidget padding="pl-4 pr-6" title={"Daily Quests"}>
          <QuestListWidget />
        </ContentWidget>
      </div>
    </aside>
  );
}
