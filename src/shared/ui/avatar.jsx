// -------------------- PACKAGE IMPORT FILES -------------------- //
import React, { useState, useEffect } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(
  ({ src, alt, className, ...props }, ref) => {
    const [imageLoadingStatus, setImageLoadingStatus] = useState("loading");

    useEffect(() => {
      if (!src) {
        setImageLoadingStatus("error");
        return;
      }

      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoadingStatus("loaded");
      img.onerror = () => setImageLoadingStatus("error");
    }, [src]);

    return imageLoadingStatus === "loaded" ? (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...props}
      />
    ) : null;
  },
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(
  ({ className, delayMs = 0, ...props }, ref) => {
    const [showFallback, setShowFallback] = useState(delayMs === 0);

    useEffect(() => {
      if (delayMs > 0) {
        const timer = setTimeout(() => setShowFallback(true), delayMs);
        return () => clearTimeout(timer);
      }
    }, [delayMs]);

    return showFallback ? (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          className,
        )}
        {...props}
      />
    ) : null;
  },
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
