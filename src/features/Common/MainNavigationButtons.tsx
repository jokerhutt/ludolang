import { UserChestQuestsIcon } from "../../Components/Atoms/Icons/UserChestQuestsIcon";
import { UserFooterIcon } from "../../Components/Atoms/Icons/UserFooterIcon";
import { UserHomeIcon } from "../../Components/Atoms/Icons/UserHomeIcon";
import { UserLeagueIcon } from "../../Components/Atoms/Icons/UserLeagueIcon";
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
      <FooterButton path="/">
        <UserHomeIcon />
        <p className="hidden lg:flex text-white text-xl">Learn</p>
      </FooterButton>
      <FooterButton path="/leaderboard">
        <UserLeagueIcon />
        <p className="hidden lg:flex text-white text-xl">Leaderboard</p>
      </FooterButton>
      <FooterButton path="/quests">
        <UserChestQuestsIcon />
        <p className="hidden lg:flex text-white text-xl">Quests</p>
      </FooterButton>
      <FooterButton
        navigateOn={!!currentUser}
        path={currentUser ? `/profile/${currentUser.id}` : "#"}
      >
        <UserFooterIcon />
        <p className="hidden lg:flex text-white text-xl">Profile</p>
      </FooterButton>
    </>
  );
}
