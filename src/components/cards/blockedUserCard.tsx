import { NoxusUser } from "@/utils/types.ts";

import demoAvatar from "@/assets/demoAvatar.jpg";

const BlockedUserCard = ({ blockedUser }: { blockedUser: NoxusUser }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border-l-4 border-red-700">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={blockedUser.avatar || demoAvatar}
            alt={blockedUser.username}
            className="w-10 h-10 rounded-md filter grayscale"
          />
          <div className="absolute inset-0 bg-red-900/20 rounded-md"></div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 line-through">
            {blockedUser.username}
          </h3>
          <div className="flex items-center">
            <p className="text-xs text-gray-500">{blockedUser.noxId}</p>
          </div>
        </div>
      </div>
      <button className="text-sm px-3 py-1 bg-gray-700/50 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">
        Unblock
      </button>
    </div>
  );
};

export default BlockedUserCard;
