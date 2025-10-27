import { useSuspenseQuery } from "@tanstack/react-query";
import { useFollowCaches } from "../../Queries/Data/Follow/useFollowCaches.tsx";
import { useFollowers } from "../../Queries/Data/Follow/useFollowers.tsx";
import { useFollowingIds } from "../../Queries/Data/Follow/useFollowing.tsx";
import type { CourseType } from "../../../Types/Catalog/CourseType.ts";
import type { UserType } from "../../../Types/User/UserType.ts";
import { qo } from "../../../Constants/QueryConstants/queries.ts";

type useProfilePageFlowReturn = {
  isOwnPage: boolean;
  isLoadingData: boolean;
  pageUser?: UserType;
  currentUser: UserType;
  userCourses?: CourseType[];
  pageUserFollowers?: number[];
  followers: number[];
  following: number[];
};

export function useProfilePageFlow(userId?: string): useProfilePageFlowReturn {
  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  const { data: pageUser } = useSuspenseQuery(qo.user(userIdNumber))
  const { data: currentUser } = useSuspenseQuery(qo.currentUser())
  const { data: pageUserFollowers } = useFollowers(pageUser?.id ?? 0);

  const { data: userCourses } = useSuspenseQuery(qo.userCourses(pageUser.id))

  useFollowCaches(userIdNumber);

  const followersQuery = useFollowers(userIdNumber);
  const followingQuery = useFollowingIds(userIdNumber);

  const followers = followersQuery.data || [];
  const following = followingQuery.data || [];

  const isOwnPage = pageUser?.id == currentUser.id;

  const isLoadingData =
    !userCourses ||
    !pageUserFollowers ||
    !currentUser ||
    !pageUser ||
    !followers ||
    !following
  return {
    isOwnPage,
    isLoadingData,
    pageUser,
    currentUser,
    userCourses,
    pageUserFollowers,
    followers,
    following,
  };
}
