import { useNavigate } from "react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {qo} from "../../Constants/QueryConstants/queries.ts";

type UserRow = {
  userId: number;
  specialBg?: boolean;
};

export function UserRow({ userId, specialBg}: UserRow) {
  const { data: user } = useSuspenseQuery(qo.user(userId));
  const navigate = useNavigate();
  const realUser = user;
  const style = specialBg ? "bg-mainAccent/20" : "";

  return (
    <div
      className={`w-full hover:cursor-pointer px-4 h-18 flex py-2 ${style}`}
      onClick={() => navigate(`/profile/${userId}`)}
    >
      <div className="w-20">
        <img
          alt={`${user.username}`}
          className="w-11 h-11 object-cover rounded-full"
          src={realUser.pfpSrc}
        />
      </div>
      <div className={`w-full flex flex-col`}>
        <p className="text-xl text-white">{realUser.firstName}</p>
        <p className="font-light text-duoGrayButtonText">{realUser.points} XP</p>
      </div>
    </div>
  );
}
