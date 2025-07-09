import { create } from "zustand";
import axiosInstance from "../../../shared/axios_API/axios";
import toast from "react-hot-toast";

const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  allAddress: [],
  userOrders: [],

  // Fetch user data
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/user/get-account");
      set({ user: response.data.data, isLoading: false });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");
        window.location.href = "/";
      }
      set({ error: error.message, isLoading: false });
    }
  },

  // Set user data
  setUser: (userData) => set({ user: userData }),

  // Update user profile
  updateUserProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put("/user/update-profile", userData);
      set({ user: response.data.data, isLoading: false });
      toast.success("Profile updated successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  },

  // Fetch user addresses
  fetchUserAddresses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/user/get-address");
      set({ allAddress: response.data.data || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add user address
  addUserAddress: async (addressData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/user/add-address", addressData);
      set((state) => ({
        allAddress: [...state.allAddress, response.data.data],
        isLoading: false,
      }));
      toast.success("Address added successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to add address");
    }
  },

  // Update user address
  updateUserAddress: async (addressId, addressData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(
        `/user/update-address/${addressId}`,
        addressData
      );
      set((state) => ({
        allAddress: state.allAddress.map((address) =>
          address._id === addressId ? response.data.data : address
        ),
        isLoading: false,
      }));
      toast.success("Address updated successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to update address");
    }
  },

  // Delete user address
  deleteUserAddress: async (addressId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/user/delete-address/${addressId}`);
      set((state) => ({
        allAddress: state.allAddress.filter((address) => address._id !== addressId),
        isLoading: false,
      }));
      toast.success("Address deleted successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  },

  // Fetch user orders
  fetchUserOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/order/get-user-orders");
      set({ userOrders: response.data.data || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Clear user data
  clearUser: () => set({ user: null, allAddress: [], userOrders: [] }),
}));

export default useUserStore; 