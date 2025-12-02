import { useState } from "react";
import { AvatarHeader } from "./AvatarHeader";
import { UserWideImage } from "../UserWideImage";
import { useNavigate } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../../Constants/QueryConstants/queries.ts";
import { useUpdateAvatar } from "../../../Hooks/Queries/Mutations/useUpdateAvatar.tsx";

export function AvatarPage() {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const { data: avatars } = useSuspenseQuery(qo.avatars());
  const navigate = useNavigate();


  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.pfpSrc);

  const showSelectedBorder = (avatarUrl: string) =>
    avatarUrl == selectedAvatar ? "border-6 border-mainAccent" : "";

  const updateAvatarMutation = useUpdateAvatar();

  const submitUpdateAvatar = () => {
    if (selectedAvatar != currentUser.pfpSrc) {
      updateAvatarMutation.mutate(
        { selectedAvatar: selectedAvatar },
        {
          onSuccess: () => {
            navigate(`/profile/${currentUser.id}`);
          },
        }
      );
    } else {
      navigate(`/profile/${currentUser.id}`);
    }
  };

  if (avatars && currentUser)
    return (
      <div className="w-full h-full pb-24">
        <AvatarHeader
          submit={() => submitUpdateAvatar()}
          currentUserId={currentUser.id}
        />

        <div className="mt-6 relative flex px-4 justify-center">
          <UserWideImage imgSrc={selectedAvatar} />
        </div>

        <div className="w-full pt-10 px-4 grid grid-cols-3 lg:grid-cols-4 gap-10 auto-cols-max">
          {avatars.map((avatarUrl: string, i: number) => (
            <img
              onClick={() => setSelectedAvatar(avatarUrl)}
              key={i}
              className={`h-20 w-20 hover:cursor-pointer hover:opacity-85 lg:h-30 lg:w-30 rounded-full object-cover ${showSelectedBorder(
                avatarUrl
              )}`}
              src={avatarUrl}
            />
          ))}
        </div>
      </div>
    );
}
