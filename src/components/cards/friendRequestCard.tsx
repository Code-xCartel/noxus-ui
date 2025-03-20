import { Check, X } from "lucide-react";

import demoAvatar from "@/assets/demoAvatar.jpg";

import { NoxusUser } from "@/utils/types";

const FriendRequestCard = ({ request }: { request: NoxusUser }) => {
  return (
    <div className="relative p-4 bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border border-dashed border-purple-800/30 hover:border-purple-600/50 transition-all duration-300">
      <div className="absolute top-0 right-0 w-20 h-20 bg-purple-600/10 rounded-full blur-2xl"></div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 p-0.5 rounded-lg rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src={request.avatar || demoAvatar}
                alt={request.username}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center">
              {request.username}
              <span className="ml-2 text-xs text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded-full">
                New
              </span>
            </h3>
            <p className="text-xs text-gray-400">{request.noxId}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-green-600/20 text-green-400 hover:bg-green-600/40 hover:text-green-300 rounded-lg transition-all hover:scale-105 active:scale-95">
            <Check className="w-5 h-5" />
          </button>
          <button className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 hover:text-red-300 rounded-lg transition-all hover:scale-105 active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
