import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Button } from "@/components/ui/button.tsx";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import Spinner from "@/components/spinner.tsx";

import { NoxusUser } from "@/utils/types.ts";

type SearchbarProps = {
  searchQuery: string;
  isValidSearchQuery: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResult: NoxusUser;
  isSearching: boolean;
  sendFriendRequest: (args: string) => Promise<void>;
  isAddingFriend: boolean;
  searchError: FetchBaseQueryError | SerializedError | undefined;
  isFriendAlreadyAdded: (args: string) => boolean;
  handleRemoveFriend: (args: string) => Promise<void>;
  isRemovingFriend: boolean;
  handleBlockFriend: (args: string) => Promise<void>;
  isBlockingFriend: boolean;
  isBlockedUser: (args: string) => boolean;
  handleUnblockUser: (args: string) => Promise<void>;
  isUnblockingUser: boolean;
};

const Searchbar = ({
  searchQuery,
  isValidSearchQuery,
  handleChange,
  searchResult,
  isSearching,
  sendFriendRequest,
  isAddingFriend,
  searchError,
  isFriendAlreadyAdded,
  handleRemoveFriend,
  isRemovingFriend,
  handleBlockFriend,
  isBlockingFriend,
  isBlockedUser,
  handleUnblockUser,
  isUnblockingUser,
}: SearchbarProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        <kbd>
          <div
            className="relative mb-6 group p-1 flex w-80 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="h-5 w-5"></div>

            <div className="relative bg-primary-foreground text-white flex items-center justify-center gap-2 py-3 rounded-xl w-full focus-visible:ring-0 z-20">
              <Search className="h-5 w-5" />
              Search Noxus user
            </div>
            <div className="p-[1px] top-0 z-0 absolute left-0 h-full rounded-2xl w-20 bg-gradient-to-r from-purple-600 to-indigo-600 group-focus-within:w-full transition-all duration-300"></div>
            <div className="p-[1px] top-0 z-0 absolute right-0 h-full rounded-2xl w-20 bg-gradient-to-r from-purple-600 to-indigo-600 group-focus-within:w-full transition-all duration-300"></div>
            <div className="h-5 w-5"></div>
          </div>
        </kbd>
      </p>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={searchQuery}
          onChangeCapture={handleChange}
          placeholder="Type a Noxus ID (e.g., NOX-12345678)..."
        />
        <CommandList>
          <div className="p-4 h-32 flex justify-center items-center">
            {isSearching ? (
              <Spinner />
            ) : searchError ? (
              <div className="text-center text-red-500 py-8">
                <p>Failed to search User.</p>
                <p className="text-sm">Please try again later.</p>
              </div>
            ) : !isValidSearchQuery ? (
              "please enter a valid id"
            ) : !searchResult ? (
              <span>No user found</span>
            ) : (
              <div>
                {searchResult.username}
                {isFriendAlreadyAdded(searchResult.noxId) ? (
                  <div className="text-red-500">
                    <Button
                      onClick={() => handleRemoveFriend(searchResult.noxId)}
                      disabled={isRemovingFriend}
                    >
                      remove
                    </Button>
                    <Button
                      onClick={() => handleBlockFriend(searchResult.noxId)}
                      disabled={isBlockingFriend}
                    >
                      block
                    </Button>
                  </div>
                ) : isBlockedUser(searchResult.noxId) ? (
                  <Button
                    onClick={() => handleUnblockUser(searchResult.noxId)}
                    disabled={isUnblockingUser}
                  >
                    unblock
                  </Button>
                ) : (
                  <Button
                    onClick={() => sendFriendRequest(searchResult.noxId)}
                    disabled={isAddingFriend}
                  >
                    add
                  </Button>
                )}
              </div>
            )}
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Searchbar;
