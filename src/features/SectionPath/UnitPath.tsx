import { LessonButton } from "./LessonButtons/LessonButton.tsx";
import { SectionBreak } from "../../Components/Atoms/LineBreaks/SectionBreak.tsx";
import { shouldInvert } from "../../Constants/UIConstants/lessonPositionOffsets.ts";
import Lottie from "lottie-react";
import type { UnitType } from "../../Types/Catalog/UnitType.ts";
import { useLottie } from "../../Hooks/Animation/useLottie.tsx";
import type { LessonType } from "../../Types/Catalog/LessonType.ts";

type UnitPathProps = {
  index: number;
  unit: UnitType;
  currentLessonButtonRef: any;
  lessons: LessonType[]
};

export function UnitPath({
  index,
  currentLessonButtonRef,
  lessons,
  unit,
}: UnitPathProps) {


  const animationData = useLottie(unit.animationPath);

  const leftImageOffset = "mr-40 lg:mr-60";
  const rightImageOffset = "ml-40 lg:ml-60";

  const imageOffset = shouldInvert(index) ? leftImageOffset : rightImageOffset;

  return (
    <>
      {unit && unit.orderIndex != 1 && <SectionBreak lesson={unit.title} />}
      <div className="flex flex-col w-full items-center lg:mb-0 mt-20 lg:mt-10 space-y-6 relative">
        {unit && lessons && (
          <>
            {lessons.map((lesson, idx) => (
              <div className="w-auto py-1" key={idx}>
                <LessonButton
                  currentLessonButtonRef={currentLessonButtonRef}
                  idx={idx}
                  id={lesson.id}
                  courseIndex={index}
                  unitColor={unit.color}
                  unitOrderIndex={unit.orderIndex}
                />
              </div>
            ))}
          </>
        )}
        <div className={`absolute mt-30 ${imageOffset}`}>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay
            className="w-50 h-50"
          />
        </div>
      </div>
    </>
  );
}
