// -------------------- PACKAGE IMPORT FILES -------------------- //
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../lib/utils";

const Accordion = ({ children, className, ...props }) => {
  return (
    <div className={cn("accordion w-full", className)} {...props}>
      {children}
    </div>
  );
};

const AccordionItem = ({ children, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen }),
      )}
    </div>
  );
};

const AccordionTrigger = ({
  children,
  className,
  isOpen,
  setIsOpen,
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      {/* <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180",
        )} 
      />*/}
    </button>
  );
};

const AccordionContent = ({ children, className, isOpen, ...props }) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up",
        className,
      )}
      {...props}
    >
      {isOpen && <div className="pt-0 pb-4">{children}</div>}
    </div>
  );
};
Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
