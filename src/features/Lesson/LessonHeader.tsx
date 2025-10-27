import { HeartIcon } from "../../Components/Atoms/Icons/HeartIcon.tsx";
import { XIcon } from "../../Components/Atoms/Icons/XIcon.tsx";
import { Header } from "../../Components/Molecules/Header/Header.tsx";
import { LessonProgressBar } from "./LessonSession/LessonProgressBar.tsx";

type LessonHeaderProps = {
  handleExitClick: () => void;
  completed: number;
  total: number;
};

export function LessonHeader({
  handleExitClick,
  completed,
  total,
}: LessonHeaderProps) {
  return (
    <Header showOnLg={true} padding="px-4" height="">
      <button className="active">
        <XIcon onClick={handleExitClick} />
      </button>
      <div className="w-full h-7 px-6 py-1">
        <LessonProgressBar total={total} completed={completed} />
      </div>
      <HeartIcon />
    </Header>
  );
}
