import { useEffect, useRef } from "react";
import { UnitBanner } from "./UnitBanner.tsx";
import { UnitPath } from "./UnitPath.tsx";
import { useUnitObserver } from "../../Effects/Observers/UnitObserver.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentUnitStore } from "../../Hooks/Queries/Data/useCurrentUnitStore.tsx";
import { scrollToUnit } from "../../Utils/State/scrollUtils.ts";
import { fadeInStagger } from "../../Effects/FadeInAnimation.ts";
import { ScrollToLessonButton } from "./ScrollToCurrentButton.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../Constants/QueryConstants/queries.ts";
import type { UnitType } from "../../Types/Catalog/UnitType.ts";
import { useSectionTree } from "../../Hooks/Logic/Catalog/useSectionTree.tsx";

export function SectionPage() {
  // -- REFS -- //
  const unitRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);

  // -- QUERY STATE -- //
  
  const {data: currentUser} = useSuspenseQuery(qo.currentUser())
  const {data: courseProgress} = useSuspenseQuery(qo.courseProgress(currentUser.currentCourseId))
  const {data: tree} = useSuspenseQuery(qo.sectionTree(courseProgress.sectionId))
  const {units, lessons} = useSectionTree({tree})

  // -- THIS HANDLES THE BANNER CHANGING -- //
  const { currentUnit, setCurrentUnit } = useCurrentUnitStore();

  useUnitObserver(unitRefs, units ?? [], setCurrentUnit);

  // -- THIS MAKES IT SO THE PAGE STARTS AT THE LAST KNOWN POSITION -- //
  useEffect(() => {
    scrollToUnit(currentUnit, units, scrollContainerRef, unitRefs);
  }, []);

    return (
      <>
        <UnitBanner currentUnit={currentUnit} />
        <div
          ref={scrollContainerRef}
          className="w-full h-full pb-20 lg:pb-0 bg-duoBackground overscroll-contain lg:overflow-visible"
        >
          <AnimatePresence>
            {units.map((unit: UnitType, index: number) => (
              <motion.div
                key={unit.id}
                ref={(el) => {
                  unitRefs.current[index] = el;
                }}
                {...fadeInStagger(index)}
              >
                <UnitPath
                  unit={unit}
                  index={index}
                  lessons={lessons.filter((lesson) => lesson.unitId == unit.id)}
                  currentLessonButtonRef={currentLessonRef}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <ScrollToLessonButton
          rootRef={scrollContainerRef}
          currentLessonRef={currentLessonRef}
        />
      </>
    );
}
