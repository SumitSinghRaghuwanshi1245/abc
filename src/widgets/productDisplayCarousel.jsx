import { Link } from "react-router-dom";
import { Motion } from "./motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from "../shared/ui/carousel";
import Card from "../widgets/card";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../shared/ui/button";
import { useState, useEffect, useCallback, useRef } from "react";

const throttle = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    }
  };
};

const ProductDisplayCarousel = ({
  title,
  products,
  category
}) => {
  const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 6));
  const [currentBatch, setCurrentBatch] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state
  const sentinelRef = useRef(null);

  const fetchNextBatch = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      let nextProducts;
      if (currentBatch * 5 >= products.length) {
        setCurrentBatch(1);
        nextProducts = products.slice(0, 5);
      } else {
        nextProducts = products.slice(currentBatch * 5, (currentBatch + 1) * 5);
      }

      setVisibleProducts((prev) => [...prev, ...nextProducts]);

      setCurrentBatch((prevBatch) =>
        prevBatch * 5 >= products.length ? 1 : prevBatch + 1
      );
    } catch (err) {
      console.error("Error fetching next batch of products:", err);
      setError("Failed to load more products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentBatch, products, loading]);

  const handleFetchNextBatch = throttle(fetchNextBatch, 1000);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleFetchNextBatch();
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [handleFetchNextBatch]);

  return (
    <Motion direction="up" duration={1.8}>
      <div className="w-full pb-0 mx-auto mt-12 max-w-8xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {title}
          </h1>
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={"categories/" + category}
          >
            <Button
              variant="ghost"
              className="text-sm border rounded-3xl border-zinc-900/10 text-zinc-900 dark:text-zinc-100"
            >
              View All <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="relative w-full max-w-full mt-4">
          <Carousel>
            <CarouselContent className="w-full md:gap-x-2">
              {visibleProducts.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="w-full basis-full snap-center sm:basis-1/3 lg:basis-1/5"
                >
                  <Card index={index} product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNavigation
              alwaysShow
              className="absolute top-auto left-auto z-50 justify-end w-full gap-2 -bottom-16"
              classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
            />
          </Carousel>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {loading && <div className="mt-4">Loading more products...</div>}
          <div ref={sentinelRef} className="h-10"></div>
        </div>
      </div>
    </Motion>
  );
};

export default ProductDisplayCarousel;