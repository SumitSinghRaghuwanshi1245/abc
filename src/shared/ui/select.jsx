// -------------------- PACKAGE IMPORT FILES -------------------- //
import { ChevronDown, Check } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../lib/utils";

const Select = React.forwardRef(
  ({ children, onChange, defaultValue, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const selectRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (value) => {
      setSelectedValue(value);
      setIsOpen(false);
      if (onChange) onChange(value);
    };

    return (
      <div className="relative" ref={selectRef}>
        <SelectTrigger
          onClick={() => setIsOpen(!isOpen)}
          value={selectedValue}
          {...props}
        >
          <SelectValue>{selectedValue || "Select an option"}</SelectValue>
        </SelectTrigger>
        {isOpen && (
          <SelectContent>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { onSelect: handleSelect }),
            )}
          </SelectContent>
        )}
      </div>
    );
  },
);

const SelectTrigger = React.forwardRef(
  ({ onClick, children, ...props }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...props}
    >
      {children}
      <ChevronDown className="w-4 h-4 opacity-50" />
    </button>
  ),
);

const SelectValue = React.forwardRef(({ children, ...props }, ref) => (
  <span className="block truncate" ref={ref} {...props}>
    {children}
  </span>
));

const SelectContent = React.forwardRef(({ children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
    )}
    {...props}
  >
    <div className="p-1">{children}</div>
  </div>
));

const SelectItem = React.forwardRef(
  ({ children, value, onSelect, ...props }, ref) => (
    <div
      ref={ref}
      onClick={() => onSelect(value)}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Check className="w-4 h-4" />
      </span>
      {children}
    </div>
  ),
);

Select.displayName = "Select";
SelectTrigger.displayName = "SelectTrigger";
SelectValue.displayName = "SelectValue";
SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
