import { ProgressBar } from "../../Components/Atoms/Bar/ProgressBar";

type MonthlyChallengeProgressBarProps = {
  completed: number;
  total: number;
};

export function MonthlyChallengeProgressBar({
  completed,
  total,
}: MonthlyChallengeProgressBarProps) {

  const starIcon = completed ? "/icon-images/STAR_COMPLETE.svg" : "/icon-images/STAR_INCOMPLETE.svg"

  const bgcolor = "text-mainDark bg-mainAccent";

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
