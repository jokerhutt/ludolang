import { useNavigate } from "react-router";
import type { UserType } from "../../Types/User/UserType.ts";
import { RiPencilFill } from "react-icons/ri";
import { UserWideImage } from "./UserWideImage";
import type { CourseType } from "../../Types/Catalog/CourseType.ts";
import { getJoinDate } from "../../Utils/Text/dateUtiils.ts";

type UserProfileCardProps = {
  user: UserType;
  followers: number;
  userCourseInstances: CourseType[];
  isOwnPage: boolean;
};

export function UserProfileCard({
  user,
  followers,
  userCourseInstances,
  isOwnPage,
}: UserProfileCardProps) {
  const joinDate = getJoinDate(user.createdAt);
  const navigate = useNavigate();

  const editAvatar = (e: any) => {
    e.stopPropagation();
    navigate("/avatar");
  };

  return (
    <>
      <div className="mt-20 lg:mt-6 relative flex px-4 justify-center">
        {isOwnPage && (
          <div
            onClick={(e) => editAvatar(e)}
            className="absolute z-2 hover:cursor-pointer rounded-2xl p-2 bg-mainAccent flex items-center justify-center border top-2 right-2"
          >
            <RiPencilFill className="h-8 w-8" />
          </div>
        )}
        <UserWideImage imgSrc={user.pfpSrc} />
      </div>
      <div className="w-full flex px-4 justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full flex gap-1 flex-col">
            <p className="text-white text-2xl">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-duoGrayButtonText font-light text-xl">
              {user.username}
            </p>
            <p className="text-duoLightGray text-lg font-light">
              Joined {joinDate}
            </p>
            <p className="text-mainAccent">{followers} Followers</p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-end items-end">
          <div className="flex py-3 w-full gap-2 justify-end items-center">
            {userCourseInstances.map((course) => (
              <img
                key={course.id}
                onClick={() => navigate(`/courses/${user.id}`)}
                className="h-7 hover:cursor-pointer"
                src={course.imgSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
