import { useProductStore } from "../store/useProductStore";

const Pagination = () => {
  const { page, totalPages, setPage } = useProductStore();

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <div className="join my-5">
        <button
          className="join-item btn  "
          onClick={() => handlePageChange(page - 1)}
        >
          -
        </button>
        <button className="join-item btn btn-active  ">
          {page} of {totalPages}
        </button>
        <button
          className="join-item btn  "
          onClick={() => handlePageChange(page + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Pagination;
