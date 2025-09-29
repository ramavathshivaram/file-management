import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // ✅ use shadcn wrapper
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"; // ✅ use shadcn wrapper
import { ChevronDown } from "lucide-react";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  if (!user) {
    return null;
  }
  const handelClick = () => {
    clearUser();
    localStorage.removeItem("token");
    localStorage.removeItem("user-storage");
    localStorage.removeItem("folder-store");
    navigate("/login-or-register");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-2 p-2"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user.avatar || "/placeholder-avatar.jpg"}
              alt="User Avatar"
            />
            <AvatarFallback>
              {user.userName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="px-3 py-2">
            <p className="font-medium">{user.userName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handelClick} className="text-red-600">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
