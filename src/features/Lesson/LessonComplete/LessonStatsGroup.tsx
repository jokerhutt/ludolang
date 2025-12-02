import { GemsIcon } from "../../../Components/Atoms/Icons/GemsIcon.tsx";
import { LightningIcon } from "../../../Components/Atoms/Icons/LightningIcon.tsx";
import { ScoreTargetIcon } from "../../../Components/Atoms/Icons/ScoreTargetIcon.tsx";
import { StreakIcon } from "../../../Components/Atoms/Icons/StreakIcon.tsx";
import { LessonStatsCard } from "./LessonStatsCard.tsx";

type LessonStatsGroupProps = {
  totalScore: string | number;
  correctPercentage: string | number;
  statsHeader: string;
};

export function LessonStatsGroup({
  totalScore,
  correctPercentage,
  statsHeader,
}: LessonStatsGroupProps) {
  return (
    <div className="w-full flex gap-6 justify-center">
      <LessonStatsCard
        title="TOTAL XP"
        score={totalScore}
        scoreIcon={<GemsIcon />}
        mainColor="bg-mainAccent"
        mainTextColor="text-mainAccent"
      />

      <LessonStatsCard
        title={statsHeader}
        score={correctPercentage}
        scoreSign="%"
        mainColor="bg-mainAccent"
        mainTextColor="text-mainAccent"
        scoreIcon={<ScoreTargetIcon />}
      />
    </div>
  );
}
