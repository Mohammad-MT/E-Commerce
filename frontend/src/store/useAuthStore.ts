import toast from "react-hot-toast";
import { create } from "zustand";
import apiClient from "../services/apiClient";

export type UserType = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  profilePic: string;
  phone?: number;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

type AuthState = {
  authUser: UserType | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  isUpdatingProfile: boolean;

  checkAuth: () => void;
  signup: (data: {
    username: string;
    email: string;
    fullname: string;
    password: string;
  }) => void;
  login: (data: { username: string; password: string }) => void;
  logout: () => void;
  updateProfile: (profilePicData: { profilePic: string }) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await apiClient.get("/users/check");

      if (res) set({ authUser: res.data });
      else set({ authUser: null });
    } catch (error: any) {
      console.log("Error in CheckAuth ", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await apiClient.post("/users/signup", data);

      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await apiClient.post("/users/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/users/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await apiClient.put("/users/updateProfileImg", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
