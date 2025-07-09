// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../shared/lib/utils";
import { Button } from "../shared/ui/button";

const Highlight = ({ className, badge, title, description, buttonText, buttonLink, image,
}) => {
  return (
    <div
      className={cn("relative overflow-hidden rounded-lg shadow-lg", className)}
    >
      <div className="absolute inset-0">
        <img src={image} alt={title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      <div className="relative flex flex-col justify-end h-full p-6 text-white sm:px-6 sm:py-6">
        <div className="space-y-2 sm:space-y-3">
          {badge && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-orange-500 rounded-full">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-md text-sm text-gray-200 sm:text-base">
              {description}
            </p>
          )}
          {buttonText && buttonLink && (
            <Link to={buttonLink} className="inline-block mt-4">
              <Button
                variant="outline"
                className="px-4 py-2 text-sm border rounded-3xl border-zinc-900/10 text-zinc-900 dark:text-zinc-100"
              >
                {buttonText}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlight;
