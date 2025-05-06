import { useState } from "react";
import { Input } from "@/components/common/Input/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-72 h-4 bg-white border border-gray-300 rounded-2xl">
      <div className="flex items-center pointer-events-auto">
        <Input
          startIcon={Search}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className=" bg-white border rounded-md"
        />
      </div>
    </div>
  );
};
export { SearchInput };
