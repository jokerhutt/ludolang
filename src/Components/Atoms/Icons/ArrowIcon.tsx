import { HeroIcon } from "./HeroIcon";

type ArrowIconProps = {
  isUp?: boolean;
  size?: string;
};

export function ArrowIcon({ isUp = true, size = "h-6 w-6" }: ArrowIconProps) {
  const rotation = isUp ? "rotate-0" : "rotate-180";
  return (
    <>
      <HeroIcon className={` ${rotation} ${size} text-mainAccent`} iconName="ChevronDoubleUpIcon" />
    </>
  );
}
