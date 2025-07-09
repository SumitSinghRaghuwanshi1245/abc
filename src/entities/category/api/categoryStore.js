import { create } from "zustand";
import axiosInstance from "../../../shared/axios_API/axios";
const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: null,

  // Fetch all categories
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/product/get-categories");
      const categoryMap = new Map();
      response.data.data.forEach((item) => {
        const newCategory = item.category;
        if (!categoryMap.has(newCategory)) {
          categoryMap.set(newCategory, {
            title: newCategory,
            imageSrc: 'https://t4.ftcdn.net/jpg/08/29/67/07/360_F_829670705_84pA7wfFApIxR337znVLhzEj4TjCXT7X.jpg',
          });
        }   
      });
      set({ categories: Array.from(categoryMap.values()), isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Fetch dynamic categories
  fetchDynamicCategories: async () => {
    set({ isLoading: false, error: null });
    try {
        const response = await axiosInstance.get("/dynamicoptions/getalloptions", {
            params: { optionType: "subCategoryType" },
          });
          console.log(response);
      set({ categories: response.data.data || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Set selected category
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Get category by ID
  getCategoryById: (categoryId) => {
    const category = useCategoryStore.getState().categories.find(
      (cat) => cat._id === categoryId
    );
    return category || null;
  },

  // Get category by slug
  getCategoryBySlug: (slug) => {
    const category = useCategoryStore.getState().categories.find(
      (cat) => cat.slug === slug
    );
    return category || null;
  }
}));

export default useCategoryStore; 