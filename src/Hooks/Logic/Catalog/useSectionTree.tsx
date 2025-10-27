import { useSuspenseQueries} from "@tanstack/react-query";
import type {
  FlatLesson,
  FlatSectionTree,
  FlatUnit,
} from "../../../Types/Catalog/FlatSectionTree.ts";
import { qo } from "../../../Constants/QueryConstants/queries.ts";
import type { LessonType } from "../../../Types/Catalog/LessonType.ts";

type Args = {
  tree: FlatSectionTree;
};

export function useSectionTree({ tree }: Args) {
  const unitQueries = useSuspenseQueries({
    queries: tree.units.map((unit: FlatUnit) => qo.unit(unit.id)),
  });

  const lessonQueries = useSuspenseQueries({
    queries: tree.units.flatMap((unit: FlatUnit) =>
      unit.lessons.map((lesson: FlatLesson) => qo.lesson(lesson.id))
    ),
  });

  const units = unitQueries.map((unitQuery) => unitQuery.data);
  const lessons: LessonType[] = lessonQueries.map(
    (lessonQuery) => lessonQuery.data!
  );

  return { units, lessons };
}
