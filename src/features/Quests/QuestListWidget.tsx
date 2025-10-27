import { useSuspenseQuery } from "@tanstack/react-query";
import { QuestListItem } from "./QuestListItem";
import { qo } from "../../Constants/QueryConstants/queries.ts";

export function QuestListWidget() {

  const {data: quests} = useSuspenseQuery(qo.quests())
  const isLast = (index: number) => index == quests.length - 1;

  return (
    <div className="w-hull w-full flex flex-col gap-2">
      {quests.map((quest, index) => (
        <QuestListItem key={quest.code} quest={quest} isLast={isLast(index)} />
      ))}
    </div>
  );
}
