import { create } from "zustand";
import apiClient from "../services/apiClient";

export type Item = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
};

type ProductState = {
  products: Item[];
  getingProducts: boolean;
  setProducts: () => void;
  selectedProduct: (id: string) => any;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  getingProducts: false,
  setProducts: async () => {
    set({ getingProducts: true });
    try {
      const res = await apiClient.get("/products");
      if (res) set({ products: res.data });
      else set({ products: [] });
    } catch (error: any) {
      console.log("Error in get all Product", error.message);
      set({ products: [] });
    } finally {
      set({ getingProducts: false });
    }
  },
  selectedProduct: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  },
}));
