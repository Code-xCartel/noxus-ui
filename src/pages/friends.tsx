import React, { useState } from "react";
import { Check, Copy, Repeat2 } from "lucide-react";
import { toast } from "sonner";

import BlockedUserCard from "@/components/cards/blockedUserCard.tsx";
import FriendCard from "@/components/cards/friendCard.tsx";
import FriendRequestCard from "@/components/cards/friendRequestCard.tsx";
import Searchbar from "@/components/searchbar.tsx";
import Spinner from "@/components/spinner.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

import { useAppSelector } from "@/hooks/reduxHooks.ts";

import {
  useAcceptFriendRequestMutation,
  useAddFriendMutation,
  useBlockFriendMutation,
  useGetBlockedUsersQuery,
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
  useRejectFriendRequestMutation,
  useRemoveFriendMutation,
  useSearchUserByIdQuery,
  useUnblockUserMutation,
} from "@/services/api/api.ts";

import demoAvatar from "@/assets/demoAvatar.jpg";
import { Button } from "@/components/ui/button.tsx";

const Friends = () => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: friends,
    isLoading: isLoadingFriends,
    error: friendsError,
  } = useGetFriendsQuery();

  const {
    data: friendRequests,
    isLoading: isLoadingFriendRequests,
    error: friendRequestsError,
    refetch,
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

  const { user } = useAppSelector((state) => state.auth);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(user.noxId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockFriend = async (noxId: string) => {
    try {
      await blockFriend(noxId).unwrap();
    } catch {
      toast.error("Failed to Block User", {
        description: "An error occurred while blocking. Please try again.",
      });
    }
  };

  const sendFriendRequest = async (noxId: string) => {
    try {
      await addFriend(noxId).unwrap();
      toast.success("Friend Request Sent", {
        description: `Your friend request to ${noxId} has been sent successfully.`,
      });
    } catch {
      toast.error("Failed to Send Friend Request", {
        description:
          "An error occurred while sending the friend request. Please try again.",
      });
    }
  };

  const isFriendAlreadyAdded = (noxId: string) => {
    console.log(noxId);
    return !!friends?.some((item) => item.noxId === noxId);
  };

  const isBlockedUser = (noxId: string) => {
    return !!blockedUsers?.some((item) => item.noxId === noxId);
  };

  const handleRemoveFriend = async (noxId: string) => {
    try {
      await removeFriend(noxId).unwrap();
      toast.success("Friend Removed", {
        description: `Your friend ${noxId} has been been removed successfully.`,
      });
    } catch {
      toast.error("Failed to remove Friend.", {
        description:
          "An error occurred while removing friend. Please try again.",
      });
    }
  };

  const handleAcceptFriendRequest = async (noxId: string) => {
    try {
      await acceptFriendRequest(noxId).unwrap();
      toast.success("Friend Request Accepted", {
        description: `Friend request from ${noxId} has been been accepted successfully.`,
      });
    } catch {
      toast.error("Failed to accept request.", {
        description:
          "An error occurred while accepting friend request. Please try again.",
      });
    }
  };

  const handleRejectFriendRequest = async (noxId: string) => {
    try {
      await rejectFriendRequest(noxId).unwrap();
      toast.success("Friend Request Rejected", {
        description: `Friend Request from ${noxId} has been been rejected successfully.`,
      });
    } catch {
      toast.error("Failed to Reject Request.", {
        description:
          "An error occurred while rejecting friend request. Please try again.",
      });
    }
  };

  const handleUnblockUser = async (noxId: string) => {
    try {
      await unblockUser(noxId).unwrap();
    } catch {
      toast.error("Failed to Unblock.", {
        description:
          "An error occurred while unblocking user. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
            Noxus Nexus
          </h1>

          <div className="mb-6 relative p-1 px-6">
            <div className="relative p-6 rounded-xl z-50 bg-primary-foreground">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-0.5">
                      <img
                        src={user?.avatar || demoAvatar}
                        alt="User Avatar"
                        className="rounded-xl object-cover h-full w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold text-white">
                        {user?.username}
                      </h2>
                    </div>
                    <div className="mt-1">
                      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2 font-mono text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 font-bold">
                              {user.noxId}
                            </span>
                            <button
                              onClick={copyToClipboard}
                              className="ml-2 text-gray-400 hover:text-purple-400 focus:outline-none transition-colors"
                            >
                              {copied ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="px-4 py-2 bg-purple-800/50 hover:bg-purple-700 border border-purple-600/30 rounded-lg transition-colors cursor-pointer group">
                    <p className="text-sm font-semibold group-hover:text-white text-purple-300">
                      Edit Profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-[1px] top-0 z-0 absolute left-0 h-full rounded-2xl w-20 bg-gradient-to-r from-purple-600 to-indigo-600 group-focus-within:w-full transition-all duration-300"></div>
            <div className="p-[1px] top-0 z-0 absolute right-0 h-full rounded-2xl w-20 bg-gradient-to-r from-purple-600 to-indigo-600 group-focus-within:w-full transition-all duration-300"></div>
          </div>

          <Searchbar
            searchQuery={searchQuery}
            isValidSearchQuery={isValidSearchQuery}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            searchResult={searchResult!}
            isSearching={isLoadingSearch}
            sendFriendRequest={sendFriendRequest}
            isAddingFriend={isAddingFriend}
            searchError={searchError}
            isFriendAlreadyAdded={isFriendAlreadyAdded}
            handleBlockFriend={handleBlockFriend}
            handleRemoveFriend={handleRemoveFriend}
            isBlockingFriend={isBlockingFriend}
            isRemovingFriend={isRemovingFriend}
            handleUnblockUser={handleUnblockUser}
            isBlockedUser={isBlockedUser}
            isUnblockingUser={isUnblockingUser}
          />
        </div>

        <Tabs defaultValue="friends">
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:bg-gradient-to-r from-purple-600/80 to-indigo-600/80"
              value="friends"
            >
              Friends
            </TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
          </TabsList>
          <TabsContent value="friends">
            <div className="space-y-4">
              {isLoadingFriends ? (
                <div className="py-8 h-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : friendsError ? (
                <div className="text-center text-red-500 py-8">
                  <p>Failed to load friends.</p>
                  <p className="text-sm">Please try again later.</p>
                </div>
              ) : !friends || friends.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p>No friends to display.</p>
                  <p className="text-sm">Add some friends to get started!</p>
                </div>
              ) : (
                friends?.map((friend) => (
                  <FriendCard
                    key={friend.noxId}
                    friend={friend}
                    handleBlockFriend={handleBlockFriend}
                    isBlockingFriend={isBlockingFriend}
                    isRemovingFriend={isRemovingFriend}
                    handleRemoveFriend={handleRemoveFriend}
                  />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="requests">
            <div className="space-y-4">
              {isLoadingFriendRequests ? (
                <div>
                  <Spinner />
                </div>
              ) : friendRequestsError ? (
                <div className="text-center text-red-500 py-8">
                  <p>Failed to load friend requests.</p>
                  <p className="text-sm">Please try again later.</p>
                </div>
              ) : !friendRequests || friendRequests.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  No pending requests.
                </p>
              ) : (
                <>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={refetch}
                      className="px-2 py-0 rounded-xl"
                    >
                      <Repeat2 className="text-purple-600" />
                    </Button>
                  </div>
                  {friendRequests?.map((request) => (
                    <FriendRequestCard
                      key={request.noxId}
                      request={request}
                      handleAcceptFriendRequest={handleAcceptFriendRequest}
                      handleRejectFriendRequest={handleRejectFriendRequest}
                      isAcceptingFriendRequest={isAcceptingFriendRequest}
                      isRejectingFriendRequest={isRejectingFriendRequest}
                    />
                  ))}
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value="blocked">
            <div className="space-y-4">
              {isLoadingBlockedUsers ? (
                <div className="text-center py-8">
                  <Spinner />
                </div>
              ) : blockedUsersError ? (
                <div className="text-center text-red-500 py-8">
                  <p>Failed to load blocked users.</p>
                  <p className="text-sm">Please try again later.</p>
                </div>
              ) : !blockedUsers || blockedUsers.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  No blocked users found.
                </p>
              ) : (
                blockedUsers?.map((user) => (
                  <BlockedUserCard
                    key={user.noxId}
                    blockedUser={user}
                    handleUnblockUser={handleUnblockUser}
                    isUnblockingUser={isUnblockingUser}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Friends;
