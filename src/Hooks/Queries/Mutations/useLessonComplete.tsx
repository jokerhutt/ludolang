import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LessonCompleteType } from "../../../Types/Lesson/LessonCompleteType.ts";
import type { UserType } from "../../../Types/User/UserType.ts";
import type { LessonType } from "../../../Types/Catalog/LessonType.ts";
import {SUBMIT_LESSON_COMPLETE} from "../../../Constants/RequestConstants/paths.ts";
import {qk} from "../../../Constants/QueryConstants/queryKeys.ts";

type useLessonCompleteParams = {
  lessonId: string;
  courseId: number;
};

export const useLessonComplete = ({
  lessonId,
  courseId,
}: useLessonCompleteParams) => {
  const queryClient = useQueryClient();

  return useMutation<LessonCompleteType>({
    mutationKey: ["lessonComplete", lessonId],
    mutationFn: async () => {
      const res = await fetch(SUBMIT_LESSON_COMPLETE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: Number(lessonId),
          courseId: courseId,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: (data) => {
      const userId = data.userId;
      queryClient.invalidateQueries({ queryKey: qk.quests() });
      queryClient.invalidateQueries({ queryKey: qk.monthlyChallenges() });
      queryClient.setQueryData(qk.lesson(data.lessonId), data.updatedLesson);
      queryClient.setQueryData(
        qk.courseProgress(courseId),
        data.updatedUserCourseProgress
      );
      if (data.lessonsToUpdate.length) {
        data.lessonsToUpdate.forEach((lesson: LessonType) => {
          queryClient.setQueryData(qk.lesson(lesson.id), lesson);
        });
      }
      queryClient.setQueryData(
        qk.user(userId),
        (prev: UserType | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            totalScore: data.totalScore,
            streakLength: data.newStreakCount.newCount,
          };
        }
      );
      queryClient.setQueryData(
        qk.currentUser(),
        (prev: UserType | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            totalScore: data.totalScore,
            streakLength: data.newStreakCount.newCount,
          };
        }
      );
    },
  });
};
