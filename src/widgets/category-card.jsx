// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Link } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import { formatPrice } from "../shared/lib/utils";

const CategoryCard = ({ category }) => {

  return (
    <div className="relative flex flex-col overflow-hidden transition-transform duration-300 bg-white border border-gray-300 shadow-lg group rounded-xl hover:scale-105 hover:shadow-xl">
      <Link onClick={() => window.scrollTo(0,0)} to={category.name} className="flex flex-col items-center p-3">
        {category.image_url && (
          <img
            src={category.image_url}
            alt={category.image_url || "Category image"}
            className="object-contain w-full transition-opacity duration-300 rounded-lg h-36"
          />
        )}
        <div className="mt-2 text-center">
          {category.name && (
            <h3 className="text-lg font-semibold capitalize text-zinc-900">
              {category.name}
            </h3>
          )}
          {category.description && (
            <p className="mt-1 text-sm text-gray-500">{category.description}</p>
          )}
          {category.price && (
            <div className="mt-2">
              {category.discount ? (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    MRP: {formatPrice(category.price)}
                  </span>
                  <span className="ml-2 text-lg font-semibold text-green-600">
                    {formatPrice(
                      category.price -
                      (category.price * category.discount) / 100,
                    )}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold text-zinc-900">
                  {formatPrice(category.price)}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
