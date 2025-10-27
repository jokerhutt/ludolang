import { useInView } from "react-intersection-observer";
import { useInfiniteList } from "../../Queries/Infinite/useInfiniteList.tsx";
import type { UserType } from "../../../Types/User/UserType.ts"
import { useEffect, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "../../../Constants/QueryConstants/queries.ts";

type useLeaderboardFlowReturn = {
    currentUser: UserType;
    users: UserType[];
    sentinelRef: any | null;
    isLoading: boolean;
    hasNextPage: boolean;
}

export function useLeaderboardFlow (): useLeaderboardFlowReturn {

  const { users, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteList();

  const { data: currentUser } = useSuspenseQuery(qo.currentUser())

  const { ref: sentinelRef, inView: isInView } = useInView({
    rootMargin: "100px 0px",
    threshold: 0,
  });

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => b.points - a.points || a.id - b.id),
    [users]
  );

  useEffect(() => {
    console.log("Effect triggered:", {
      isInView,
      hasNextPage,
      isFetchingNextPage,
    });
    if (isInView && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page");
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    {
        currentUser: currentUser,
        users: sortedUsers,
        sentinelRef: sentinelRef,
        isLoading,
        hasNextPage
    }
  )

}