import { queryOptions } from "@tanstack/react-query";
import type { LessonType } from "../../Types/Catalog/LessonType.ts";
import type { UnitType } from "../../Types/Catalog/UnitType.ts";
import { qk } from "./queryKeys.ts";
import {
  lessonBatcher,
  sectionBatcher,
  unitBatcher,
  userBatcher,
} from "../../Hooks/Queries/Batcher/batchers.ts";
import { getData } from "../RequestConstants/requests.ts";
import type { UserType } from "../../Types/User/UserType.ts";
import {
  GET_AUTH_ME,
  GET_AVATARS,
  GET_COURSE_IDS_FOR_USER,
  GET_COURSE_PROGRESS,
  GET_EXERCISES_BY_LESSON,
  GET_LESSONS_BY_UNIT,
  GET_MONTHLY_CHALLENGE_BY_USER_ID,
  GET_QUESTS_BY_USER_ID,
  GET_SECTION_TREE,
} from "../RequestConstants/paths.ts";
import type { SectionType } from "../../Types/Catalog/SectionType.ts";
import type { CourseProgressType } from "../../Types/User/CourseProgressType.ts";
import type { Exercise } from "../../Types/Catalog/ExerciseType.ts";
import type { QuestType } from "../../Types/Quest/QuestType.ts";
import type { FlatSectionTree } from "../../Types/Catalog/FlatSectionTree.ts";
import type { CourseType } from "../../Types/Catalog/CourseType.ts";

export const qo = {
  section: (sectionId: number) =>
    queryOptions<SectionType>({
      queryKey: qk.section(sectionId),
      queryFn: () => sectionBatcher.fetch(sectionId),
      staleTime: 60_000,
    }),

  sectionTree: (sectionId: number) =>
    queryOptions<FlatSectionTree>({
      queryKey: qk.sectionTree(sectionId),
      queryFn: () => getData(GET_SECTION_TREE(sectionId)),
      staleTime: 60_000,
    }),

  courseProgress: (courseId: number) =>
    queryOptions<CourseProgressType>({
      queryKey: qk.courseProgress(courseId),
      queryFn: () =>
        getData<CourseProgressType>(GET_COURSE_PROGRESS(courseId), true),
      staleTime: 60_000,
    }),

  avatars: () =>
    queryOptions<string[]>({
      queryKey: qk.avatars(),
      queryFn: () => getData(GET_AVATARS),
      staleTime: 60_000,
    }),

  lesson: (lessonId: number) =>
    queryOptions<LessonType>({
      queryKey: qk.lesson(lessonId),
      queryFn: () => lessonBatcher.fetch(lessonId),
      staleTime: 60_000,
    }),

  unit: (unitId: number) =>
    queryOptions<UnitType>({
      queryKey: qk.lesson(unitId),
      queryFn: () => unitBatcher.fetch(unitId),
      staleTime: 60_000,
    }),

  exercises: (lessonId: number) =>
    queryOptions<Exercise[]>({
      queryKey: qk.exercises(lessonId),
      queryFn: () =>
        getData<Exercise[]>(GET_EXERCISES_BY_LESSON(lessonId), true),
      staleTime: 60_000,
    }),

  module: (moduleId: number) =>
    queryOptions<UnitType>({
      queryKey: qk.unit(moduleId),
      queryFn: () => unitBatcher.fetch(moduleId),
      staleTime: 60_000,
    }),

  currentUser: () =>
    queryOptions({
      queryKey: qk.currentUser(),
      queryFn: () => getData<UserType>(GET_AUTH_ME, true),
      staleTime: 60_000,
      retry: false,
    }),

  user: (userId: number) =>
    queryOptions({
      queryKey: qk.user(userId),
      queryFn: () => userBatcher.fetch(userId),
      staleTime: 60_00,
    }),

  lessonByUnit: (id: number) =>
    queryOptions({
      queryKey: qk.lessonsByUnit(id),
      queryFn: () => getData<LessonType[]>(GET_LESSONS_BY_UNIT(id), true),
      staleTime: 60_00,
    }),

  quests: () =>
    queryOptions({
      queryKey: qk.quests(),
      queryFn: () => getData<QuestType[]>(GET_QUESTS_BY_USER_ID(), true),
      staleTime: 60_00,
    }),

  monthlyChallenge: () =>
    queryOptions({
      queryKey: qk.monthlyChallenges(),
      queryFn: () => getData<QuestType>(GET_MONTHLY_CHALLENGE_BY_USER_ID(), true),
      staleTime: 60_00,
    }),

  userCourses: (userId: number) =>
    queryOptions({
      queryKey: qk.userCourses(userId),
      queryFn: () => getData<CourseType[]>(GET_COURSE_IDS_FOR_USER(userId)),
      staleTime: 60_00,
    }),
};
