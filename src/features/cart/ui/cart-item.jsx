// -------------------- PACKAGE IMPORT FILES -------------------- //
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// -------------------- OTHER IMPORT FILES -------------------- //
import { Button } from "../../../shared/ui/button";
import { formatPrice } from "../../../shared/lib/utils";
import { cartStorage } from "../model/cartStorage";
import { wishlistStorage } from "../model/wishlistStorage";

const CartItem = ({ product, removeItem, wishlist }) => {
  const removeItemHandler = (e) => {
    e.stopPropagation();
    cartStorage.removeItem(product._id);
    toast.success(`${product.name} removed from cart`);
  };
  const removeWishItem = (e) => {
    e.stopPropagation();
    wishlistStorage.removeItem(product._id);
    toast.success(`${product.name} removed from wishlist`);
  };

  const changeCartValue = (e) => {
    if (e == 0) {
      if (product.quantity != 1) {
        cartStorage.updateItemQuantity(product._id, product.quantity - 1);
        toast.success(`${product.name} quantity updated in cart`);
      }
      else {
        cartStorage.removeItem(product._id);
        toast.success(`${product.name} removed from cart`);
      }
    }
    else {
      cartStorage.updateItemQuantity(product._id, product.quantity + 1);
      toast.success(`${product.name} quantity updated in cart`);
    }
  }

  const handleRemove = wishlist
    ? removeWishItem
    : removeItem || removeItemHandler;

  return (
    <div className="py-2 space-y-3">
      <Toaster />
      <div className="flex items-start justify-between gap-3 ">
        <div className="flex items-center space-x-4">
          <Link to={product.href} className="flex items-center space-x-4">
            <div className="relative w-16 h-16 overflow-hidden rounded aspect-square min-w-fit">

              <img
                src={product.productImageUrl}
                alt={product.title}
                className="absolute object-contain w-full h-full p-1"
              />

            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-base font-semibold text-gray-900 line-clamp-1">
                {product.productImageName || product.name || product.title}
              </span>
              <span className="text-base font-medium text-green-900">
                {formatPrice(product.sellingPrice)}
              </span>
            </div>
          </Link>

        </div>
        <div className="flex flex-col w-[30%] items-center justify-end  my-auto gap-2">

          <div className="flex items-center justify-start md:justify-between w-[100%] md:w-full">
            <span
              onClick={() => changeCartValue(0)}
              className="px-3 text-2xl font-semibold text-black rounded-md cursor-pointer md:text-xl md:px-2">
              -
            </span>
            <span className="text-xl font-semibold px-2 rounded-md text-black border-[1px]">
              {product.quantity}
            </span>
            <span
              onClick={() => changeCartValue(1)}
              className="px-3 text-2xl font-semibold text-black rounded-md cursor-pointer md:text-xl md:px-2">
              +
            </span>
          </div>
          <Button
            variant="destructive"
            size="xm"
            onClick={handleRemove}
            className="text-[14px] px-2 py-[1px] text-white hover:text-zinc-950"
          >
            <X className="w-3 h-3 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
