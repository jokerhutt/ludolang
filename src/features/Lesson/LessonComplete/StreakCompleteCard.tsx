import Lottie from "lottie-react";
import { useEffect } from "react";

type StreakCompleteCardProps = {
  animationData: any;
  oldCount: number;
  newCount: number;
};

export function StreakCompleteCard({
  newCount,
  animationData,
}: StreakCompleteCardProps) {
    const completeSound = new Audio("/audio/completeLesson.mp3");

  useEffect(() => {
    completeSound.play();
  }, []);

  return (
    <div className="w-full h-full flex gap-6 flex-col lg:pb-20 justify-center items-center pb-6">
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay
        className="w-full h-80"
      />
      <h2 className="text-6xl text-mainAccent">{newCount}</h2>
      <h3 className="text-mainAccent text-3xl">Day Streak</h3>
    </div>
  );
}
