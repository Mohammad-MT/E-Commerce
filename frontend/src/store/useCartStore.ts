import { create } from "zustand";
import { Item } from "./useProductStore";

export type CartType = {
  Item: Item;
  count: number;
};

type CartState = {
  Cart: CartType[];
  checkCart: () => void;
  addCart: (Item: Item) => void;
  removeCart: (Item: Item) => void;
  removeItemCart: (Item: Item) => void;
  calcTotalPrice: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  Cart: [],
  checkCart: async () => {
    try {
      const items = localStorage.getItem("cartItem");

      if (items) set({ Cart: JSON.parse(items) });
      else set({ Cart: [] });
    } catch (error: any) {
      console.log("Error in check cart store", error.message);
      set({ Cart: [] });
    }
  },
  addCart: (Item) => {
    try {
      const oldCart = get().Cart;

      const itemInCart = oldCart.find((c) => c.Item._id === Item._id);
      if (itemInCart) {
        oldCart.map((c) => {
          c.Item._id === Item._id ? (c.count += 1) : c;
        });

        localStorage.setItem("cartItem", JSON.stringify(oldCart));
        set({ Cart: oldCart });
      } else {
        localStorage.setItem(
          "cartItem",
          JSON.stringify([...oldCart, { Item, count: 1 }])
        );
        set({ Cart: [...oldCart, { Item, count: 1 }] });
      }
    } catch (error: any) {
      console.log("Error in add cart store", error.message);
    }
  },
  removeCart: (Item) => {
    try {
      const oldCart = get().Cart;

      const itemInCart = oldCart.find((c) => c.Item._id === Item._id);
      if (itemInCart) {
        oldCart.map((c, index) => {
          if (c.Item._id === Item._id) {
            if (c.count > 1) {
              c.count -= 1;
            } else {
              oldCart.splice(index, 1);
            }
          }
        });

        localStorage.setItem("cartItem", JSON.stringify(oldCart));
        set({ Cart: oldCart });
      }
    } catch (error: any) {
      console.log("Error in remove cart store", error.message);
    }
  },
  removeItemCart: (Item) => {
    try {
      const oldCart = get().Cart;

      const itemInCart = oldCart.find((c) => c.Item._id === Item._id);
      if (itemInCart) {
        oldCart.map((c, index) => {
          if (c.Item._id === Item._id) {
            oldCart.splice(index, 1);
          }
        });

        localStorage.setItem("cartItem", JSON.stringify(oldCart));
        set({ Cart: oldCart });
      }
    } catch (error: any) {
      console.log("Error in remove cart store", error.message);
    }
  },
  calcTotalPrice: () => {
    const cart = get().Cart;

    let total = 0;
    cart.map((c) => {
      total += c.Item.price * c.count;
    });

    return total;
  },
  itemCount: () => {
    const cart = get().Cart;

    let count = 0;
    cart.map((c) => {
      count += c.count;
    });
    return count;
  },
}));
