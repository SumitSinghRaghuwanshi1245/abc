// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useState } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../shared/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "../shared/ui/carousel";

const ProductSlider = ({
  images,
  className,
  setIsHovered,
  handleMouseMove,
}) => {
  const [index, setIndex] = useState(0);

  return (
    <div className={cn("relative w-full pb-8", className)}>
      <Carousel index={index} onIndexChange={setIndex}>
        <CarouselContent className="relative">
          {images?.map((src, i) => (
            <CarouselItem key={i} className="">
              <div
                className="flex h-[400px] items-center justify-center overflow-hidden rounded-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center w-full px-4 mt-4 space-x-3">
        {images?.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-12 w-12 border border-zinc-200 dark:border-zinc-800",
              index === i && "border-blue-500 dark:border-blue-400",
            )}
          >
            <img
              src={images[i]}
              alt={`Thumbnail ${i + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
