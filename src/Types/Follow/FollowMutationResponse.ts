import type { FollowResponse } from "./FollowResponse.ts"

export type FollowMutationResponse = {
    actorUserId: number;
    followedUserId: number;
    followersNewStats: FollowResponse;
    followedNewStats: FollowResponse;
}