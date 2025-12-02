import { HeroIcon } from "./HeroIcon";

type StreakIconProps = {
  height?: string;
};

export function StreakIcon({ height = "h-7" }: StreakIconProps) {
  return <HeroIcon iconName="FireIcon" solid className={`${height} text-mainAccent`}/>;
}
