export type FlatSectionTree = {
  courseId: number;
  units: FlatUnit[];
};

export type FlatUnit = {
  id: number;
  orderIndex: number;
  lessons: FlatLesson[];
};

export type FlatLesson = {
  id: number;
  orderIndex: number;
};
