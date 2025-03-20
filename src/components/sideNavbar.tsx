import { useNavigate } from "react-router-dom";
import { House, UserRoundPen, UsersRound, Zap } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";

import { routes } from "@/constants/routes.ts";

const SideNavbar = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 w-8 h-8 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
              Noxus
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <Button
          variant={"ghost"}
          className="w-full justify-start"
          onClick={() => handleClick(routes.HOME)}
        >
          <House />
          Home
        </Button>{" "}
        <Button
          variant={"ghost"}
          className="w-full justify-start"
          onClick={() => handleClick(routes.FRIENDS)}
        >
          <UsersRound />
          Friends
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start"
          onClick={() => handleClick(routes.ACCOUNT)}
        >
          <UserRoundPen />
          My Account
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavbar;
