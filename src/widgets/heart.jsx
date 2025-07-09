// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Heart as HeartIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import Hint from "./hint";
import Sheet from "../widgets/sheet";
import CartItem from "../features/cart/ui/cart-item";
import { formatPrice } from "../shared/lib/utils";
import { Separator } from "../shared/ui/separator";
import { cartStorage } from "../features/cart/model/cartStorage";
import { wishlistStorage } from "../features/cart/model/wishlistStorage";
import { Button, buttonVariants } from "../shared/ui/button";

const Heart = () => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const wishlistTotal = items.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0,
  );

  const updateWishlist = () => {
    const wishlistItems = wishlistStorage.getItems();
    setItems(wishlistItems);
    setItemCount(wishlistItems.length);
  };

  useEffect(() => {
    updateWishlist();
    window.addEventListener("storage", updateWishlist);

    return () => {
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const intervalId = setInterval(updateWishlist, 300);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddAllToCart = () => {
    Promise.all(
      items.map(async (item) => {
        cartStorage.addItem(item);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        wishlistStorage.clearWishlist();
      }),
    ).then(() => {
      updateWishlist();
      toast.success("All items added to cart");
      setIsOpen(false);
    });
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Toaster />
        <Sheet.Trigger className="flex items-center p-2 -m-2 group">
          <Hint
            label={<p>Favorites</p>}
            side="bottom"
            align="center"
            alignOffset={10}
          >
            <div className="flex items-center p-1">
              <HeartIcon
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-zinc-600 group-hover:text-zinc-700 dark:text-zinc-400"
              />
              <span className="ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800 dark:text-zinc-400">
                {itemCount}
              </span>
            </div>
          </Hint>
        </Sheet.Trigger>
        <Sheet.Content className="flex flex-col h-full">
          <Sheet.Header className="font-polySansMedian space-y-2.5 pr-6 font-medium">
            <Sheet.Title>Favorites ({itemCount})</Sheet.Title>
          </Sheet.Header>
          {itemCount > 0 ? (
            <div className="flex flex-col h-full">
              <div className="p-6 pr-6 space-y-4 overflow-y-auto custom-scrollbarrr pb-52">
                {items.map((item) => (
                  <CartItem product={item} key={item.id} wishlist={true} />
                ))}
              </div>{" "}
              <Sheet.Footer className="absolute bottom-0 w-full space-y-2">
                <div className="w-full p-6 pt-6 space-y-4 sm:pt-2">
                  <Separator />
                  <div className="space-y-1.5 text-sm">
                    <div className="flex">
                      <span className="flex-1">Total</span>
                      <span>{formatPrice(wishlistTotal)}</span>
                    </div>
                  </div>
                  <Button
                    className={buttonVariants({
                      className: "w-full",
                    })}
                    onClick={handleAddAllToCart}
                  >
                    Add all to cart
                  </Button>
                </div>
              </Sheet.Footer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="text-2xl font-medium text-zinc-900">
                Your wishlist is empty
              </div>
              <Sheet.Footer>
                <Sheet.Close aschild="true">
                  <Link
                    to="/categories"
                    className={buttonVariants({
                      variant: "link",
                      size: "sm",
                      className: "text-lg text-white",
                    })}
                  >
                    Continue shopping
                  </Link>
                </Sheet.Close>
              </Sheet.Footer>
            </div>
          )}
        </Sheet.Content>
      </Sheet>
    </>
  );
};

export default Heart;
