// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from "react";
import { useNavigate } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import { renderRating } from "../widgets/rating/rating";
import { cn, formatPrice } from "../shared/lib/utils";
import ImageSlider from "./image-slider";
import AddToCartButton from "../features/cart/ui/add-to-cart-button";
import AddToWishButton from "../features/cart/ui/add-to-wish-button";

const Card = ({ product, index, showDescription = true }) => {
  const discountedPrice = parseInt(product.MRP) - (parseInt(product.MRP) - parseInt(product.sellingPrice));
  const discountPercentage = (parseInt(product.MRP) - parseInt(product.sellingPrice)) / parseInt(product.MRP) * 100;
  const navigate = useNavigate();
  const originalPrice = parseInt(product.MRP);
  const sellingPrice = parseInt(product.sellingPrice);
  const savingsAmount = originalPrice - sellingPrice;
  const hasDiscount = discountPercentage > 0;

  return (
    <div
      key={index}
      className="flex relative h-auto w-full md:flex-col items-center rounded-lg border bg-[#feffff]"
      draggable={false}
      onSelect={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {
        discountPercentage > 0 ?
          <span className="absolute z-10 top-1 left-2 py-1 px-1.5 rounded-sm text-xs bg-red-600 text-white ">  {Math.round(discountPercentage)}% <br /> off
          </span>
          : <span></span>
      }

      <div className="relative sm:w-[130px] h-[160px] md:w-full">
        <ImageSlider images={[product.productImageUrl]} />
        {product.discount > 0 && (
          <span className="absolute inline-block px-3 py-1 mb-2 mr-2 text-xs font-semibold text-white bg-orange-500 rounded-full left-2 top-2">
            {product.discount}% OFF
          </span>
        )}
      </div>{" "}
     
      <div
        onClick={() => navigate(`/${product._id}`)}
        className="flex flex-grow w-full cursor-pointer ">
        <div className="flex flex-col justify-between flex-1 px-4 pt-4 pb-4 md:pt-0">
          <div className="space-y-2">
            <span className="inline-flex flex-wrap capitalize items-center text-[#363636] text-sm font-medium text-wrap line-clamp-2 ">
              {product.productImageName}
            </span>

            <div className="flex flex-col md:flex-row md:gap-x-2">
            <span>
            {showDescription && (
              <p className="line-clamp-2 md:line-clamp-2 inline-flex items-center justify-center bg-green-600 px-2 py-1 w-fit rounded-lg text-[10px] text-[#fafafa] selection:text-[#16191E]">
                {product.brand}
              </p>
              
            )}
            </span>
            <span>
            {hasDiscount && (
            <p className="px-2 py-1 mt-1 text-xs text-white capitalize bg-orange-500 rounded-lg w-fit md:mt-0">
              Save {formatPrice(savingsAmount)}
            </p>
          )}
            </span>
            
            </div>
            <div className="w-full">{renderRating(product.rating || 4)}</div>
          </div>
          <div className="items-end justify-between mt-auto md:flex">
            <div className="md:flex md:flex-col items-start text-[#868686]">
              <span
                className={cn(
                  "selection:text-[#16191E]",
                  discountedPrice < product.MRP ? "text-base" : "text-lg",
                )}
              >
                {!product.discount ? (
                  <span className="mt-1 text-lg selection:text-[#16191E]">
                    MRP :  {" "}
                    <span
                      className={cn(
                        "font-bold text-[#ef9f43] selection:text-[#16191E]",
                        discountedPrice < parseInt(product.MRP) && "line-through",
                      )}
                    >
                      {formatPrice(product.MRP)}
                    </span>
                  </span>
                ) : (
                  <>
                    MRP ~ {" "}
                    <span
                      className={cn(
                        "font-semibold text-[#ef9f43] text-sm selection:text-[#16191E]",
                        discountedPrice < parseInt(product.MRP) && "line-through",
                      )}
                    >
                      {formatPrice(product.MRP)}
                    </span>
                  </>
                )}
              </span>
              <br className="md:hidden" />

              {product.discount >= 0 && (
                <span className="mt-1 text-lg md:text-lg selection:text-[#16191E]">
                  <span className="font-bold text-[#0a7558] selection:text-[#16191E]">
                    {formatPrice(discountedPrice)}
                  </span>
                </span>
              )}
            </div>
            <div className="flex mt-2 space-x-2 md:mt-0">

              <AddToCartButton
                className="px-2 size-8"
                product={product}
                quantity={1}
                size="icon"
              />
              <AddToWishButton
                className="px-2 size-8"
                product={product}
                quantity={1}
                size="icon"
              />
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Card;
