import { SearchInput } from "@/components/common/Input/search-input";
import Header from "../Header/app-header";

const AppTopBar = () => {
  return (
    <div className="flex justify-between h-16 border-b border-gray-200 bg-white px-6">
      <div className="flex items-center  ">
        {/* Left side - Page Name */}
        <Header  />
      </div>
        
        
        <div className="flex items-center">
          {/* Center - Search */}
          <SearchInput />
        </div>
      </div>

    
  );
};

export default AppTopBar;
