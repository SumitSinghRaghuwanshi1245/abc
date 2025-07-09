// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useState } from "react";

const Hint = ({
  label,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 14,
  alignOffset = 10,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = (visibility) => {
    setIsVisible(visibility);
  };

  const tooltipStyles = {
    position: "absolute",
    background: "#333",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    zIndex: 100,
    display: isVisible ? "block" : "none",
    ...(side === "top" && {
      bottom: `calc(100% + ${sideOffset}px)`,
      left:
        align === "center" ? "50%" : align === "left" ? `${alignOffset}px` : "",
      right: align === "right" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateX(-50%)" : "",
    }),
    ...(side === "bottom" && {
      top: `calc(100% + ${sideOffset}px)`,
      left:
        align === "center" ? "50%" : align === "left" ? `${alignOffset}px` : "",
      right: align === "right" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateX(-50%)" : "",
    }),
    ...(side === "left" && {
      right: `calc(100% + ${sideOffset}px)`,
      top:
        align === "center" ? "50%" : align === "top" ? `${alignOffset}px` : "",
      bottom: align === "bottom" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateY(-50%)" : "",
    }),
    ...(side === "right" && {
      left: `calc(100% + ${sideOffset}px)`,
      top:
        align === "center" ? "50%" : align === "top" ? `${alignOffset}px` : "",
      bottom: align === "bottom" ? `${alignOffset}px` : "",
      transform: align === "center" ? "translateY(-50%)" : "",
    }),
  };

  const wrapperStyles = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  };

  return (
    <div
      style={wrapperStyles}
      onMouseEnter={() => toggleTooltip(true)}
      onMouseLeave={() => toggleTooltip(false)}
    >
      {children}
      <div style={tooltipStyles}>{label}</div>
    </div>
  );
};

export default Hint;
