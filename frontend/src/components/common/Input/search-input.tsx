import { useState } from "react";
import { Input } from "../Input/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-72 rounded-radius ">
      <div className="flex items-center pointer-events-auto">
        <Input
          startIcon={Search}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full h-10 bg-transparent text-sm text-primary-foreground placeholder:text-muted-foreground focus:ring-0 focus:border-primary-500"
        />
      </div>
    </div>
  );
};
export { SearchInput };
