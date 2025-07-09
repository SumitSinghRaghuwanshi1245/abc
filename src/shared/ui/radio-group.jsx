"use client";
// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from "react";
import { Circle } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../lib/utils";

const RadioGroup = React.forwardRef(function RadioGroup(
  { className, value, onChange, children, ...props },
  ref
) {
  return (
    <div
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
      role="radiogroup"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          selectedValue: value,
          onValueChange: onChange,
        })
      )}
    </div>
  );
});

const RadioGroupItem = React.forwardRef(function RadioGroupItem(
  { className, value, selectedValue, onValueChange, ...props },
  ref
) {
  const isSelected = value === selectedValue;

  return (
    <button
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary flex items-center justify-center",
        isSelected && "bg-primary",
        "ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      aria-checked={isSelected}
      role="radio"
      onClick={() => onValueChange && onValueChange(value)}
      {...props}
    >
      {isSelected && <Circle className="h-2.5 w-2.5 fill-current text-white" />}
    </button>
  );
});

export { RadioGroup, RadioGroupItem };
