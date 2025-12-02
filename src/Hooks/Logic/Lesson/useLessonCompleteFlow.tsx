import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useLottie } from "../../Animation/useLottie.tsx";
import { STREAK_ANIMATION, TROPHY_ANIMATION } from "../../../Constants/UIConstants/animationPaths.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../../Constants/QueryConstants/queries.ts";
import {useLessonComplete} from "../../Queries/Mutations/useLessonComplete.tsx";

type Args = {
  lessonId?: string;
  exitPath?: string;
};

export type LessonCompleteStats = {
  totalScore: number;
  accuracy: number;
  title: string;
  accuracyMessage: string;
  oldCount: number;
  newCount: number;
};

type useLessonCompleteFlowReturn = {
  lessonCompleteStats?: LessonCompleteStats;
  isError: boolean;
  error: Error | null;
  isPending: boolean;
  hasStreakIncreased: boolean;
  handleContinueAction: () => void;
  animationData: any | null;
  streakAnimationData: any | null;
};

export function useLessonCompleteFlow({
  lessonId,
  exitPath = "/",
}: Args): useLessonCompleteFlowReturn {
  const navigate = useNavigate();
  const { data: user } = useSuspenseQuery(qo.currentUser())

  const animationData = useLottie(TROPHY_ANIMATION);
  const streakAnimationData = useLottie(STREAK_ANIMATION);

  const lessonIdForMutation: string = lessonId ?? "";
  const courseIdForMutation: number = user?.currentCourseId ?? 0;

  const [hasStreakIncreased, setHasStreakIncreased] = useState(false);

  const completeSound = new Audio("/audio/completeLesson.mp3");

  const lessonCompleteMutation = useLessonComplete({
    lessonId: lessonIdForMutation,
    courseId: courseIdForMutation,
  });

  useEffect(() => {
    if (lessonId) {
      lessonCompleteMutation.mutate();
      completeSound.play();
    }
  }, [lessonId]);

  const handleContinueAction = useCallback(() => {
    if (!lessonCompleteMutation || !lessonCompleteMutation.data) return;

    const streakCount = lessonCompleteMutation.data.newStreakCount;

    if (!hasStreakIncreased && streakCount.oldCount != streakCount.newCount) {
      setHasStreakIncreased(true);
    } else {
      navigate(exitPath);
    }
  }, [lessonCompleteMutation.data, hasStreakIncreased, navigate, exitPath]);

  const lessonCompleteStats: LessonCompleteStats | undefined =
    lessonCompleteMutation.data
      ? {
          totalScore: lessonCompleteMutation.data.totalScore,
          accuracy: lessonCompleteMutation.data.accuracy,
          title:
            lessonCompleteMutation.data.accuracy < 100
              ? "Lesson Complete!"
              : "Perfect Lesson!",
          accuracyMessage: lessonCompleteMutation.data.message,
          newCount: lessonCompleteMutation.data.newStreakCount.newCount,
          oldCount: lessonCompleteMutation.data.newStreakCount.oldCount
        }
      : undefined;

  return {
    lessonCompleteStats: lessonCompleteStats,
    error: lessonCompleteMutation?.error,
    isError: lessonCompleteMutation?.isError,
    isPending: lessonCompleteMutation?.isPending,
    hasStreakIncreased: hasStreakIncreased,
    handleContinueAction: handleContinueAction,
    animationData: animationData,
    streakAnimationData: streakAnimationData,
  };
}
