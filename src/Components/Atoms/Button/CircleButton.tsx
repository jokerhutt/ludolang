import type { ColorType } from "../../../Types/Enum/ColorType.ts";
import { colorMap } from "../../../Utils/Color/colorMap.ts";
import { HeroIcon, type IconName } from "../Icons/HeroIcon.tsx";

type CircleButtonProps = {
  mainColor?: string;
  unitColor?: ColorType;
  shadowColor?: string;
  icon?: IconName | null;
  offset?: string;
  iconOpacity?: string;
  onClick: () => void;
  extraStyle?: string;
  currentLessonRef?: any;
  buttonRef?: any;
};

export function CircleButton({
  mainColor,
  unitColor,
  icon,
  offset = "",
  iconOpacity = "",
  extraStyle,
  onClick,
  currentLessonRef,
  buttonRef,
}: CircleButtonProps) {
  const toDisplayColor = unitColor ? colorMap[unitColor] : colorMap["GREEN"];
  const colorCSS = mainColor
    ? mainColor
    : `${toDisplayColor.circleShadow} ${toDisplayColor.bg}`;

  return (
    <>
      <button
        ref={buttonRef ?? undefined}
        onClick={onClick}
        className={`h-14 w-16 hover:cursor-pointer rounded-full ${colorCSS} ${offset} ${extraStyle} active:translate-y-[5px] active:shadow-none flex items-center justify-center
        `}
        style={{ transition: "transform 0.2s" }}
      >
        <div ref={currentLessonRef}>
          <HeroIcon
            iconName={icon ?? "CheckIcon"}
            className={`flex items-center ${iconOpacity} h-7 justify-center text-white rounded-full`}
          />
        </div>
      </button>
    </>
  );
}
