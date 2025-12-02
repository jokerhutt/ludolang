import { FooterButton } from "../../Components/Molecules/Footer/FooterButton";
import type { UserType } from "../../Types/User/UserType.ts";

type MainNavigationButtonsProps = {
  currentUser: UserType;
};

export function MainNavigationButtons({
  currentUser,
}: MainNavigationButtonsProps) {
  return (
    <>
      <FooterButton iconName="HomeIcon" path="/">
        <p className="hidden lg:flex text-white text-xl">Learn</p>
      </FooterButton>
      <FooterButton iconName="TrophyIcon" path="/leaderboard">
        <p className="hidden lg:flex text-white text-xl">Leaderboard</p>
      </FooterButton>
      <FooterButton iconName="ClipboardIcon" path="/quests">
        <p className="hidden lg:flex text-white text-xl">Quests</p>
      </FooterButton>
      <FooterButton
        iconName="UserIcon"
        navigateOn={!!currentUser}
        path={currentUser ? `/profile/${currentUser.id}` : "#"}
      >
        <p className="hidden lg:flex text-white text-xl">Profile</p>
      </FooterButton>
    </>
  );
}
