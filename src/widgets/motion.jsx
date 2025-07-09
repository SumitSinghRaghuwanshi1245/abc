// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Motion({
  direction = "up",
  className,
  classNameText,
  framerProps,
  text,
  useInViewProp = true,
  inViewMargin = "-100px",
  children,
  duration = 1.7,
  up = 100,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: inViewMargin });
  const directionOffset = useMemo(() => {
    const map = { up: up, down: -50, left: -90, right: 90 };
    return map[direction];
  }, [direction]);

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const defaultFramerProps = {
    hidden: { opacity: 0, [axis]: directionOffset },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: { type: "spring", duration: duration },
    },
  };

  const FADE_ANIMATION_VARIANTS = useMemo(
    () => ({
      ...defaultFramerProps,
      ...framerProps,
    }),
    [framerProps, defaultFramerProps],
  );

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={useInViewProp && isInView ? "visible" : "hidden"}
      variants={FADE_ANIMATION_VARIANTS}
      className={className}
    >
      {children ? children : <span classNameText={classNameText}>{text}</span>}
    </motion.div>
  );
}
