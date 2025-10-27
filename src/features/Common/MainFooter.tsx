import { useSuspenseQuery } from "@tanstack/react-query";
import { Footer } from "../../Components/Molecules/Footer/Footer";
import { MainNavigationButtons } from "./MainNavigationButtons";
import { qo } from "../../Constants/QueryConstants/queries.ts";

export function MainFooter() {

  const {data: currentUser} = useSuspenseQuery(qo.currentUser())

  return (
    <Footer padding="px-6" height="h-20 border-t border-t-duoGrayBorder">
      <div className="w-full flex items-center justify-between">
        <MainNavigationButtons currentUser={currentUser}/>
      </div>
    </Footer>
  );
}
