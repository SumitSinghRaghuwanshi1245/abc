// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState, useEffect } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import Card from "../widgets/card";
import { fetchProductsByQuery } from "../shared/API_Calls/index";
import { ProductFilter } from "../widgets/filterProducts";
import MaxWidthWrapper from "../widgets/max-width-wrapper";
import { SkeletonLoading3 } from "../widgets/skeletons/HomeSkeleton";

const Search = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get("rawQuery");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    sortOrder: " ",
    priceRange: [0, 10000],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = { searchedKey: rawQuery };
      const response = await fetchProductsByQuery(params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [rawQuery, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProductsAfterQuery = useMemo(() => {
    let filtered = products;
    if (rawQuery) {
      const lowercaseQuery = rawQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    return filtered;
  }, [products, rawQuery]);

  const PRODUCTS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredProductsAfterQuery.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    setPage(currentPage);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const currentProducts = filteredProductsAfterQuery.slice(startIndex, endIndex);
    setFilteredProducts(currentProducts);
  }, [searchParams, filteredProductsAfterQuery]);

  useEffect(() => {

    const PriceRangefilteredProducts = filteredProducts.filter((product) => {
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
    setCurrentPageProducts(sortedProducts);
  }, [filters, filteredProducts]);

  const handleFilterChange = (userFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...userFilters }));
  };

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white">
          <div className="pt-10 pb-4 border-b border-gray-200 lg:pt-5">
            <p className="mt-4 text-sm text-gray-500 sm:text-base">
              Search Results
            </p>
            <h2 className="text-3xl font-bold tracking-tight capitalize text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
              {rawQuery}
            </h2>

          </div>
          <div className="py-6 sm:pt-6 lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-4">
            <aside className="sticky items-start pb-4 top-16 lg:col-span-1">
              <h3 className="hidden mb-2 text-lg font-semibold text-gray-900 lg:block">Filters</h3>
              <ProductFilter
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </aside>
            <main className="flex w-full gap-4 lg:col-span-3">
              {
                isLoading
                  ?
                  (
                    <SkeletonLoading3 />
                  )
                  :
                  currentPageProducts.length > 0 ? (

                    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                      {currentPageProducts.map((product, index) => (
                        <Card
                          product={product} key={index}
                        />
                      ))}
                    </div>
                  )
                    :
                    (
                      <div className="flex flex-col items-center justify-center h-64">
                        <p className="text-xl font-semibold text-gray-600">
                          No products found
                        </p>
                        <p className="mt-2 text-gray-500">
                          Try adjusting your search.
                        </p>
                      </div>
                    )}
            </main>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button aria-label="Decrease Pagination"
                onClick={() => handlePagination(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              <span>Page {page} of {totalPages}</span>
              <button aria-label="Increase Pagination"
                onClick={() => handlePagination(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Search;

