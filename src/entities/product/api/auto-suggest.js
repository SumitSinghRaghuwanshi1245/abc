import { create } from "zustand";
import axiosInstance from "../../../shared/axios_API/axios";

export const useAutoSuggestStore = create((set) => ({
  names: [],
  error: null,
  isLoading: false,

  // Fetching the suggested product names
  fetchSuggestedProducts: async () => {
    try {
      set({ error: null, isLoading: true });

      const response = await axiosInstance.get("/product/suggestions");

      const suggestions = response.data?.data || [];

      const productNames = suggestions
        .map((item) => item?.product?.name)
        .filter(Boolean); // Removes undefined/null names

      set({ names: productNames, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
