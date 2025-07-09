// -------------------- PACKAGE IMPORT FILES -------------------- //
import { twMerge } from "tailwind-merge";

const MaxWidthWrapper = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        "font-poppins mx-auto max-w-8xl overflow-hidden bg-white px-4 pt-20 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
