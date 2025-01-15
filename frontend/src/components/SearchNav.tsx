import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";

const SearchNav = () => {
  const [showSearch, setShowSearch] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const { setFilter } = useProductStore();

  useEffect(() => {
    if (searchInput.trim().length !== 0) {
      setFilter({ search: searchInput });
    } else {
      setFilter({ search: searchInput });
    }

    if (showSearch === false) {
      setSearchInput("");
      setFilter({ search: searchInput });
    }
  }, [searchInput, showSearch]);

  return (
    <div>
      <span
        className=" hover:text-pink-700 hover:cursor-pointer"
        onClick={() => setShowSearch(!showSearch)}
      >
        {!showSearch && <Search />}
      </span>
      {showSearch && (
        <label className="input input-bordered rounded-3xl flex items-center gap-1">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            // value={searchInput}
            onKeyUp={(e) => setSearchInput(e.currentTarget.value)}
          />
          <Search className=" hover:cursor-pointer hover:text-blue-400" />
          <X
            className=" hover:cursor-pointer hover:text-red-600"
            onClick={() => setShowSearch(!showSearch)}
          />
        </label>
      )}
    </div>
  );
};

export default SearchNav;
