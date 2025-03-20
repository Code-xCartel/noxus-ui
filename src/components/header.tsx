import { Bell } from "lucide-react";

import SideNavbar from "@/components/sideNavbar.tsx";

import demoAvatar from "@/assets/demoAvatar.jpg";

const Header = () => {
  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <SideNavbar />
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition duration-200 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <button className="hidden md:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:opacity-90 transition duration-300">
              Start a Noxus
            </button>
            <div className="hidden md:block h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full overflow-hidden">
              <img
                src={demoAvatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
