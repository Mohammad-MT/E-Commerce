import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";

const SortProductSidebar = () => {
  const { setFilter } = useProductStore();
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const [selectedCategore, setSelectedCategore] = useState<string | null>(
    "All"
  );

  const [sliderVal, setSliderVal] = useState({
    min: 0,
    max: 3000,
  });
  useEffect(() => {
    setFilter({
      minPrice: String(sliderVal.min),
      maxPrice: String(sliderVal.max),
    });
  }, [sliderVal]);

  const sortConstant = {
    sortBy: [
      { name: "Newest", filter: "createdAt" },
      { name: "Price", filter: "price" },
      { name: "Name", filter: "name" },
    ],
    category: [
      { name: "All", filter: "" },
      { name: "Electronics", filter: "electronics" },
      { name: "Clothing", filter: "clothing" },
      { name: "Home", filter: "home" },
      { name: "Toys", filter: "toys" },
      { name: "Sports", filter: "sports" },
      { name: "Books", filter: "books" },
      { name: "Tools", filter: "tools" },
      { name: "Other", filter: "other" },
    ],
    priceRange: [
      { min: "0", max: "50" },
      { min: "50", max: "100" },
      { min: "100", max: "250" },
      { min: "500", max: "1000" },
      { min: "1000", max: "3000" },
    ],
  };

  return (
    <div>
      <div className="flex flex-col w-72 rounded-lg me-3 gap-0  border border-base-300 ">
        <details className="collapse collapse-arrow  border border-base-300  rounded-t-lg rounded-b-none">
          <summary className="collapse-title text-md font-bold bg-base-100 ">
            Sort order
          </summary>

          <div className="collapse-content p-2  border-t border-base-300">
            <ul className="flex flex-col gap-2 pt-2">
              {sortConstant.sortBy.map((s) => (
                <li
                  className={`rounded-md p-2 hover:bg-base-300 ${
                    selectedSort === s.filter ? "bg-base-300" : ""
                  }`}
                  onClick={() => {
                    setSelectedSort(s.filter);
                    setFilter({ sortBy: s.filter });
                  }}
                >
                  <span className="text ps-4">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="collapse collapse-arrow  border border-base-300 rounded-none">
          <summary className="collapse-title text-md font-bold bg-base-100  ">
            Categories
          </summary>
          <div className="collapse-content border-t border-base-300">
            <ul className="flex flex-col gap-2 pt-2">
              {sortConstant.category.map((s) => (
                <li
                  onClick={() => {
                    setFilter({ category: s.filter });
                    setSelectedCategore(s.name);
                  }}
                >
                  <div
                    className={`rounded-md p-2 hover:bg-base-300 ${
                      selectedCategore === s.name && "bg-base-300"
                    }`}
                  >
                    <span className="text ps-4">{s.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>
        <details className="collapse collapse-arrow  border border-base-300 rounded-b-lg rounded-t-none">
          <summary className="collapse-title text-md font-bold bg-base-100  ">
            Price Range
          </summary>
          <div className="collapse-content flex flex-col gap-2  pt-2 border-t border-base-300">
            {sortConstant.priceRange.map((s) => (
              <div
                className={` rounded-md p-2 hover:bg-base-300 ps-6 ${
                  s.min === selectedPriceRange && "bg-base-300"
                }`}
                onClick={() => {
                  setSliderVal({ min: parseInt(s.min), max: parseInt(s.max) });
                  setSelectedPriceRange(s.min);
                }}
              >
                <span>{s.min}</span>
                <span>-</span>
                <span>{s.max}</span>
              </div>
            ))}
            <div className="px-4 pt-4">
              <Slider
                range
                min={0}
                max={3000}
                defaultValue={[0, 3000]}
                pushable={true}
                onChange={(value) => {
                  const [min, max] = value as number[];
                  setSliderVal({ min, max });
                }}
                value={[sliderVal.min, sliderVal.max]}
              />
              <div className="flex  items-center text-lg mt-2 ">
                <span className="whitespace-nowrap">Price :</span>
                <div className=" flex w-full justify-between px-5">
                  <div>{sliderVal.min}</div>
                  <span>-</span>
                  <div>{sliderVal.max}</div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default SortProductSidebar;
