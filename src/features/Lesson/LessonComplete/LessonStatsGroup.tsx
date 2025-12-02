import { GemsIcon } from "../../../Components/Atoms/Icons/GemsIcon.tsx";
import { ScoreTargetIcon } from "../../../Components/Atoms/Icons/ScoreTargetIcon.tsx";
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
