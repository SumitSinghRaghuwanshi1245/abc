// -------------------- PACKAGE IMPORT FILES -------------------- //
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { Button } from "../shared/ui/button";
import { cn, useOnClickOutside } from "../shared/lib/utils";

const Sheet = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSheet = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { toggleSheet, isOpen }),
      )}
    </>
  );
};

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <div
    className={cn(
      "fixed inset-0 z-40 bg-black/80 transition-opacity duration-300",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = ({ children, isOpen, toggleSheet, side = "right" }) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => isOpen && toggleSheet());

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: {
      x: side === "left" ? "-100%" : "100%",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SheetOverlay />
          <motion.div
            ref={ref}
            className={`fixed inset-y-0 ${side}-0 z-50 flex h-full w-full flex-col border-l-2 border-zinc-900/60 bg-background shadow-lg transition-transform sm:max-w-md`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.04, ease: "linear" }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSheet}
              className="absolute right-6 top-[1.125rem] z-50 rounded-md bg-black/5 p-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close</span>
            </Button>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SheetTrigger = ({ children, toggleSheet }) => (
  <button onClick={toggleSheet} className="">
    {children}
  </button>
);

const SheetHeader = ({ children }) => (
  <>
    <div className="sticky flex flex-col mx-4 my-6 space-y-2 text-center top-4 sm:text-left">
      {children}
    </div>
  </>
);

const SheetTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-foreground">{children}</h2>
);

const SheetDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

const SheetFooter = ({ children, className }) => (
  <div className={cn("mx-auto flex space-x-2 bg-white", className)}>
    {children}
  </div>
);

const SheetClose = ({ children, onClick }) => (
  <Button onClick={onClick}>{children}</Button>
);

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;
Sheet.Footer = SheetFooter;
Sheet.Close = SheetClose;

export default Sheet;
