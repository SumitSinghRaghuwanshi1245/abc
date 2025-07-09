// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../lib/utils";

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    if (!decorative) return null; // If not decorative, don't render anything

    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className,
        )}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";

export { Separator };
