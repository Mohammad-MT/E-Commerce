import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";

const SortProductSidebar = () => {
  const { filter, setFilter } = useProductStore();
  const [sliderVal, setSliderVal] = useState({
    min: 0,
    max: 5000,
  });
  useEffect(() => {
    setFilter({
      minPrice: String(sliderVal.min),
      maxPrice: String(sliderVal.max),
    });
  }, [sliderVal]);

  return (
    <div className="flex flex-col w-72 pe-3 gap-2">
      <details className="collapse collapse-arrow  border border-base-300 rounded-lg">
        <summary className="collapse-title text-md font-bold bg-base-100 ">
          Sort By
        </summary>
        <div className="collapse-content p-2  border-t border-base-300">
          <ul className="flex flex-col gap-2 pt-2">
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ sortBy: "createdAt" })}
              >
                New
              </div>
            </li>
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ sortBy: "price" })}
              >
                Price
              </div>
            </li>
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ sortBy: "name" })}
              >
                Name
              </div>
            </li>
          </ul>
        </div>
      </details>
      <details className="collapse collapse-arrow  border border-base-300 rounded-lg">
        <summary className="collapse-title text-md font-bold bg-base-100  ">
          Product Categories
        </summary>
        <div className="collapse-content border-t border-base-300">
          <ul className="flex flex-col gap-2 pt-2">
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ category: "" })}
              >
                Clothing
              </div>
            </li>
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ category: "" })}
              >
                Footwear
              </div>
            </li>
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ category: "" })}
              >
                Electronics
              </div>
            </li>
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ category: "" })}
              >
                Home Appliances
              </div>
            </li>
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ category: "" })}
              >
                Books & Stationery
              </div>
            </li>
            <li>
              <div
                className=" rounded-md p-2 hover:bg-base-300"
                onClick={() => setFilter({ category: "" })}
              >
                Beauty & Health
              </div>
            </li>
          </ul>
        </div>
      </details>
      <details className="collapse collapse-arrow  border border-base-300 rounded-lg">
        <summary className="collapse-title text-md font-bold bg-base-100  ">
          Filter by Price
        </summary>
        <div className="collapse-content flex flex-col gap-4 py-2 border-t border-base-300">
          <div className="flex  items-center text-lg ">
            <span>
              Price: ${sliderVal.min} - ${sliderVal.max}
            </span>
          </div>
          <Slider
            range
            min={0}
            max={5000}
            defaultValue={[0, 5000]}
            pushable={true}
            onChange={(value) => {
              const [min, max] = value as number[];
              setSliderVal({ min, max });
            }}
            value={[sliderVal.min, sliderVal.max]}
          />
        </div>
      </details>
    </div>
  );
};

export default SortProductSidebar;
