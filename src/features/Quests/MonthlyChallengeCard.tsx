import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../Constants/QueryConstants/queries.ts";
import { getCurrentMonth } from "../../Utils/Text/dateUtiils.ts";
import { MonthlyChallengeProgressBar } from "./MonthlyChallengeProgressBar";

export function MonthlyChallengeCard() {
  const { data: monthlyChallenge } = useSuspenseQuery(qo.monthlyChallenge());

  const completed = monthlyChallenge.progress;
  const total = monthlyChallenge.total;

  const currentMonth = getCurrentMonth();

  return (
    <div className="w-full p-4 flex gap-4 flex-col bg-duoDarkGreen">
      <div className="flex w-full">
        <div className="bg-white py-1 px-2 rounded-lg">
          <p className="text-duoDarkGreen">{currentMonth}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 p-4 bg-duoBackground rounded-xl">
        <p className="text-white text-lg">Complete {total} quests</p>
        <MonthlyChallengeProgressBar completed={completed} total={total} />
      </div>
    </div>
  );
}
