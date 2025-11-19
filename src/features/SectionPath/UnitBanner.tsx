import { RectangleButton } from "../../Components/Atoms/Button/RectangleButton.tsx";
import type { UnitType } from "../../Types/Catalog/UnitType.ts";

type UnitBannerProps = {
  currentUnit: UnitType | null;
};

export function UnitBanner({ currentUnit }: UnitBannerProps) {
  if (currentUnit)
    return (
      <RectangleButton
        buttonWidth="w-full 2xl:w-3/4"
        unitColor={currentUnit?.color}
      >
        <div className="flex rounded-2xl h-20 w-full">
          <div className="w-full h-full px-4 pb-3 flex flex-col">
            <div className="mt-3 text-white/80">
              <p>SECTION 1, UNIT {currentUnit?.orderIndex}</p>
            </div>
            <div className="text-white text-xl">
              <p>{currentUnit?.title}</p>
            </div>
          </div>
        </div>
      </RectangleButton>
    );
}
