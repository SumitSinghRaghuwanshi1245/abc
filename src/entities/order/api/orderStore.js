import { create } from "zustand";
import axiosInstance from "../../../shared/axios_API/axios";
import toast from "react-hot-toast";

const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,
  orderDetails: null,

  // Fetch all orders
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/order/get-user-orders");
      set({ orders: response.data.data || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Fetch order details
  fetchOrderDetails: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/order/get-order/${orderId}`);
      set({ orderDetails: response.data.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/order/create-order", orderData);
      set((state) => ({
        orders: [...state.orders, response.data.data],
        isLoading: false,
      }));
      toast.success("Order created successfully");
      return response.data.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to create order");
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/order/update-status/${orderId}`, {
        status,
      });
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? response.data.data : order
        ),
        isLoading: false,
      }));
      toast.success("Order status updated successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to update order status");
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/order/cancel-order/${orderId}`);
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? response.data.data : order
        ),
        isLoading: false,
      }));
      toast.success("Order cancelled successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  },

  // Clear order details
  clearOrderDetails: () => set({ orderDetails: null }),
}));

export default useOrderStore; 