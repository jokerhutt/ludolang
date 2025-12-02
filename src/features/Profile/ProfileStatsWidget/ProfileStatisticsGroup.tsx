import type { UserType } from "../../../Types/User/UserType.ts";
import { ProfileStatsWidget } from "./ProfileStatsWidget";

type ProfileStatisticsGroupProps = {
  user: UserType;
};

export function ProfileStatisticsGroup({ user }: ProfileStatisticsGroupProps) {

  return (
    <div className="flex w-full flex-col gap-3 px-4">
      <p className="text-white text-2xl">Statistics</p>
      <div className="w-full flex gap-4 justify-between">
        <ProfileStatsWidget
          icon={"streak"}
          statDescription="Day Streak"
          count={user.streakLength}
        />
        <ProfileStatsWidget
          icon={"xp"}
          statDescription="Total XP"
          count={user.points}
        />
      </div>
    </div>
  );
}
