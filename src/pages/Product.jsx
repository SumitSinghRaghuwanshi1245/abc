// -------------------- PACKAGE IMPORT FILES -------------------- //
import { ShoppingBag } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cartStorage } from "../features/cart/model/cartStorage";
import { Skeleton } from "../shared/ui/skeleton";
import { Button } from "../shared/ui/button.jsx";
import { fetchProductById } from "../shared/API_Calls/index.js"
import { renderRating } from "../widgets/rating/rating";
import MaxWidthWrapper from "../widgets/max-width-wrapper";
import { fetchProductsByCategories } from "../shared/API_Calls/index.js";
import ProductCarousel from "../widgets/productDisplayCarousel";
import AddToCartButton from "../features/cart/ui/add-to-cart-button";
import AddToWishButton from "../features/cart/ui/add-to-wish-button";
import { Carousel, CarouselContent, CarouselItem, } from "../shared/ui/carousel";
import { SkeletonLoading } from "../widgets/skeletons/HomeSkeleton.jsx";

// -------------------- Product Component -------------------- //

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [showCursorPosition, setShowCursorPosition] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCategoriesLoading, setisCategoriesLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setIsLoading(true);
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getProductDetails();
  }, [productId]);

  const fetchProducts = async (categories) => {
    setisCategoriesLoading(true)
    try {
      const response = await fetchProductsByCategories(categories);
      setProductsByCategory(response);
      setisCategoriesLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error);
      setisCategoriesLoading(false);
    }
  };

  useEffect(() => {
    isLoading === false && fetchProducts(product.category)
  }, [isLoading]);

  useEffect(() => {
    if (product) {
      const cartItem = cartStorage.getItems().find((item) =>
        item._id === product._id &&
        JSON.stringify(item.configuration) === JSON.stringify(product.configuration));  
      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(1);
      }
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      cartStorage.updateItemQuantity(product._id, quantity);
    }
  }, [quantity, product]);

  if (isLoading) {
    return (
      <MaxWidthWrapper className="pt-5">
        <div className="grid items-start grid-cols-1 gap-6 pb-10 lg:grid-cols-2 lg:gap-24 lg:pb-14">
          <Skeleton className="h-[600px] w-full" />
          <div>
            <Skeleton className="w-3/4 h-8 mb-4" />
            <Skeleton className="w-1/4 h-4 mb-2" />
            <Skeleton className="w-full h-20 mb-4" />
            <Skeleton className="w-1/3 h-6 mb-4" />
            <Skeleton className="w-full h-12 mb-8" />
            <Skeleton className="w-full h-40" />
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  if (!product) {
    return (
      <MaxWidthWrapper>
        <div>Product not found</div>
      </MaxWidthWrapper>
    );
  }

  const { productImageUrl } = product;
  const imageSrc = [productImageUrl];

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    cartStorage.updateItemQuantity(product._id, newQuantity);
  };

  const handleIncreaseQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  const handleMouseMove = (event) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setCursorPosition({ x, y });
    setShowCursorPosition(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowCursorPosition(false);
  };

  return (
    <MaxWidthWrapper className="pt-10">
      <div className="grid items-start grid-cols-1 gap-6 pb-10 lg:grid-cols-2 lg:gap-24 lg:pb-14">
        {/* Product Images */}
        <div className="">
          <div className="relative w-full pb-8">
            <Carousel index={index} onIndexChange={setIndex}>
              <CarouselContent className="relative">
                {imageSrc?.map((src, i) => (

                  <CarouselItem key={i}>
                    <div
                      className="flex h-[300px] items-center justify-center overflow-hidden rounded-lg sm:h-[400px] md:h-[500px] lg:h-[600px]"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    >
                      <img
                        src={src}
                        alt={`Product image ${i + 1}`}
                        className="object-contain w-full h-full"
                        draggable={false}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex justify-center w-full px-4 mt-4 space-x-3">
              {imageSrc?.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-12 w-12 border ${index === i ? 'border-blue-500' : 'border-zinc-200'}`}
                >
                  <img
                    src={imageSrc[i]}
                    alt={`Thumbnail ${i + 1}`}
                    className="object-contain w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="relative pt-8 lg:pt-0">
          {isHovered && (
            <div
              className="absolute inset-0 z-20 my-auto hidden h-[80%] w-full overflow-hidden rounded-lg bg-black/50 lg:flex"
              style={{
                backgroundImage: `url(${imageSrc[index]})`,
                backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                backgroundSize: '200%',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          )}

          <div className="border-b border-gray-300 mb-7 pb-7">
            <h2 className="mb-3.5 text-lg font-bold text-gray-900 md:text-xl lg:text-2xl 2xl:text-3xl">
              {product.productImageName || product.name || product.title}
            </h2>

            <div className="flex flex-col items-start text-[#868686]">
              <span className="text-lg">
                MRP:{" "}
                <span className={`font-bold line-through text-orange-500`}>
                  ₹{product.MRP}
                </span>
              </span>
              <span className="text-lg selection:text-[#16191E]">
                <span className="font-bold text-[#0a7558] selection:text-[#16191E]">
                  ₹{product.sellingPrice}
                </span>
                <span className="text-sm selection:text-[#16191E]">
                  <span className="font-bold text-[#206e96] selection:text-[#16191E]">
                    {" "}(₹{product.MRP - product.sellingPrice} saving)
                  </span>
                </span>
              </span>
            </div>
            <p className="my-2">{renderRating(4)}</p>
            <h2 className="text-sm font-semibold text-gray-900 md:text-lg">
              Brand : {" "} <span className="text-gray-700">{product.brand}</span>
            </h2>
            <h2 className="mt-2 text-xs font-semibold text-gray-900 md:text-xs">
              {product.productStatus === "available" ? <span className=" uppercase bg-green-500 hover:bg-green-600 px-2 py-0.5 rounded text-white">{product.productStatus}</span>
                : <span className=" uppercase bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded text-white">Out of stock</span>}
            </h2>
          </div>

          <div className="flex flex-col items-start gap-2 pb-8 border-b border-gray-300 space-s-4 lg:flex-row lg:items-center">
            <div className="flex items-center justify-between flex-shrink-0 overflow-hidden border border-gray-300 rounded-md group h-11">
              <button
                className="flex items-center justify-center w-10 h-full text-gray-900 border-gray-300 border-e hover:bg-gray-100"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
              <span className="flex items-center justify-center w-12 h-full text-base font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                className="flex items-center justify-center w-10 h-full text-gray-900 border-gray-300 border-s hover:bg-gray-100"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
            <div className="flex items-center w-full gap-2 max-w-fit">
              <AddToWishButton className="px-2 w-fit" product={product} quantity={1} size="icon" />
              <AddToCartButton
                className="px-2 w-fit" product={product} quantity={quantity}
                size="icon" label
              />
              <Button onClick={()=>navigate(`/checkout?id=${product._id}&quantity=${quantity}`)} className="text-base font-medium bg-orange-500 hover:bg-orange-600"><ShoppingBag className="mr-2" /> Buy Now </Button>
            </div>
            <div className="border-none">
            </div>
          </div>
          <div className="shadow-sm">
            <header className="flex flex-col items-start justify-between py-5 border-t border-gray-300 cursor-pointer lg:flex-row lg:block">
              <h2 className="pr-2 text-sm font-semibold text-gray-900">Product Description</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700 lg:text-sm lg:leading-0">
                {product.description ? product.description : ' RGS Groceries delivers fresh, daily essentials right to your doorstep, ensuring top quality, unbeatable freshness, and amazing savings with every purchase. Enjoy convenience, quality, and great discounts all in one place!'}
              </p>
            </header>
          </div>
          <div className="py-0">
            <ul className="mt-4 space-y-5 text-sm">
              <li>
                <span className="font-semibold text-gray-900">Category: </span>
                <a className="text-blue-600 hover:underline">{product.category}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-10">
        {
          isCategoriesLoading ?
            <div>
              <SkeletonLoading />
            </div>
            :
            (productsByCategory.length > 0 ?
              <ProductCarousel
                title={"Similar Products"}
                products={productsByCategory}
                category={product.category}
              />
              :
              <div>No similar products found</div>)
        }
      </div>
    </MaxWidthWrapper>
  );
};

export default Product;

