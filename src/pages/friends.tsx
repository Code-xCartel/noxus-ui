import { Bell, Check, Copy, Repeat2, Shield, UserPlus } from "lucide-react";

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
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard.ts";
import { useFriendService } from "@/hooks/useFriendService.ts";

import demoAvatar from "@/assets/demoAvatar.jpg";
import { Button } from "@/components/ui/button.tsx";

const Friends = () => {
  const { user } = useAppSelector((state) => state.auth);

  const {
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
  } = useFriendService();

  const { copied, copyToClipboard } = useCopyToClipboard();

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
                              onClick={() => copyToClipboard(user.noxId)}
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
          </div>

          <Searchbar
            searchQuery={searchQuery}
            isValidSearchQuery={isValidSearchQuery}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            searchResult={searchResult!}
            isSearching={isLoadingSearch}
            addFriend={handleAddFriend}
            isAddingFriend={isAddingFriend}
            searchError={searchError}
            isFriendAlreadyInList={isFriendAlreadyInList}
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
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger
                className="data-[state=active]:bg-gradient-to-r from-purple-600/80 to-indigo-600/80 space-x-1"
                value="friends"
              >
                <UserPlus className="h-4 w-4" />
                <span>Friends</span>
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-gradient-to-r from-purple-600/80 to-indigo-600/80 space-x-1"
                value="requests"
              >
                <Bell className="h-4 w-4" />
                <span>Requests</span>
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-gradient-to-r from-purple-600/80 to-indigo-600/80 space-x-1"
                value="blocked"
              >
                <Shield className="h-4 w-4" />
                <span>Blocked</span>
              </TabsTrigger>
            </TabsList>
          </div>
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
                      onClick={refetchFriendRequests}
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
