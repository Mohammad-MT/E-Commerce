import { create } from "zustand";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";

export type Item = {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  category?: string;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  finalPrice?: number;
};

type ProductState = {
  products: Item[];
  allProducts: Item[];
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
  totalProducts: number;
  loading: boolean;
  setProductsPaginated: (page: number, limit: number, filter: object) => void;
  setAllProducts: () => void;
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
  selectedProduct: (id: string) => void;
  isAddingProduct: boolean;
  addNewProduct: (product: {
    name: string;
    price: number;
    description: string;
    images: string[];
    stock: number;
    category: string;
  }) => void;
  isUpdateingProduct: boolean;
  updateProduct: (
    id: string,
    name: string,
    price: number,
    stock: number,
    discountValue: number
  ) => void;
  isDeletingProduct: boolean;
  deleteProduct: (id: string) => void;
  uploading: boolean;
  imageUrl: string;
  uploadImage: (formData: FormData) => void;
};
// GET /api/products/paginated?page=1&limit=5&category=electronics&sortBy=price&search=salam&order=asc
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  allProducts: [],
  page: 1,
  limit: 8,
  filter: {
    search: "",
    category: "",
    sortBy: "createdAt", // price
    order: "desc", //desc or asc
    minPrice: "",
    maxPrice: "",
  },
  totalPages: 0,
  totalProducts: 0,
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
        totalProducts: res.data.total,
        loading: false,
      });
    } catch (error: any) {
      console.log("Error in get Product store", error.message);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },
  setAllProducts: async () => {
    set({ loading: true });
    set({ allProducts: [] });
    try {
      const res = await apiClient.get("/products/");

      set({
        allProducts: res.data.data,
        loading: false,
      });
    } catch (error: any) {
      console.log("Error in get AllProduct store", error.message);
      set({ allProducts: [] });
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
  isAddingProduct: false,
  addNewProduct: async (Item) => {
    set({ isAddingProduct: true });
    try {
      const res = await apiClient.post("/products", Item);
      set((state) => ({
        products: [res.data, ...state.products],
      }));
      toast.success("Product added successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in add Product store", error.message);
    } finally {
      set({ isAddingProduct: false });
    }
  },
  isUpdateingProduct: false,
  updateProduct: async (id, name, price, stock, discountValue) => {
    set({ isUpdateingProduct: true });
    try {
      await apiClient.put(`/products/${id}`, {
        name,
        price,
        stock,
        discountValue,
        discountType: "percentage",
      });
      toast.success("Product updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in update Product store", error.message);
    } finally {
      set({ isUpdateingProduct: false });
    }
  },
  isDeletingProduct: false,
  deleteProduct: async (id) => {
    set({ isDeletingProduct: true });
    try {
      await apiClient.delete(`/products/${id}`);
      toast.success("Product Deleted successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error in delete Product store", error.message);
    } finally {
      set({ isDeletingProduct: false });
    }
  },
  uploading: false,
  imageUrl: "",
  uploadImage: async (formData: FormData) => {
    set({ uploading: true });
    try {
      const res = await apiClient.post("products/uploadImage", formData);
      set({ imageUrl: res.data.imageUrl });
      toast.success("Image Uploaded Successfully.");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Error in UploadImage Product store", error);
    } finally {
      set({ uploading: false });
    }
  },
}));
