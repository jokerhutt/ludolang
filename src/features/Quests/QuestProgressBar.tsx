import { ProgressBar } from "../../Components/Atoms/Bar/ProgressBar";

type QuestProgressBarProps = {
  completed: number;
  total: number;
};

export function QuestProgressBar({ completed, total }: QuestProgressBarProps) {
  const bgcolor = "bg-main/40 text-duoLightGray";
  const chestIcon =
    completed == total
      ? "/icon-images/STAR_COMPLETE.svg"
      : "/icon-images/STAR_INCOMPLETE.svg";
  return (
    <ProgressBar
      completed={completed}
      total={total}
      barColor={bgcolor}
      showGoldOnComplete={true}
      showCountText={true}
      icon={chestIcon}
    />
  );
}
