import { LessonButton } from "./LessonButtons/LessonButton.tsx";
import { SectionBreak } from "../../Components/Atoms/LineBreaks/SectionBreak.tsx";
import type { UnitType } from "../../Types/Catalog/UnitType.ts";
import type { LessonType } from "../../Types/Catalog/LessonType.ts";

type UnitPathProps = {
  index: number;
  unit: UnitType;
  currentLessonButtonRef: any;
  lessons: LessonType[];
};

export function UnitPath({
  index,
  currentLessonButtonRef,
  lessons,
  unit,
}: UnitPathProps) {
  return (
    <>
      {unit && unit.orderIndex != 1 && <SectionBreak lesson={unit.title} />}
      <div className="flex flex-col w-full items-center my-10 space-y-6 relative">
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
      </div>
    </>
  );
}
