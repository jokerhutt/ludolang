import { useLocation, useNavigate } from "react-router";
import { HeroIcon, type IconName } from "../../Atoms/Icons/HeroIcon";

type FooterButtonProps = {
  children: React.ReactNode;
  path: string;
  navigateOn?: boolean;
  iconName: IconName;
};

export function FooterButton({
  children,
  iconName,
  path,
  navigateOn = true,
}: FooterButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive =
    navigateOn && path && path === "/"
      ? location.pathname === "/"
      : location.pathname.includes(path);

  const style = isActive ? "border border-main/80 bg-main/8" : "";
  const baseStyle = "p-2 rounded-lg";
  const hoverStyle = isActive
    ? "hover:bg-main/20"
    : "hover:bg-duoGrayButtonText/30";

  const handleNavigation = () => {
    if (path && path.length > 0 && navigateOn) {
      navigate(path);
    }
  };

  return (
    <div
      className={`${baseStyle} ${style} ${hoverStyle} lg:flex hover:cursor-pointer lg:items-center lg:gap-6`}
      onClick={() => handleNavigation()}
    >
      <HeroIcon className="text-mainAccent h-9" iconName={iconName} solid={isActive}/>
      {children}
    </div>
  );
}
