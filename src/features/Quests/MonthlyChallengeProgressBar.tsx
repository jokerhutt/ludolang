import { ProgressBar } from "../../Components/Atoms/Bar/ProgressBar";

type MonthlyChallengeProgressBarProps = {
  completed: number;
  total: number;
};

export function MonthlyChallengeProgressBar({
  completed,
  total,
}: MonthlyChallengeProgressBarProps) {

  const fullyComplete = completed >= total

  const starIcon = completed ? "/icon-images/STAR_COMPLETE.svg" : "/icon-images/STAR_INCOMPLETE.svg"

  const bgcolor = "text-duoBackground bg-mainAccent";

  return (
    <ProgressBar
      completed={completed}
      total={total}
      barColor={bgcolor}
      showGoldOnComplete={true}
      showCountText={true}
      icon={starIcon}
    />
  );
}
