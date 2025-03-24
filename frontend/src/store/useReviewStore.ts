import { create } from "zustand";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export type Review = {
  _id?: string;
  userInfo?: {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
  };
  productId: string;
  comment: string;
  rating: number;
  createdAt?: string;
};

type ReviewState = {
  productReviews: Review[];
  loading: boolean;
  getProductReviews: (productId: string) => void;
  addingReview: boolean;
  addReview: (productId: string, comment: string, rating: number) => void;
  deleteReview: (reviewId: string) => void;
};

export const useReviewStore = create<ReviewState>((set) => ({
  productReviews: [],
  loading: false,
  getProductReviews: async (productId) => {
    try {
      if (!productId) {
        return;
      }
      set({ loading: true });
      const res = await apiClient.get(`/reviews/${productId}`);
      set({ productReviews: res.data });
    } catch (error: any) {
      console.log("Error in get reviews store", error.message);
      set({ productReviews: [] });
    } finally {
      set({ loading: false });
    }
  },
  addingReview: false,
  addReview: async (productId: string, comment: string, rating: number) => {
    try {
      set({ addingReview: true });
      const authUser = await useAuthStore.getState().authUser;
      if (authUser) {
        const res = await apiClient.post("/reviews", {
          productId,
          comment,
          rating,
        });
        set((state) => ({
          productReviews: [...state.productReviews, res.data],
        }));
        toast.success("Review added successfully");
      } else {
        toast.error("You need to login to leave a review");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in add review store", error);
    } finally {
      set({ addingReview: false });
    }
  },
  deleteReview: async (reviewId: string) => {
    try {
      if (!reviewId) {
        return;
      }
      set({ loading: true });
      await apiClient.delete(`/reviews/${reviewId}`);
      set((state) => ({
        productReviews: state.productReviews.filter((r) => r._id !== reviewId),
      }));
      toast.success("Review deleted successfully");
    } catch (error: any) {
      console.log("Error in delete review store", error.message);
      toast.error("Error deleting review");
    } finally {
      set({ loading: false });
    }
  },
}));
