// -------------------- PACKAGE IMPORT FILES -------------------- //
import { cn } from "../lib/utils";
import { Check } from "lucide-react";
import React, { useState } from "react";

const Checkbox = ({ className, checked, onChange, disabled, ...props }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    if (!disabled) {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      if (onChange) onChange(newChecked);
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleChange();
        }
      }}
      className={cn(
        "flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        isChecked && "bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      {isChecked && <Check className="w-4 h-4 text-current" />}
    </div>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
