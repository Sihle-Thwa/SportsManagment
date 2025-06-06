import { useState } from "react";
import { Input } from "../Input/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-row h-full items-center justify-center">
      <div className="w-full min-w-sm">
        <Input
          startIcon={Search}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="input"
        />
      </div>
    </div>
  );
};
export { SearchInput };
