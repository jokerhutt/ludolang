import { CircleButton } from "../../../Components/Atoms/Button/CircleButton.tsx";
import { getOffset } from "../../../Constants/UIConstants/lessonPositionOffsets.ts";
import LessonPopover from "../../../Components/Molecules/Popover/LessonPopover.tsx";
import { CircleRing } from "../../../Components/Atoms/Button/CircleRing.tsx";
import type { ColorType } from "../../../Types/Enum/ColorType.ts";
import { LessonTopPopover } from "../../../Components/Molecules/Popover/LessonTopPopover.tsx";
import { UnitReviewButton } from "./UnitReviewButton.tsx";
import { useLessonButton } from "../../../Hooks/Logic/Catalog/useLessonButton.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../../Constants/QueryConstants/queries.ts";

type LessonButtonProps = {
  idx: number;
  id: number;
  unitOrderIndex: number;
  unitColor?: ColorType;
  courseIndex: number;
  currentLessonButtonRef: any;
};

export function LessonButton({
  idx,
  id,
  courseIndex,
  unitColor,
  unitOrderIndex,
  currentLessonButtonRef,
}: LessonButtonProps) {

  const {data: lesson} = useSuspenseQuery(qo.lesson(id))

  const {
    open,
    buttonState,
    styleState,
    containerRef,
    circleRef,
    handleButtonClick,
    handleChangeOpen,
  } = useLessonButton({
    lesson,
    id,
    unitOrderIndex,
    unitColor,
    currentLessonButtonRef,
  });
  const {
    isCurrent,
    isPassedOrCurrent,
    isReview,
    lessonStatus,
    popoverStatus,
    shouldShowBottomPopover,
    shouldShowTopPopover,
    shouldOpenTopPopover,
  } = buttonState;
  const { lessonImage, unitColorToShow, iconOpacity, style } = styleState;

    return (
      <div className="relative">
        {isReview && isPassedOrCurrent ? (
          <UnitReviewButton
            currentLessonRef={containerRef}
            style={style.reviewTrophy}
            circleRef={circleRef}
            handleButtonClick={handleButtonClick}
            unitOrderIndex={unitOrderIndex}
          />
        ) : (
          <CircleRing
            unitColor={unitColorToShow}
            offset={getOffset(courseIndex, idx)}
            show={isCurrent}
          >
            <CircleButton
              icon={lessonImage}
              unitColor={unitColorToShow}
              currentLessonRef={containerRef}
              buttonRef={circleRef}
              iconOpacity={iconOpacity}
              extraStyle={`${open ? "translate-y-[5px] shadow-none" : ""}`}
              onClick={handleButtonClick}
              offset={getOffset(courseIndex, idx)}
            />
          </CircleRing>
        )}

        {shouldShowBottomPopover && (
          <LessonPopover
            lessonStatus={lessonStatus}
            lessonIndex={idx}
            lesson={lesson}
            triggerRef={circleRef}
            unitColor={unitColorToShow}
            open={open}
            onOpenChange={handleChangeOpen}
          />
        )}
        {shouldShowTopPopover && (
          <LessonTopPopover
            offset={getOffset(courseIndex, idx)}
            open={shouldOpenTopPopover}
            lessonStatus={popoverStatus}
            unitColor={unitColor}
          />
        )}
      </div>
    );
}
