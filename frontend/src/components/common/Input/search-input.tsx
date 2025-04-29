import { useState } from "react";
import { Input } from "@/components/common/Input/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex max-w-72">
      <div className="flex inset-y-0 left-2 items-center pointer-events-auto">
        <Input
          startIcon={Search}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-white border rounded-md"
        />
      </div>
    </div>
  );
};
export { SearchInput };
