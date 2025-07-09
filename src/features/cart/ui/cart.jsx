// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Toaster } from "react-hot-toast";
import { ShoppingCartIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import Hint from "../../../widgets/hint";
import CartItem from "./cart-item";
import Sheet from "../../../widgets/sheet";
import { formatPrice } from "../../../shared/lib/utils";
import { Separator } from "../../../shared/ui/separator";
import { cartStorage } from "../model/cartStorage";
import { buttonVariants } from "../../../shared/ui/button";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const fee = 5;
  const navigate = useNavigate();
  const cartTotal = items.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0,
  );

  const updateCart = () => {
    const cartItems = cartStorage.getItems();
    setItems(cartItems);
    setItemCount(cartItems.length);
  };

  useEffect(() => {
    updateCart();
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const intervalId = setInterval(updateCart, 300);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen} className=''>
        <Toaster />
        <Sheet.Trigger className="flex items-center p-2 -m-2 group">
          <Hint
            label={<p>Cart</p>}
            side="bottom"
            align="center"
            alignOffset={10}
          >
            <div className="flex items-center p-1">
              <ShoppingCartIcon
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
          <Sheet.Header className="space-y-2.5 p-6 font-medium">
            <Sheet.Title>Cart ({itemCount})</Sheet.Title>
          </Sheet.Header>{" "}
          {itemCount > 0 ? (
            <div className="flex flex-col h-full">
              <div className="p-6 pb-64 pr-6 space-y-4 overflow-y-auto custom-scrollbarrr">
                {items.map((item) =>
                (
                  <CartItem product={item} key={item._id} />
                )
                )}
              </div>
              <Sheet.Footer className="absolute bottom-0 w-full space-y-2">
                <div className="w-full p-6 pt-6 space-y-4 sm:pt-2">
                  <Separator />
                  <div className="space-y-1.5 text-sm">
                    <div className="flex">
                      <span className="flex-1">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex">
                      <span className="flex-1">Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/checkout")
                      window.scrollTo(0, 0) 
                    }}
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Checkout
                  </button>
                </div>
              </Sheet.Footer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="text-2xl font-medium text-zinc-900">
                Your cart is empty
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
                    Add items to your cart to checkout
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

export default Cart;
