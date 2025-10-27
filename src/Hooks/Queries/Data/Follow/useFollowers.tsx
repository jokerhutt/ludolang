import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../../Constants/QueryConstants/queryKeys.ts";
import { fetchFollowResponse } from "./useFollowCaches.tsx";

export function useFollowers(userId: number) {
  const qc = useQueryClient();
  return useQuery<number[]>({
    queryKey: qk.followers(userId),
    queryFn: async () => {
      const base = await qc.ensureQueryData({
        queryKey: ["follows", userId],
        queryFn: () => fetchFollowResponse(userId),
      });
      return base.followerIds;
    },
    staleTime: 60_000,
  });
}
