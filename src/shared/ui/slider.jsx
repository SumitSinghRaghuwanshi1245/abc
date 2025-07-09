// -------------------- PACKAGE IMPORT FILES -------------------- //
import React, { useState, useRef, useEffect } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../lib/utils"; // Assuming you still want to use cn for classNames

const Slider = React.forwardRef(
  (
    { className, min = 0, max = 100, step = 1, value = 0, onChange, ...props },
    ref,
  ) => {
    const [sliderValue, setSliderValue] = useState(value);
    const sliderRef = useRef(null);

    useEffect(() => {
      setSliderValue(value);
    }, [value]);

    const handleMouseDown = (event) => {
      const slider = sliderRef.current;
      const { left, width } = slider.getBoundingClientRect();
      const newValue = ((event.clientX - left) / width) * (max - min) + min;
      setValue(newValue);
    };

    const handleMouseMove = (event) => {
      if (event.buttons === 1) {
        handleMouseDown(event);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const setValue = (newValue) => {
      const clampedValue = Math.max(
        min,
        Math.min(max, Math.round(newValue / step) * step),
      );
      setSliderValue(clampedValue);
      if (onChange) {
        onChange(clampedValue);
      }
    };

    useEffect(() => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, []);

    return (
      <div
        ref={sliderRef}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        <div className="relative w-full h-2 overflow-hidden rounded-full grow bg-secondary">
          <div
            className="absolute h-full bg-primary"
            style={{ width: `${((sliderValue - min) / (max - min)) * 100}%` }}
          />
        </div>
        <div
          className="block w-5 h-5 transition-colors border-2 rounded-full border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{
            left: `${((sliderValue - min) / (max - min)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        />
      </div>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
