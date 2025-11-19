import { HeroIcon } from "../../Components/Atoms/Icons/HeroIcon";

export function LeaderboardHeader() {
  return (
    <div className="w-full flex flex-col pb-4 border-b border-b-duoGrayBorder items-center gap-4">
      <HeroIcon iconName="TrophyIcon" className="h-16 text-mainAccent"/>
      <h1 className="text-3xl text-white">Leaderboard</h1>
    </div>
  );
}
