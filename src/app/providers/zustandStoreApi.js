


  // =========================== THIS FILE IS NOT IN USE AND CAN BE REMOVED ==================================================//




// -------------------- PACKAGE IMPORT FILES -------------------- //
import { create } from "zustand";

// -------------------- OTHER IMPORT FILES -------------------- //
import axios from "../../shared/axios_API/axios.js";
import { fetchMyOrder } from "../../shared/API_Calls/index.js";

export const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  allAddress: [],
  userOrders: [],


  // -------------------- API - FETCH USER DATA -------------------- //
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const userData = await axios.get("/user/get-account");
      set({ user: userData.data.data, isLoading: false });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");
        window.location.href = "/";
      } else {
        set({ error: "Failed to fetch user data", isLoading: false });
        console.error("Error fetching user data:", error);
      }
    }
  },

  // -------------------- API - FETCH USER ADDRESSES -------------------- //
  fetchUserAddresses: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/user/find-address/${userId}`);
      set({ allAddress: response?.data?.data[0]?.allAddress || [], isLoading: false });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");
        window.location.href = "/";
      } else {
        set({ error: "Failed to fetch user addresses", isLoading: false });
        console.error("Error fetching user addresses:", error);
      }
    }
  },

  // -------------------- API - ADD USER ADDRESS -------------------- //
  addUserAddress: async (userId, phoneNumber, addressData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/user/add-address/${userId}/${phoneNumber}`, addressData);
      set({ isLoading: false });
      return { success: true, message: "Address added successfully" };
    } catch (error) {
      set({ error: "Failed to add address", isLoading: false });
      return { success: false, message: error.response?.data?.message || "Failed to add address" };
    }
  },

  // -------------------- API - UPDATE USER ADDRESS -------------------- //
  updateUserAddress: async (userId, addressData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/user/update-address/${userId}`, addressData);
      set({ isLoading: false });
      return { success: true, message: "Address updated successfully" };
    } catch (error) {
      set({ error: "Failed to update address", isLoading: false });
      return { success: false, message: error.response?.data?.message || "Failed to update address" };
    }
  },

  // -------------------- API - DELETE USER ADDRESS -------------------- //
  deleteUserAddress: async (userId, addressId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/user/delete-address/${userId}`, { id: addressId });
      set({ isLoading: false });
      return { success: true, message: "Address deleted successfully" };
    } catch (error) {
      set({ error: "Failed to delete address", isLoading: false });
      return { success: false, message: error.response?.data?.message || "Failed to delete address" };
    }
  },

  // -------------------- API - UPDATE USER PROFILE -------------------- //
  updateUserProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put("/user/update-profile", userData);
      set({ user: response.data.data, isLoading: false });
      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      set({ error: "Failed to update profile", isLoading: false });
      return { success: false, message: error.response?.data?.message || "Failed to update profile" };
    }
  },

  // -------------------- API - FETCH USER ORDERS -------------------- //
  fetchUserOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchMyOrder();
      set({ userOrders: response, isLoading: false });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");
        window.location.href = "/";
      } else {
        set({ error: "Failed to fetch user orders", isLoading: false });
        console.error("Error fetching user orders:", error);
      }
    }
  },
}));

export const useOrderStore = create((set) => ({
  userOrder: [],
  isLoading: false,
  error: null,
  fetchUserOrder: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchMyOrder();
      set({ userOrder: response, isLoading: false });
    } catch (error) {
      console.error("Error fetching user order:", error);
      set({ error: "Failed to fetch user orders.", isLoading: false });
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("userToken");
        window.location.href = "/";
      }
    }
  },
}));

export const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  // fetchDynamicCategories: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const fetchedCategories = await fetchDynamicCategories(); // Correct function call
  //     if (!fetchedCategories || fetchedCategories.length === 0) {
  //       throw new Error("No categories found.");
  //     }
  //     set({ categories: fetchedCategories, isLoading: false });
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //     set({ error: "Failed to fetch categories.", isLoading: false });
  //   }
  // },
}));
