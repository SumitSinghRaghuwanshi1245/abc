import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { cn } from "../shared/lib/utils";
import { Input } from "../shared/ui/input";
import useDebounce from "../shared/hook/use-debounce";
import { fetchProductsByQuery } from "../shared/API_Calls/index";
import { useAutoSuggestStore } from "../entities/product/api/auto-suggest";

const SearchInput = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const debouncedValue = useDebounce(inputValue, 500);
  const navigate = useNavigate();
  const lastDebouncedValue = useRef(debouncedValue);

  // Auto-suggest store
  const names = useAutoSuggestStore((s) => s.names);
  const fetchSuggestedProducts = useAutoSuggestStore((s) => s.fetchSuggestedProducts);

  useEffect(() => {
    if (names.length === 0) {
      fetchSuggestedProducts();
    }
  }, [fetchSuggestedProducts, names.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % (names.length || 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [names.length]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedValue) {
        try {
          await fetchProductsByQuery({ searchedKey: debouncedValue });
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        // setSearchResults([]); // Not used
      }
    };

    if (debouncedValue !== lastDebouncedValue.current) {
      lastDebouncedValue.current = debouncedValue;
      fetchSearchResults();

      const params = new URLSearchParams({
        page: 1,
        rawQuery: debouncedValue || "",
      });

      const url = debouncedValue ? `/search?${params.toString()}` : `/`;
      navigate(url, { replace: true });
    }
  }, [debouncedValue, navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === "") {
      setFilteredSuggestions(names);
    } else {
      const filtered = names.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
    setShowDropdown(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleFocus = () => {
    setFilteredSuggestions(names);
    setShowDropdown(true);
    if (names.length === 0) {
      fetchSuggestedProducts();
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative z-10 w-full px-4", className)}>
      <div className="relative w-full">
        <div className="relative w-full">
          <Input
            type="search"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full py-6 pl-12 pr-6 rounded-xl ring-0 focus-visible:outline-none focus:ring-0 focus:border-0"
            aria-label="Search for products"
          />
          <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />
          {!inputValue && names.length > 0 && (
            <div className="absolute flex items-center -translate-y-1/2 pointer-events-none left-12 top-1/2">
              <span className="text-sm text-muted-foreground">Search for </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPlaceholder}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-1 text-sm text-muted-foreground"
                >
                  {names[currentPlaceholder]}...
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        {showDropdown && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 z-20 w-full mt-2 overflow-y-auto bg-white border shadow-lg top-full rounded-xl max-h-64 no-scrollbar">
            {filteredSuggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onMouseDown={() => {
                  setInputValue(item);
                  navigate(`/search?q=${encodeURIComponent(item)}`);
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-3 text-sm text-left hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};

export default SearchInput;
