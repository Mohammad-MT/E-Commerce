import { create } from "zustand";

type ThemeState = {
  theme: boolean;
  changeTheme: () => void;
  checkTheme: () => void;
};

const useThemeStore = create<ThemeState>((set, get) => ({
  theme: false,
  changeTheme: () => {
    set({ theme: !get().theme });
    localStorage.setItem("theme", JSON.stringify(get().theme));
  },
  checkTheme: () => {
    const checkTheme = localStorage.getItem("theme");

    if (checkTheme) {
      set({ theme: JSON.parse(checkTheme) });
    } else {
      localStorage.setItem("theme", JSON.stringify(get().theme));
    }
  },
}));

export default useThemeStore;
