import { useNavigate } from "react-router";
import { GemsIcon } from "../../Components/Atoms/Icons/GemsIcon";
import { LanguageFlag } from "../../Components/Atoms/Icons/LanguageFlag";
import { StreakIcon } from "../../Components/Atoms/Icons/StreakIcon";
import type { CourseProgressType } from "../../Types/User/CourseProgressType.ts";
import type { CourseType } from "../../Types/Catalog/CourseType.ts";
import type { UserType } from "../../Types/User/UserType.ts";

type UserMainStatsProps = {
  courseObject: CourseType;
  courseProgress: CourseProgressType;
  currentUser: UserType;
};

export function UserMainStats({
  courseObject,
  courseProgress,
  currentUser,
}: UserMainStatsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full lg:justify-start lg:gap-8 justify-between">
      <div className="flex gap-3 items-center">
        <div
          className="hover:cursor-pointer"
          onClick={() => navigate("/courses")}
        >
          <LanguageFlag height="h-5" icon={courseObject?.imgSrc} />
        </div>
        <p className="text-xl text-white">{courseProgress.completedLessons}</p>
      </div>
      <div className="flex gap-2 items-center">
        <StreakIcon />
        <p className="text-xl text-white">{currentUser.streakLength}</p>
      </div>
      <div className="flex gap-2 items-center">
        <GemsIcon />
        <p className="text-xl text-white">{currentUser.points}</p>
      </div>
    </div>
  );
}
