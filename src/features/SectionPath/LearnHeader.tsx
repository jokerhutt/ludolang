import { Header } from "../../Components/Molecules/Header/Header";
import type { CourseProgressType } from "../../Types/User/CourseProgressType.ts";
import { useCourse } from "../../Hooks/Queries/Data/useCourse.tsx";
import type { CourseType } from "../../Types/Catalog/CourseType.ts";
import { UserMainStats } from "../Common/UserMainStats";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../Constants/QueryConstants/queries.ts";

type LearnHeaderProps = {
  courseProgress: CourseProgressType;
};

export function LearnHeader({ courseProgress }: LearnHeaderProps) {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser())
  const { data: course } = useCourse(currentUser.currentCourseId);
  const courseObject = course as CourseType;

  if (course && currentUser)
    return (
      <Header padding="px-4">
        <UserMainStats
          currentUser={currentUser}
          courseObject={courseObject}
          courseProgress={courseProgress}
        />
      </Header>
    );
}
