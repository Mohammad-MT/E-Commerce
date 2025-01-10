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
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  setProductsPaginated: (page: number, limit: number) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  selectedProduct: (id: string) => any;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  page: 1,
  limit: 6,
  totalPages: 0,
  loading: false,
  setProductsPaginated: async (page, limit) => {
    set({ loading: true });
    try {
      const res = await apiClient.get("/products/paginated", {
        params: { page, limit },
      });

      set({
        products: res.data.data,
        page: res.data.page,
        limit: res.data.limit,
        totalPages: res.data.totalPages,
        loading: false,
      });
    } catch (error: any) {
      console.log("Error in get Product", error.message);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  selectedProduct: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  },
}));
