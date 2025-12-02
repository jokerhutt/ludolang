import { useGoogleAuthEntry } from "../../Hooks/Queries/Mutations/useGoogleAuthEntry.tsx";
import { WideActionButton } from "../../Components/Atoms/Button/WideActionButton.tsx";

export function LoginPage() {
  const googleLogin = useGoogleAuthEntry();

  return (
    <div className="w-full flex items-center px-4 flex-col gap-6 justify-center h-full bg-white">
      <div className="w-full flex items-center flex-col">
        <h1 className="text-3xl">LudoLang</h1>
        <p className="text-center font-light py-2 text-lg">
          This is a non-commercial language-learning website heavily inspired by
          Duolingo, built as a personal practice project.
        </p>
      </div>

      <div className="w-full lg:w-1/2">
        <WideActionButton
          onSubmit={() => googleLogin()}
          isActive={true}
          activeTextColor="text-white"
          text="JOIN WITH GOOGLE"
          activeText="JOIN WITH GOOGLE"
        />
      </div>

      <div></div>
    </div>
  );
}
