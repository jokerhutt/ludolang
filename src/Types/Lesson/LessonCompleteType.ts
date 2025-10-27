import type { CourseProgressType } from "../User/CourseProgressType.ts";
import type { LessonType } from "../Catalog/LessonType.ts";
import type { NewStreakCount } from "./NewStreakCount.ts";

export type LessonCompleteType = {
  userId: number;
  totalScore: number;
  newUserScore: number;
  accuracy: number;
  lessonId: number;
  updatedLesson: LessonType;
  lessonsToUpdate: LessonType[];
  updatedUserCourseProgress: CourseProgressType;
  newStreakCount: NewStreakCount;
  message: string;
};
