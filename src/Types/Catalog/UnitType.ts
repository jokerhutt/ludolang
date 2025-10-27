import type { ColorType } from "../Enum/ColorType.ts";

export type UnitType = {
  id: number;
  title: string;
  sectionId: number;
  description: string;
  color?: ColorType;
  orderIndex: number;
  animationPath: string;
};
