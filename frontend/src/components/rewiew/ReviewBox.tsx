import { useEffect } from "react";
import { useReviewStore } from "../../store/useReviewStore";
import { useParams } from "react-router-dom";
import Review from "./Review";
import DropReview from "./DropReview";
import ReviewSkeleton from "../skeletons/ReviewSkeleton";

export default function ReviewBox() {
  const { getProductReviews, productReviews, loading, deleteReview } =
    useReviewStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductReviews(id);
    }
  }, [getProductReviews, id, deleteReview]);

  if (loading) {
    return <ReviewSkeleton />;
  }
  return (
    <div className="w-full p-8 m-12 py-0 mt-4">
      <h2 className=" text-center text-2xl font-bold  mb-8">Reviews</h2>
      <div className=" flex  justify-center px-2 mb-8 ">
        {productReviews.length > 0 ? (
          <div className=" w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productReviews.map((r) => (
              <Review key={r._id} Review={r} />
            ))}
          </div>
        ) : (
          <div className="text-center text-lg mt-4 text-gray-500 italic">
            No reviews yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
      <DropReview />
    </div>
  );
}
