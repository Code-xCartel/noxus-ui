import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/utils/constants.ts";
import { RootState } from "@/store.ts";
import { Friend, NoxusUser, UserInfo } from "@/utils/types.ts";
import { LoginData, RegisterData } from "@/schemas/authSchema.ts";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Friends"],
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, LoginData>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<void, RegisterData>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getFriends: builder.query<Friend[], void>({
      query: () => "friends",
      providesTags: ["Friends"],
    }),
    addFriend: builder.mutation({
      query: (noxId) => ({
        url: `friends/add/${noxId}`,
        method: "POST",
      }),
      invalidatesTags: ["Friends"],
    }),
    searchUserById: builder.query<NoxusUser, string>({
      query: (noxId) => ({
        url: `friends/search/${noxId}`,
      }),
    }),
    getFriendRequests: builder.query<NoxusUser[], void>({
      query: () => "friends/pending",
    }),
    getBlockedUsers: builder.query<NoxusUser[], void>({
      query: () => "friends/blocked",
    }),
    blockFriend: builder.mutation<void, string>({
      query: (noxId) => ({
        url: `friends/block/${noxId}`,
        method: "PUT",
      }),
    }),
    unblockFriend: builder.mutation<void, string>({
      query: (noxId) => ({
        url: `friends/unblock/${noxId}`,
        method: "PUT",
      }),
    }),
    acceptFriendRequest: builder.mutation<void, string>({
      query: (noxID) => ({
        url: `friends/accept/${noxID}`,
        method: "PUT",
      }),
      invalidatesTags: ["Friends"],
    }),
    rejectFriendRequest: builder.mutation<void, string>({
      query: (noxId) => ({
        url: `friends/reject/${noxId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetFriendsQuery,
  useGetFriendRequestsQuery,
  useGetBlockedUsersQuery,
  useBlockFriendMutation,
  useUnblockFriendMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useSearchUserByIdQuery,
  useAddFriendMutation,
} = api;
