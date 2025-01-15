import { ArrowDownNarrowWide, ArrowDownWideNarrow, Filter } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useState } from "react";

interface Props {
  setShowFilter: () => void;
}

const SortOrder = ({ setShowFilter }: Props) => {
  const { setFilter } = useProductStore();

  const [sortDesc, setSortDesc] = useState(true);
  const newOrder = sortDesc ? "asc" : "desc";

  return (
    <div className="flex flex-row gap-5 justify-between items-center w-full rounded-xl bg-base-200 px-5 py-1 mb-4  ">
      <div className="btn " onClick={setShowFilter}>
        <Filter />
      </div>
      <div
        className="btn "
        onClick={ () => {
           setSortDesc(!sortDesc);
           setFilter({ order: newOrder });
        }}
      >
        {sortDesc ? (
          <ArrowDownWideNarrow size={24} />
        ) : (
          <ArrowDownNarrowWide size={24} />
        )}
      </div>
    </div>
  );
};

export default SortOrder;
