import { useNavigate, useParams } from "react-router";
import { useCourse } from "../../Queries/Data/useCourse.tsx";
import type { CourseType } from "../../../Types/Catalog/CourseType.ts";
import { useCallback } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../../Constants/QueryConstants/queries.ts";
import {useChangeCourse} from "../../Queries/Mutations/useChangeCourse.tsx";

type useCoursesFlowReturn = {
  handleSelectCourse: (courseId: number) => void;
  coursesArray?: CourseType[];
};

export function useCoursesFlow(): useCoursesFlowReturn {
  const navigate = useNavigate();
  const { data: allCourses } = useCourse("all");
  const { userId } = useParams<{ userId?: string }>();
  const numUserId = userId ? Number(userId) : 0;
  const changeCourseMutation = useChangeCourse();
  const { data: userCourses } = useSuspenseQuery(qo.userCourses(numUserId))
  const coursesArray = numUserId ? userCourses : (allCourses as CourseType[]);

  const handleSelectCourse = useCallback(
    (courseId: number) => {
      changeCourseMutation.mutate(
        { newCourse: courseId },
        { onSuccess: () => navigate("/") }
      );
    },
    [changeCourseMutation, navigate]
  );

  return { handleSelectCourse, coursesArray };
}
