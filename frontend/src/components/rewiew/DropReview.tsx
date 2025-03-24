import { Star } from "lucide-react";
import { useState } from "react";
import { useReviewStore } from "../../store/useReviewStore";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const DropReview = () => {
  const { addReview, addingReview } = useReviewStore();

  const { id: productId } = useParams();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const submit = () => {
    if (review === "") {
      toast.error("Please enter a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    addReview(productId!, review, rating);
    setReview("");
    setRating(0);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-base-100 p-4 shadow-lg border border-base-300 rounded-lg">
        <div>
          <h2 className="text-xl font-bold mb-2">Leave a Review</h2>
          <div className="flex space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  (hover || rating) >= star
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                fill={(hover || rating) >= star ? "#facc15" : "none"}
              />
            ))}
          </div>
          <textarea
            className="w-full p-2 border border-base-300 rounded-md mb-4"
            rows={4}
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button
            className="w-full btn btn-neutral"
            onClick={submit}
            disabled={addingReview}
          >
            {addingReview ? "Loading..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropReview;
