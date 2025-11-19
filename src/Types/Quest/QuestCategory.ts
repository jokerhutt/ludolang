import type { IconName } from "../../Components/Atoms/Icons/HeroIcon";

export type QuestCategory = "STREAK" | "ACCURACY" | "PERFECT";

export type QuestMetaData = {
  title: string;
  description: string;
  iconUrl: IconName;
  color: string;
};

export const QUEST_METADATA: Record<QuestCategory, QuestMetaData> = {
  STREAK: {
    title: "Extend your streak",
    description: "Extend your streak.",
    iconUrl: "FireIcon",
    color: "text-orange-400"
  },
  ACCURACY: {
    title: "High accuracy",
    description: "Score 90% or higher in 2 lessons.",
    iconUrl: "BoltIcon" ,
    color: "text-green-400"
  },
  PERFECT: {
    title: "Perfect lesson",
    description: "Get 1 perfect lesson.",
    iconUrl: "TrophyIcon",
    color: "text-duoGold"
  },
};
