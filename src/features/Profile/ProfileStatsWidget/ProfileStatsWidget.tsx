import { GemsIcon } from "../../../Components/Atoms/Icons/GemsIcon";
import { StreakIcon } from "../../../Components/Atoms/Icons/StreakIcon";
import { ContentWidget } from "../../../Components/Atoms/Widget/ContentWidget";

type ProfileStatsWidgetProps = {
  icon: "streak" | "xp";
  statDescription: string;
  count: number;
};

export function ProfileStatsWidget({
  icon,
  statDescription,
  count,
}: ProfileStatsWidgetProps) {
  return (
    <ContentWidget padding="p-2">
      <div className="w-full flex gap-2">
        <div className="w-10 flex justify-center">
          {icon == "streak" ? <StreakIcon /> : <GemsIcon />}
        </div>
        <div className="w-full flex flex-col">
          <p className="text-white text-lg">{count}</p>
          <p className="text-duoGrayButtonText">{statDescription}</p>
        </div>
      </div>
    </ContentWidget>
  );
}
