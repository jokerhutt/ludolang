import { useState } from "react";
import { AvatarHeader } from "./AvatarHeader";
import { UserWideImage } from "../UserWideImage";
import { useNavigate } from "react-router";
import { groupArrayElements } from "../../../Utils/UI/avatarUtils.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../../Constants/QueryConstants/queries.ts";
import {useUpdateAvatar} from "../../../Hooks/Queries/Mutations/useUpdateAvatar.tsx";

export function AvatarPage() {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser())
  const { data: avatars } = useSuspenseQuery(qo.avatars());
  const navigate = useNavigate();

  const avatarPairs = groupArrayElements(2, avatars);

  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.pfpSrc);

  const showSelectedBorder = (avatarUrl: string) =>
    avatarUrl == selectedAvatar ? "border-6 border-duoBlue" : "";

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

        <div className="w-full pt-10 flex gap-8 flex-col items-center px-4">
          {avatarPairs.map((pair, idx) => (
            <div
              key={idx}
              className="w-full flex justify-between items-center gap-6"
            >
              {pair.map((avatarUrl, i) => (
                <img
                  onClick={() => setSelectedAvatar(avatarUrl)}
                  key={i}
                  className={`min-h-14 max-h-14 h-14 hover:cursor-pointer hover:opacity-85 lg:min-h-30 lg:max-h-30 lg:h-30 w-full rounded-xl object-cover ${showSelectedBorder(
                    avatarUrl
                  )}`}
                  src={avatarUrl}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
}
