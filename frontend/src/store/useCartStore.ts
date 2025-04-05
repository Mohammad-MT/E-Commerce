import { create } from "zustand";
import { Item } from "./useProductStore";
import apiClient from "../services/apiClient";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export type CartItem = {
  _id?: string;
  quantity: number;
  productId: Item;
};

type CartState = {
  cart: CartItem[];
  isSyncing: boolean;
  isLogin: boolean;
  totalAmount: number;
  loadCart: () => void;
  syncCartWithBackend: () => void;
  setLogin: (status: boolean) => void;
  updateBackendCart: () => void;
  addCart: (product: Item) => void;
  removeCart: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;
};

const saveCartToLocalStorage = (cart: CartItem[]) =>
  localStorage.setItem("cartItem", JSON.stringify(cart));
const loadCartFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("cartItem") || "[]");

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  totalAmount: 0,
  isSyncing: false,
  isLogin: false,
  setLogin: (status) => {
    set(() => ({ isLogin: status }));
  },
  loadCart: () => {
    try {
      const localCart = loadCartFromLocalStorage();
      if (localCart) {
        set({ cart: localCart });
      } else {
        get().syncCartWithBackend();
      }
      get().calculateTotal();
    } catch (error: any) {
      console.log("Error in check cart store", error.message);
      set({ cart: [] });
    }
  },
  syncCartWithBackend: async () => {
    const { cart, isLogin } = get();

    if (!isLogin) return;

    set({ isSyncing: true });
    try {
      const res = await apiClient.get("/carts/");
      if (res.data) {
        set({ cart: res.data });
        saveCartToLocalStorage(res.data);
      } else {
        await apiClient.post("/carts/", { items: cart });
      }
    } catch (error) {
      console.error("Cart sync error:", error);
    } finally {
      set({ isSyncing: false });
      get().calculateTotal();
    }
  },
  // Update backend cart
  updateBackendCart: async () => {
    const { cart } = get();

    const user = await useAuthStore.getState().authUser;
    if (!user) return;

    try {
      const itemsInCart: { quantity: number; productId: string }[] = [];
      cart.forEach((c) => {
        const item = {
          productId: c.productId._id,
          quantity: c.quantity,
        };
        itemsInCart.push(item);
      });
      await apiClient.post("/carts/", {
        items: itemsInCart,
      });
    } catch (error) {
      console.error("Cart update error:", error);
    }
  },
  addCart: (product) => {
    try {
      set((state) => {
        const existingItem = state.cart.find(
          (item) => item.productId._id === product._id
        );
        let updatedCart: CartItem[] = [];

        if (existingItem && existingItem.quantity > 0) {
          if (existingItem.quantity >= product.stock) {
            toast.error("Item out of stock");
            updatedCart = state.cart;
          } else {
            updatedCart = state.cart.map((item) =>
              item.productId._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
        } else {
          if (product._id) {
            if (product.stock === 0) {
              toast.error("Item out of stock!");
              updatedCart = state.cart;
            } else {
              updatedCart = [
                ...state.cart,
                { productId: product, quantity: 1 },
              ];
              toast.success("Item added to cart");
            }
          } else {
            console.error("Product ID is undefined");
            updatedCart = state.cart;
          }
        }

        saveCartToLocalStorage(updatedCart);
        return { cart: updatedCart };
      });

      get().calculateTotal();
      get().updateBackendCart();
    } catch (error: any) {
      console.log("Error in add cart store", error.message);
    }
  },
  removeCart: (productId) => {
    try {
      set((state) => {
        const existingItem = state.cart.find(
          (item) => item.productId._id === productId
        );
        const updatedCart = state.cart;

        if (existingItem) {
          updatedCart.map((item, index) => {
            if (item.productId._id === productId) {
              if (item.quantity > 1) {
                item.quantity -= 1;
              } else {
                updatedCart.splice(index, 1);
                toast.error("Item removed from cart");
              }
            }
          });
        }
        saveCartToLocalStorage(updatedCart);
        get().calculateTotal();
        get().updateBackendCart();
        return { cart: updatedCart };
      });
    } catch (error: any) {
      console.log("Error in remove cart store", error.message);
    }
  },
  removeItemFromCart: (productId) => {
    try {
      let updatedCart: CartItem[] = [];
      set((state) => {
        updatedCart = state.cart.filter(
          (item) => item.productId._id !== productId
        );
        toast.error("Item removed from cart");

        saveCartToLocalStorage(updatedCart);
        return { cart: updatedCart };
      });
      get().calculateTotal();
      get().updateBackendCart();
    } catch (error: any) {
      console.log("Error in remove cart store", error.message);
    }
  },
  clearCart: async () => {
    try {
      set({ cart: [], totalAmount: 0 });
      localStorage.removeItem("cartItem");

      await apiClient.delete("/carts/");
    } catch (error: any) {
      console.log("Error in remove all item from cart store", error.message);
    }
  },
  calculateTotal: () => {
    set((state) => {
      const total = state.cart.reduce((acc, item) => acc + item.quantity, 0);
      return { totalAmount: total };
    });
  },
}));
