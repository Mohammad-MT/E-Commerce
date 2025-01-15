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
  filter: {
    search: string;
    category: string;
    sortBy: string;
    order: string;
    minPrice: string;
    maxPrice: string;
  };

  totalPages: number;
  loading: boolean;
  setProductsPaginated: (page: number, limit: number, filter: {}) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilter: (filter: {
    search?: string;
    category?: string;
    sortBy?: string;
    order?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => void;
  selectedProduct: (id: string) => any;
};
// GET /api/products/paginated?page=1&limit=5&category=electronics&sortBy=price&search=salam&order=asc
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  page: 1,
  limit: 6,
  filter: {
    search: "",
    category: "",
    sortBy: "createdAt", // price
    order: "desc", //desc or asc
    minPrice: "",
    maxPrice: "",
  },
  totalPages: 0,
  loading: false,
  setProductsPaginated: async (page, limit, filter) => {
    set({ loading: true });
    set({ products: [] });
    try {
      const res = await apiClient.get("/products/paginated", {
        params: { ...filter, page, limit },
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
  setFilter: (filter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...filter,
      },
    })),
  selectedProduct: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  },
}));
