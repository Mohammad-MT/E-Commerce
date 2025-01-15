import { ArrowDownNarrowWide, ArrowDownWideNarrow, Filter } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import React, { useState } from "react";

interface Props {
  showFilterOp: boolean;
  setShowFilterOp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortOrder = ({ showFilterOp, setShowFilterOp }: Props) => {
  const { setFilter } = useProductStore();

  const [sortDesc, setSortDesc] = useState(true);

  return (
    <div className="flex flex-row gap-5 justify-between items-center w-full rounded-xl bg-base-200 px-5 py-1 mb-4  ">
      <div
        className="btn "
        onClick={() => {
          setShowFilterOp(!showFilterOp);
        }}
      >
        <Filter />
      </div>
      <div
        className="btn "
        onClick={() => {
          setSortDesc(!sortDesc);
          setFilter({ order: sortDesc ? "asc" : "desc" });
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
