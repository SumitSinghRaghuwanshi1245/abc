import { create } from "zustand";
import axiosInstance from "../../../shared/axios_API/axios";
import { toast } from "react-hot-toast";

const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  trendingProducts: [],
  productDetails: null,
  isLoading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  searchError: null,
  categoryProducts: [],
  categoryLoading: false,
  categoryError: null,
  similarProducts: [],
  similarLoading: false,
  similarError: null,
  productReviews: [],
  reviewsLoading: false,
  reviewsError: null,
  discountedProducts: [],

  // Actions
  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/product/get-all-products");
      set({ products: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Error fetching products");
    }
  },

  fetchDiscountedProducts: async (pageNo = 1, limit = 200) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(`product/discounted-products`, {
        params: { pageNo, limit },
      });
      console.log(response.data.data.products);
      set({ discountedProducts: response.data.data.products, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Error fetching discounted products");
    }
  },

  fetchTrendingProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/product/get-trending-products");
      set({ trendingProducts: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Error fetching trending products");
    }
  },

  fetchProductDetails: async (productId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(`/product/get-product/${productId}`);
      set({ productDetails: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Error fetching product details");
    }
  },

  searchProducts: async (query) => {
    try {
      set({ searchLoading: true, searchError: null });
      const response = await axiosInstance.get(`/product/search?query=${query}`);
      set({ searchResults: response.data, searchLoading: false });
    } catch (error) {
      set({ searchError: error.message, searchLoading: false });
      toast.error("Error searching products");
    }
  },

  fetchCategoryProducts: async (categoryId) => {
    try {
      set({ categoryLoading: true, categoryError: null });
      const response = await axiosInstance.get(`/product/get-category-products/${categoryId}`);
      set({ categoryProducts: response.data, categoryLoading: false });
    } catch (error) {
      set({ categoryError: error.message, categoryLoading: false });
      toast.error("Error fetching category products");
    }
  },

  fetchSimilarProducts: async (productId) => {
    try {
      set({ similarLoading: true, similarError: null });
      const response = await axiosInstance.get(`/product/get-similar-products/${productId}`);
      set({ similarProducts: response.data, similarLoading: false });
    } catch (error) {
      set({ similarError: error.message, similarLoading: false });
      toast.error("Error fetching similar products");
    }
  },

  fetchProductReviews: async (productId) => {
    try {
      set({ reviewsLoading: true, reviewsError: null });
      const response = await axiosInstance.get(`/product/get-product-reviews/${productId}`);
      set({ productReviews: response.data, reviewsLoading: false });
    } catch (error) {
      set({ reviewsError: error.message, reviewsLoading: false });
      toast.error("Error fetching product reviews");
    }
  },

  addProductReview: async (productId, reviewData) => {
    try {
      set({ reviewsLoading: true, reviewsError: null });
      const response = await axiosInstance.post(`/product/add-review/${productId}`, reviewData);
      const updatedReviews = [...get().productReviews, response.data];
      set({ productReviews: updatedReviews, reviewsLoading: false });
      toast.success("Review added successfully");
    } catch (error) {
      set({ reviewsError: error.message, reviewsLoading: false });
      toast.error("Error adding review");
    }
  },

  // Helper functions
  clearSearchResults: () => {
    set({ searchResults: [], searchError: null });
  },

  clearProductDetails: () => {
    set({ productDetails: null, error: null });
  },

  clearCategoryProducts: () => {
    set({ categoryProducts: [], categoryError: null });
  },

  clearSimilarProducts: () => {
    set({ similarProducts: [], similarError: null });
  },

  clearProductReviews: () => {
    set({ productReviews: [], reviewsError: null });
  }
}));

export default useProductStore; 