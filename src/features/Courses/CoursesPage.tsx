import { HollowedArrow } from "../../Components/Atoms/HollowedArrow/HollowedArrow";
import { LanguageFlag } from "../../Components/Atoms/Icons/LanguageFlag";
import { ContentWidget } from "../../Components/Atoms/Widget/ContentWidget";
import { capitalizeFirst } from "../../Utils/Text/capitalizeUtils.ts";
import { useCoursesFlow } from "../../Hooks/Logic/Courses/useCoursesFlow.tsx";

type CoursesPageProps = {
  title: string;
};

export function CoursesPage({ title }: CoursesPageProps) {

  const {handleSelectCourse, coursesArray} = useCoursesFlow();

  const showBorder = (idx: number) => {
    if (!coursesArray) return "";
    if (idx != coursesArray.length - 1) {
      return "border-b border-b-duoGrayBorder";
    } else {
      return "";
    }
  };

  if (coursesArray)
    return (
      <div className="lg:py-6 lg:w-full py-20 px-4">
        <ContentWidget title={title}>
          {coursesArray.map((course, idx) => (
            <div
              key={course.id}
              onClick={() => handleSelectCourse(course.id)}
              className={`w-full py-6 hover:cursor-pointer flex gap-4 ${showBorder(
                idx
              )}`}
            >
              <div className="w-30 flex items-center">
                <LanguageFlag icon={course.imgSrc} height="h-12" />
              </div>
              <div className="items-center flex">
                <p className="text-2xl text-white">
                  {capitalizeFirst(course.title)}
                </p>
              </div>
              <div className="flex w-full items-center justify-end">
                <HollowedArrow />
              </div>
            </div>
          ))}
        </ContentWidget>
      </div>
    );
}
