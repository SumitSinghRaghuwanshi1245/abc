// -------------------- PACKAGE IMPORT FILES -------------------- //
import React, { useEffect, useState, useRef } from 'react';

// -------------------- OTHER IMPORT FILES -------------------- //
import Card from "../widgets/card";
import { Motion } from "../widgets/motion";
import { Input } from '../shared/ui/input';
import { Button } from '../shared/ui/button';
// import { Skeleton } from "../shared/ui/skeleton";
import MaxWidthWrapper from '../widgets/max-width-wrapper';
import { ProductFilter } from "../widgets/filterProducts.jsx";
import { SkeletonLoading2 } from '../widgets/skeletons/HomeSkeleton.jsx';
import useProductStore from "../entities/product/api/productStore";

const Deals = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    sortOrder: "",
    priceRange: [0, 10000],
  });

  const { discountedProducts, fetchDiscountedProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchDiscountedProducts();
    window.scrollTo(0, 0);
  }, [fetchDiscountedProducts]);

  useEffect(() => {
    if (discountedProducts && discountedProducts.length > 0) {
      const PriceRangefilteredProducts = discountedProducts.filter((product) => {
        return product.sellingPrice >= filters.priceRange[0] && product.sellingPrice <= filters.priceRange[1];
      });
      let sortedProducts;
      if (filters.sortOrder === "lowToHigh") {
        sortedProducts = [...PriceRangefilteredProducts].sort((a, b) => a.sellingPrice - b.sellingPrice);
      }
      else if (filters.sortOrder === "highToLow") {
        sortedProducts = [...PriceRangefilteredProducts].sort((a, b) => b.sellingPrice - a.sellingPrice);
      }
      else {
        sortedProducts = PriceRangefilteredProducts;
      }
      setFilteredProducts(sortedProducts);
    }
  }, [filters, discountedProducts]);

  const handleFilterChange = (userFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...userFilters }));
  };

  return (
    <MaxWidthWrapper className="h-full pt-0 pb-20 ">
      <div className="min-h-screen mx-auto max-w-8xl">
        <h1 className="mt-4 text-xl font-bold text-gray-900 md:mt-10 sm:text-2xl">
          Top Deals
        </h1>
        <div className="pt-3 pb-6 sm:pt-4 lg:grid lg:grid-cols-4 lg:gap-x-8">
          <aside className="items-start pb-4 lg:col-span-1">
            <h3 className="hidden mb-2 text-lg font-semibold text-gray-900 lg:block">Filters</h3>
            <ProductFilter
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </aside>
          <div className="w-full lg:col-span-3">
            {
              isLoading && filteredProducts.length === 0 ? (
                <div className="grid gap-x-8 gap-y-2 md:gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {[...Array(9)].map((_, index) => (
                    <div key={index} className="space-y-4">
                      <SkeletonLoading2 className="w-full h-48" />
                    </div>
                  ))}
                </div>
              )
                :
                <div className="grid gap-x-3 md:gap-x-8 gap-y-2 md:gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>
            }
          </div>
        </div>

        <Motion direction="up" duration={1.8}>
          <div className="w-full mx-auto mt-16 max-w-8xl">
            <section className="px-6 py-12 rounded-lg bg-primary lg:px-12">
              <div className="mx-auto text-center max-w-7xl">
                <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  Subscribe for Exclusive Deals
                </h2>
                <p className="mb-8 text-lg text-white lg:text-xl">
                  Be the first to know about our best offers and new arrivals!
                </p>
                <div className="flex flex-col max-w-xl gap-4 mx-auto sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 text-gray-900 rounded-md"
                  />
                  <Button className="text-purple-600 bg-white hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </Motion>
      </div>
    </MaxWidthWrapper>
  );
};

export default Deals;
