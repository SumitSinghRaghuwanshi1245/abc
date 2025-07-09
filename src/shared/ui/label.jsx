// -------------------- PACKAGE IMPORT FILES -------------------- //
import * as React from "react";
import { cva } from "class-variance-authority";


const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={labelVariants(className)}
      {...props}
      onMouseDown={(event) => {
        // Only prevent text selection if clicking inside the label itself
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;

        // Prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }}
    />
  );
});

Label.displayName = "Label";

export { Label };
