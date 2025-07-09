// -------------------- PACKAGE IMPORT FILES -------------------- //
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../../../shared/lib/utils";
import { Button } from "../../../shared/ui/button";
import { cartStorage } from "../../cart/model/cartStorage";

const AddToCartButton = ({
  product,
  quantity = 1,
  className,
  size = "icon",
  label,
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(quantity);

  useEffect(() => {
    setIsInCart(cartStorage.getItems().some((item) => item._id === product._id));
  }, [product._id]);

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isInCart) {
        cartStorage.removeItem(product._id);
        setIsInCart(false);
        toast.success(`${product.name} removed from cart`);
      } else {
        cartStorage.addItem({ ...product, quantity });
        setIsInCart(true);
        toast.success(`${product.name} added to cart`);
      }
    },
    [isInCart, product, quantity],
  );

  useEffect(() => {
    if (isInCart && quantity !== prevQuantity) {
      cartStorage.updateItemQuantity(product._id, quantity);
      toast.success(`${product.name} quantity updated in cart`);
      setPrevQuantity(quantity);
    }
  }, [quantity, product._id, product.name, isInCart, prevQuantity]);

  return (
    <Button
      onClick={handleAddToCart}
      size={size}
      className={cn(className, "gap-x-2 w-full")}
      variant={isInCart ? "destructive" : "default"}
    >
      {size === "icon" && <ShoppingCart />}
      {label && (
        <span className="text-base font-medium">
          {isInCart ? "Remove from cart" : "Add to cart"}
        </span>
      )}
    </Button>
  );
};

export default AddToCartButton;
