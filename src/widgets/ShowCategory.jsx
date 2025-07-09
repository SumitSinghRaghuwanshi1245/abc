// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { ArrowRightIcon } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { Motion } from "./motion";
import Loading from "./loading.jsx";
import { cn } from "../shared/lib/utils.js";
import { Button } from "../shared/ui/button";
import useCategoryStore from "../entities/category/api/categoryStore.js";

const ShowCategory = () => {
  const { categories, fetchDynamicCategories, isLoading, error } = useCategoryStore();
// console.log(categories);
  useEffect(() => {
    fetchDynamicCategories();
  }, [fetchDynamicCategories]);

  if (isLoading) return <Loading />;

  if (!categories || categories.length === 0) {
    return (
      <div className="mt-10 text-lg font-medium text-center text-red-500">
        No categories found.
      </div>
    );
  }

  return (
    <Motion direction="up" duration={1.8} up={70}>
      <div className="w-full mx-auto mt-6 md:mt-10 max-w-8xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Top Categories</h1>
          <Link onClick={() => window.scrollTo(0, 0)} to="/categories">
            <Button
              variant="ghost"
              className="px-3 py-0 text-sm border rounded-3xl border-zinc-900/10 text-zinc-900 dark:text-zinc-100"
            >
              View All <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 rounded-lg md:gap-2 sm:grid-cols-3 lg:grid-cols-9">
          {categories.slice(0, 9).map((category) => (
            <Link
              key={category._id}
              to={"categories/" + category.name}
              className={cn(
                "group relative transform overflow-hidden hover:scale-105 rounded border-opacity-5 shadow-sm transition duration-300 ease-in-out hover:shadow-lg"
              )}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={category.image_url}
                alt={category.name}
                className="object-contain w-full h-20 transition duration-300 ease-in-out md:h-32"
              />
              <div className="py-0.5 pb-1 text-center">
                <h3 className="mt-2 text-xs font-medium capitalize md:text-sm text-zinc-900 dark:text-zinc-100">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Motion>
  );
};

export default ShowCategory;
