import type { QuestCategory } from "./QuestCategory.ts";

export type QuestType = {

    code: QuestCategory;
    progress: number;
    total: number;
    active: boolean;

}