import { Star, Trash2 } from "lucide-react";
import type { Review } from "../../store/useReviewStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useReviewStore } from "../../store/useReviewStore";

interface Prop {
  Review: Review;
}
const Review = ({ Review }: Prop) => {
  const { authUser } = useAuthStore();
  const { deleteReview } = useReviewStore();

  return (
    <div
      className=" h-fit bg-base-100 p-3 pb-1 shadow-md border border-base-300 rounded-lg"
      key={Review._id}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 mb-2">
            <div className="avatar">
              <div className="ring-pink-700 ring-offset-base-100 ring ring-offset-2 w-12 rounded-full ">
                <img src={Review.userInfo?.profilePic} />
              </div>
            </div>
            <p>{Review.userInfo?.username}</p>
          </div>
          <div className="flex space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  Review.rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                fill={Review.rating >= star ? "#facc15" : "none"}
              />
            ))}
          </div>
        </div>
        <div className="break-words">{Review.comment}</div>
        <div className="text-end text-sm text-gray-400">
          {Review.createdAt && new Date(Review.createdAt).toLocaleDateString()}
        </div>
        {authUser?.role === "admin" && (
          <div className="flex justify-end gap-2 mt-2">
            {/* <EditIcon className="text-yellow-400 cursor-pointer" /> */}
            <Trash2
              className="text-red-600 cursor-pointer"
              onClick={() => {
                if (Review._id) deleteReview(Review._id!);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
