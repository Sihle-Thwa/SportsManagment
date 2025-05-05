import { NavUser } from "../SideNav/nav-user";
import { Separator } from "@radix-ui/react-separator";
import { SearchInput } from "@/components/common/Input/search-input";



const AppTopBar = () => {
  return (
    <div className="w-full h-16 border-b border-gray-200 bg-white lg:px-8">
      <div className="flex h-16 items-center">
        <Separator className="h-4 w-[1px] bg-gray-200" orientation="vertical" />

        {/* Center - Search */}
        <div className="flex ml-auto items-center px-4">
          <SearchInput />
        </div>
        
        {/* Right side - Icons */}
        <div className="flex ml-auto items-center space-x-4">
          <NavUser  />
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;
