// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import Card from "../widgets/card";
import { Button } from "../shared/ui/button";
import { Skeleton } from "../shared/ui/skeleton";
import { fetchProductsByCategoryWise } from "../shared/API_Calls";
import { ProductFilter } from "../widgets/filterProducts";
import MaxWidthWrapper from "../widgets/max-width-wrapper";

const CategoriesTag = () => {
  const { categoryTag } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [filters, setFilters] = useState({
    sortOrder: " ",
    priceRange: [0, 10000],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  const PRODUCTS_PER_PAGE = 9;

  const fetchProducts = async (reset = false) => {
    setIsLoading(true);
    try {
      const productData = await fetchProductsByCategoryWise(categoryTag, PRODUCTS_PER_PAGE, page);
      if (productData.products.length < PRODUCTS_PER_PAGE) {
        setHasMore(false);
      }
      const products = productData.products;
      setProducts((prevProducts) =>
        reset ? products : [...prevProducts, ...products]
      );
      productData.totalPages ? settotalPages(productData.totalPages)
        : settotalPages(productData.nextpage);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(true);
  }, [categoryTag]);

  useEffect(() => {
    if (page > 1) fetchProducts();
  }, [page]);

  const loadMoreProducts = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {

    const PriceRangefilteredProducts = products.filter((product) => {
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
  }, [filters, products]);

  const handleFilterChange = (userFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...userFilters }));
  };

  return (
    <MaxWidthWrapper className="pt-10 pb-0 mb-0">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white">
          <div className="pt-0 border-b border-gray-200 lg:pb-1">
            <h2 className="text-3xl font-extrabold tracking-tight capitalize text-zinc-900 sm:text-4xl md:text-5xl">
              {categoryTag.replace(/-/g, " ")}
            </h2>
            <p className="mt-2 mb-4 text-sm text-gray-600 sm:text-base">
              Discover a world of high-quality products in the {categoryTag.replace(/-/g, " ")} category.
            </p>
          </div>

          <div className="pt-3 pb-6 sm:pt-4 lg:grid lg:grid-cols-4 lg:gap-x-8">
            <aside className="sticky items-start pb-4 top-16 lg:col-span-1">
              <h3 className="hidden mb-2 text-lg font-semibold text-gray-900 lg:block">Filters</h3>
              <ProductFilter
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </aside>
            <main className="w-full lg:col-span-3">
              {isLoading && products.length === 0 ? (
                <div className="grid gap-x-8 gap-y-2 md:gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {[...Array(PRODUCTS_PER_PAGE)].map((_, index) => (
                    <div key={index} className="space-y-4">
                      <Skeleton className="w-full h-48" />
                      <Skeleton className="w-3/4 h-4" />
                      <Skeleton className="w-1/2 h-4" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid gap-x-8 gap-y-2 md:gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Card key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-xl font-semibold text-gray-600">No products found</p>
                  <p className="mt-2 text-gray-500">Try adjusting your filters or search for something else.</p>
                </div>
              )}
            </main>
          </div>

          <div className="flex flex-col items-center justify-between mt-4 md:flex-row">
            <div className="flex items-center justify-between w-full md:justify-normal gap-x-2">
              <Button
                variant="outline"
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={isLoading || page === 1}
                className="px-3 py-2"
              >
                Previous
              </Button>

              <div className="hidden gap-x-2 md:flex">
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-2 text-sm ${page === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => loadMoreProducts()}
                disabled={isLoading || !hasMore}
                className="md:px-3 md:py-2"
              >
                Next
              </Button>
            </div>

            <div className="w-full mt-2 text-sm text-gray-600 md:mt-0 text-end">
              Page {page} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CategoriesTag;
