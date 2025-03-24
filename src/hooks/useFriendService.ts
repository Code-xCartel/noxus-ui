import { useState } from "react";
import { toast } from "sonner";
import {
  useAcceptFriendRequestMutation,
  useAddFriendMutation,
  useBlockFriendMutation,
  useRejectFriendRequestMutation,
  useRemoveFriendMutation,
  useUnblockUserMutation,
  useGetFriendsQuery,
  useGetFriendRequestsQuery,
  useGetBlockedUsersQuery,
  useSearchUserByIdQuery,
} from "@/services/api/api.ts";
import { TypedMutationTrigger } from "@reduxjs/toolkit/query/react";

export const useFriendService = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [addFriend, { isLoading: isAddingFriend }] = useAddFriendMutation();
  const [blockFriend, { isLoading: isBlockingFriend }] =
    useBlockFriendMutation();
  const [removeFriend, { isLoading: isRemovingFriend }] =
    useRemoveFriendMutation();
  const [acceptFriendRequest, { isLoading: isAcceptingFriendRequest }] =
    useAcceptFriendRequestMutation();
  const [rejectFriendRequest, { isLoading: isRejectingFriendRequest }] =
    useRejectFriendRequestMutation();
  const [unblockUser, { isLoading: isUnblockingUser }] =
    useUnblockUserMutation();

  const {
    data: friends,
    isLoading: isLoadingFriends,
    error: friendsError,
  } = useGetFriendsQuery();

  const {
    data: friendRequests,
    isLoading: isLoadingFriendRequests,
    error: friendRequestsError,
    refetch: refetchFriendRequests,
  } = useGetFriendRequestsQuery();

  const {
    data: blockedUsers,
    isLoading: isLoadingBlockedUsers,
    error: blockedUsersError,
  } = useGetBlockedUsersQuery();

  const isValidSearchQuery = /^NOX-\d{8}$/.test(searchQuery);

  const {
    data: searchResult,
    isLoading: isLoadingSearch,
    error: searchError,
  } = useSearchUserByIdQuery(searchQuery, { skip: !isValidSearchQuery });

  const handleMutation = async (
    action: TypedMutationTrigger<void, string, any>,
    noxId: string,
    errorMessage: string,
    successMessage?: string,
  ) => {
    try {
      await action(noxId).unwrap();
      if (successMessage) {
        toast.success(successMessage, {
          description: `Your action to ${noxId} has been processed.`,
        });
      }
    } catch {
      toast.error(errorMessage, {
        description: "An error occurred. Please try again.",
      });
    }
  };

  const handleAddFriend = async (noxId: string) =>
    await handleMutation(
      addFriend,
      noxId,
      "Failed to send friend request",
      "Friend request sent",
    );

  const handleRemoveFriend = async (noxId: string) => {
    await handleMutation(removeFriend, noxId, "Failed to remove friend");
  };

  const handleAcceptFriendRequest = async (noxId: string) => {
    await handleMutation(
      acceptFriendRequest,
      noxId,
      "Failed to accept request",
    );
  };

  const handleRejectFriendRequest = async (noxId: string) => {
    await handleMutation(
      rejectFriendRequest,
      noxId,
      "Failed to reject request",
    );
  };

  const handleBlockFriend = async (noxId: string) =>
    await handleMutation(
      blockFriend,
      noxId,
      "Failed to block user",
      "User Blocked",
    );

  const handleUnblockUser = async (noxId: string) => {
    await handleMutation(unblockUser, noxId, "Failed to unblock user");
  };

  const isFriendAlreadyInList = (noxId: string) => {
    return !!friends?.some((item) => item.noxId === noxId);
  };

  const isBlockedUser = (noxId: string) => {
    return !!blockedUsers?.some((item) => item.noxId === noxId);
  };

  return {
    searchQuery,
    setSearchQuery,
    isValidSearchQuery,
    searchResult,
    isLoadingSearch,
    searchError,

    handleAddFriend,
    handleRemoveFriend,
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleBlockFriend,
    handleUnblockUser,

    isFriendAlreadyInList,
    isBlockedUser,

    isAddingFriend,
    isBlockingFriend,
    isRemovingFriend,
    isAcceptingFriendRequest,
    isRejectingFriendRequest,
    isUnblockingUser,

    friends,
    isLoadingFriends,
    friendsError,
    friendRequests,
    isLoadingFriendRequests,
    friendRequestsError,
    blockedUsers,
    isLoadingBlockedUsers,
    blockedUsersError,

    refetchFriendRequests,
  };
};
