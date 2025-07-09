// -------------------- PACKAGE IMPORT FILES -------------------- //
import { motion } from "framer-motion";
import { useEffect } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import Loading from "../widgets/loading.jsx";
import CategoryCard from "../widgets/category-card";
import MaxWidthWrapper from "../widgets/max-width-wrapper";
import useCategoryStore from "../entities/category/api/categoryStore";

const Categories = () => {
  const { categories, fetchDynamicCategories, isLoading, error } = useCategoryStore();

  useEffect(() => {
    fetchDynamicCategories();
  }, [fetchDynamicCategories]);

  if (isLoading) {
    return (
      <MaxWidthWrapper className="h-full pt-0">
        <Loading />
      </MaxWidthWrapper>
    );
  }

  if (error) {
    return (
      <MaxWidthWrapper className="h-full pt-0">
        <div className="py-10 text-center">
          <p className="text-lg font-medium text-red-500">
            Error loading categories: {error}
          </p>
        </div>
      </MaxWidthWrapper>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <MaxWidthWrapper className="h-full pt-0">
        <div className="py-10 text-center">
          <p className="text-lg font-medium text-gray-500">
            No categories found.
          </p>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="mx-auto max-w-7xl">
        <div className="pt-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight capitalize text-zinc-900 dark:text-zinc-100 sm:text-4xl md:text-5xl"
          >
            Explore Our Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm text-gray-600 dark:text-gray-300 sm:text-base"
          >
            Discover a world of fresh, high-quality products in our curated categories.
          </motion.p>
        </div>
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <motion.div
                key={category._id}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Categories;
