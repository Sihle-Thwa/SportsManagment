import { useState } from "react";
import { Input } from "../Input/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-row  ">
      <div className="flex items-center">
        <Input
          startIcon={Search}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="input-base"
        />
      </div>
    </div>
  );
};
export { SearchInput };
