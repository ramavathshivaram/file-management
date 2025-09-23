import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  Home,
  Trash2,
  Clock,
  Tags,
  Settings,
  Heart,
  Share2,
  Component,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import useCountStore from "@/store/countStore";

const AppSidebar = () => {
  const navigate = useNavigate();
  const importantItemsCount = useCountStore(
    (state) => state.importantItemsCount
  );
  const favoriteItemsCount = useCountStore((state) => state.favoriteItemsCount);
  const recentItemsCount = useCountStore((state) => state.recentItemsCount);
  const trashedItemsCount = useCountStore((state) => state.trashedItemsCount);
  const storageUsed = useCountStore((state) => state.storageUsed);
  const storageLimit = useCountStore((state) => state.storageLimit);
  const items = [
    {
      title: "Home",
      icon: <Home className="size-5 mx-2" />,
      count: 10,
      navigate: "/",
    },
    {
      title: "Shared",
      icon: <Share2 className="size-5 mx-2" />,
      navigate: "/shared",
    },
    {
      title: "Recent",
      icon: <Clock className="size-5 mx-2" />,
      count: recentItemsCount,
      navigate: "/recent",
    },
    {
      title: "Favorites",
      icon: <Heart className="size-5 mx-2" />,
      count: favoriteItemsCount,
      navigate: "/favorites",
    },
    {
      title: "Tags",
      icon: <Tags className="size-5 mx-2" />,
      count: 245,
      navigate: "/tags",
    },
    {
      title: "Important",
      icon: <Component className="size-5 mx-2" />,
      count: importantItemsCount,
      navigate: "/important",
    },
    {
      title: "Trash",
      icon: <Trash2 className="size-5 mx-2" />,
      count: trashedItemsCount,
      navigate: "/trash",
    },
    {
      title: "Setting",
      icon: <Settings className="size-5 mx-2" />,
      navigate: "/setting",
    },
  ];

  return (
    <Sidebar className="pt-14 z-1 bg-gradient-to-tl from-gray-50 to-gray-200">
      <SidebarHeader />
      <SidebarContent className="flex gap-px">
        {items.map((item, index) => (
          <SidebarGroup key={index}>
            <NavLink
              to={item.navigate}
              className={({ isActive }) =>
                isActive ? "bg-gray-300 rounded-lg" : ""
              }
            >
              <div className="flex justify-between hover:bg-gray-200 hover:shadow-md hover:ml-2 h-10 w-full rounded-lg items-center p-4 group/item relative overflow-hidden transition-all duration-75 shadow-2xs cursor-pointer">
                <span className="absolute -left-5 group-hover/item:bg-gray-400/60 group-active/item:size-100 size-10 rounded-full transition-all"></span>
                <div className="flex justify-center items-center z-1">
                  {item.icon}
                  <span className="ml-1">{item.title}</span>
                </div>
                {item.count > 0 && (
                  <span className="bg-gray-300 px-2 rounded-md text-sm z-1">
                    {item.count}
                  </span>
                )}
              </div>
            </NavLink>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs mb-1">
          {Math.round((storageUsed / storageLimit) * 100)}% used
        </div>
        <Progress value={Math.round((storageUsed / storageLimit) * 100)} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
