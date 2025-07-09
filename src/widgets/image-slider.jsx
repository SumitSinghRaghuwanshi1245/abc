// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../shared/lib/utils";

const ImageSlider = ({ images, className }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -80 && imgIndex < images?.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1);
    } else if (x >= 80 && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1);
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className={cn(
        "group relative aspect-square h-full w-full overflow-hidden rounded-lg",
        className,
      )}
      onClick={stopPropagation}
    >
      <div className="absolute z-10 flex justify-between w-full px-5 -translate-y-1/2 pointer-events-none top-1/2">
        <button
          style={imgIndex === 0 ? { opacity: 0 } : {}}
          className="p-2 transition-all rounded-full opacity-0 pointer-events-auto h-fit w-fit bg-white/80 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            if (imgIndex > 0) {
              setImgIndex((prevIndex) => prevIndex - 1);
            }
          }}
        >
          <ChevronLeft className="stroke-neutral-600" size={20} />
        </button>
        <button
          style={imgIndex === images?.length - 1 ? { opacity: 0 } : {}}
          className="p-2 transition-all rounded-full opacity-0 pointer-events-auto h-fit w-fit bg-white/80 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            if (imgIndex < images?.length - 1) {
              setImgIndex((prevIndex) => prevIndex + 1);
            }
          }}
        >
          <ChevronRight className="stroke-neutral-600" size={20} />
        </button>
      </div>
      <div className="absolute z-10 flex items-center justify-center w-full pointer-events-none bottom-2">
        <div className="flex w-9 items-center justify-center rounded-md bg-black/80 p-0.5 text-xs text-white opacity-0 transition-all group-hover:opacity-100">
          <div>
            {imgIndex + 1}/{images?.length}
          </div>
        </div>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: -((images?.length - 1) * 100), right: 0 }}
        dragMomentum={false}
        style={{ x: dragX }}
        animate={{ x: `-${imgIndex * 100}%` }}
        onDragEnd={onDragEnd}
        transition={{
          damping: 18,
          stiffness: 90,
          type: "spring",
          duration: 0.2,
        }}
        className="flex items-center h-full cursor-grab"
      >
        {images?.map((src, i) => (
          <motion.div
            key={i}
            className="w-full h-full overflow-hidden shrink-0"
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="object-contain w-full h-full px-4 py-4"
              onClick={stopPropagation}
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageSlider;
