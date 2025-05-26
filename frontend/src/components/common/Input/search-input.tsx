import { useState } from "react";
import { Input } from "@/components/common/Input/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-72 h-4 rounded-2xl colour-background">
      <div className="flex items-center pointer-events-auto">
        <Input
          startIcon={Search}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className=""
        />
      </div>
    </div>
  );
};
export { SearchInput };
