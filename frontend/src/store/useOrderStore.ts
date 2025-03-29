import { create } from "zustand";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import { useCartStore } from "./useCartStore";

type orderItem = {
  productId?: string;
  name: string;
  price: number;
  finalPrice: number;
  quantity: number;
};

export type order = {
  _id?: string;
  userInfo: {
    _id: string;
    name: string;
    email: string;
  };
  items: orderItem[];
  status?: string;
  totalAmount: number;
  createdAt?: string;
};

type OrderStore = {
  allOrders: order[];
  isLoadingGetAllOrders: boolean;
  myorders: order[];
  isLoadingGetMyOrders: boolean;
  getAllOrders: () => void;
  getMyOrders: () => void;
  isSuccess: boolean;
  addNewOrder: (order: order) => void;
  updateStatus: (order: order) => void;
  removeOrder: (order: order) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  allOrders: [],
  isLoadingGetAllOrders: false,
  myorders: [],
  isLoadingGetMyOrders: false,
  isSuccess: false,
  getAllOrders: async () => {
    set({ isLoadingGetAllOrders: true });
    set({ allOrders: [] });
    try {
      const res = await apiClient.get("/orders/");
      set({
        allOrders: res.data,
        isLoadingGetAllOrders: false,
      });
    } catch (error: any) {
      console.log("Error in get All Orders store", error.message);
      set({ allOrders: [] });
    } finally {
      set({ isLoadingGetAllOrders: false });
    }
  },
  getMyOrders: async () => {
    set({ isLoadingGetMyOrders: true });
    set({ myorders: [] });
    try {
      const res = await apiClient.get("/orders/my-orders");
      set({
        myorders: res.data,
        isLoadingGetMyOrders: false,
      });
    } catch (error: any) {
      console.log("Error in get My Orders store", error.message);
      set({ myorders: [] });
    } finally {
      set({ isLoadingGetMyOrders: false });
    }
  },
  addNewOrder: async (order) => {
    set({ isSuccess: false });
    try {
      const res = await apiClient.post("/orders/", order);

      set((state) => ({
        allOrders: [res.data, ...state.allOrders],
        isSuccess: true,
      }));

      toast.success("Order added successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in add new order store", error.message);
      set({ isSuccess: false });
    } finally {
      useCartStore.getState().removeAllItemFromCart();
    }
  },
  updateStatus: async (order) => {
    try {
      const res = await apiClient.put(`/orders/${order._id}`, order);
      set((state) => ({
        allOrders: state.allOrders.map((o) =>
          o._id === order._id ? res.data.order : o
        ),
      }));
      toast.success("Order updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in update order store", error.message);
    }
  },
  removeOrder: async (order) => {
    try {
      await apiClient.delete(`/orders/${order._id}`);
      set((state) => ({
        allOrders: state.allOrders.filter((o) => o._id !== order._id),
      }));
      toast.success("Order removed successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in remove order store", error.message);
    }
  },
}));
