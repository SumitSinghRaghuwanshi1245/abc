// -------------------- PACKAGE IMPORT FILES -------------------- //
import toast from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import { HeartIcon, HeartCrackIcon } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../../../shared/lib/utils";
import { Button } from "../../../shared/ui/button";
import { wishlistStorage } from "../../cart/model/wishlistStorage";

const AddToWishButton = ({ product, quantity, className, size = "icon" }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const items = wishlistStorage.getItems();
    const itemInWishlist = items.find((item) => item._id === product.id);
    setIsInWishlist(!!itemInWishlist);
  }, [product._id]);

  const handleAddToWishlist = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isInWishlist) {
        wishlistStorage.removeItem(product._id);
        setIsInWishlist(false);
        toast.success(`${product.name} removed from wishlist`, {
          icon: "💔",
        });
      } else {
        const newItem = { ...product, quantity: quantity || 1 };
        wishlistStorage.addItem(newItem);
        setIsInWishlist(true);
        toast.success(`${product.name} added to wishlist`, {
          icon: "❤️",
        });
      }
    },
    [isInWishlist, product, quantity],
  );

  useEffect(() => {
    if (isInWishlist && quantity) {
      wishlistStorage.updateItemQuantity(product._id, quantity);
    }
  }, [quantity, product._id, isInWishlist]);

  return (
    <Button
      onClick={handleAddToWishlist}
      size={size}
      className={cn(className, "")}
      variant={isInWishlist ? "destructive" : "default"}
    >
      {size === "icon" ? (
        isInWishlist ? (
          <HeartCrackIcon />
        ) : (
          <HeartIcon className="fill-current" />
        )
      ) : isInWishlist ? (
        "Remove from wishlist"
      ) : (
        "Add to wishlist"
      )}
    </Button>
  );
};

export default AddToWishButton;
