import { QUEST_METADATA } from "../../Types/Quest/QuestCategory.ts";
import type { QuestType } from "../../Types/Quest/QuestType.ts";
import { QuestProgressBar } from "./QuestProgressBar";

type QuestListItemProps = {
  isLast?: boolean;
  quest: QuestType;
};

export function QuestListItem({ quest }: QuestListItemProps) {
  const total = quest.total;
  const completed = quest.progress;

  const showBottomBorder = true ? "border-b-duoGrayBorder border-b" : "";

  const metaData = QUEST_METADATA[quest.code];

  return (
    <div className={`w-full flex items-center py-7 ${showBottomBorder}`}>
      <div className="flex flex-col w-full justify-between gap-4">
        <div className="w-full text-white text-xl">
          <p>{metaData.description}</p>
        </div>
        <QuestProgressBar completed={completed} total={total} />
      </div>
    </div>
  );
}
