// -------------------- PACKAGE IMPORT FILES -------------------- //
import { X } from 'lucide-react';
import { useState, useRef } from "react";
import { CiFilter } from "react-icons/ci";
import { Dialog, DialogPanel } from "@headlessui/react"; 

// -------------------- OTHER IMPORT FILES -------------------- //
import { formatPrice } from "../shared/lib/utils";
import { Input } from '../shared/ui/input';
import { Button } from '../shared/ui/button';

export const ProductFilter = ({ onFilterChange, initialFilters }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || "");
    const [priceRange, setPriceRange] = useState(initialFilters.priceRange || [0, 10000]);

    const debounceTimer = useRef(null);
    const debouncedFilterChange = (filters) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            onFilterChange(filters);
        }, 300); // 300ms debounce time
    };

    const onSortChange = (sortOrder) => {
        setSortOrder(sortOrder);
        debouncedFilterChange({ sortOrder, priceRange });
    };

    const handlePriceChange = (priceRange) => {
        setPriceRange(priceRange);
        debouncedFilterChange({ sortOrder, priceRange });
    };

    //  without debounce

    // const onSortChange = (sortOrder) => {
    //   setSortOrder(sortOrder);
    //   onFilterChange({ sortOrder, priceRange });
    // };
    // const handlePriceChange = (priceRange) => {
    //   setPriceRange(priceRange);
    //   onFilterChange({ sortOrder, priceRange });
    // };


    const filtermodel = () => (

        <div className="lg:hidden">
            <Button aria-label="Filters"
                variant="outline"
                className="flex items-center justify-between w-full"
                onClick={() => setIsOpen(true)}
            >
                <span className="text-base font-medium text-gray-700">Filters</span>
                <CiFilter
                    className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400"
                    aria-hidden="true"
                />
            </Button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4 my-8">
                    <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl lg:hidden rounded-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <Button aria-label="Filters"
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                                className="p-1"
                                size="icon"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="mt-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
                            <div className="space-y-4">
                                <h3 className="inline-flex items-center mb-2 text-sm font-medium text-gray-900 md:text-md">
                                    Sort By Price
                                </h3>
                                <div className="flex items-center justify-between space-x-4">
                                    <button
                                        onClick={() =>
                                        (
                                            sortOrder === "lowToHigh" ? onSortChange("") : (onSortChange("lowToHigh"), setIsOpen(false))
                                        )

                                        }
                                        className={`px-2 py-1 md:px-4 md:py-2 text-xs border ${sortOrder === "lowToHigh"
                                            ? "border-blue-500 text-blue-500"
                                            : "border-gray-300 text-gray-600"
                                            } rounded`}
                                    >
                                        Low to High
                                    </button>
                                    <button
                                        onClick={() =>
                                        (
                                            sortOrder === "highToLow" ? (onSortChange("")) : (onSortChange("highToLow"), setIsOpen(false))
                                        )
                                        }
                                        className={`px-2 py-1 md:px-4 md:py-2 text-xs border ${sortOrder === "highToLow"
                                            ? "border-blue-500 text-blue-500"
                                            : "border-gray-300 text-gray-600"
                                            } rounded`}
                                    >
                                        High to Low
                                    </button>
                                </div>

                                <div className="pb-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Price Range
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex justify-between">
                                            <Input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) =>
                                                    handlePriceChange([
                                                        Number(e.target.value),
                                                        priceRange[1],
                                                    ])
                                                }
                                                className="w-20"
                                                placeholder="Min"
                                            />
                                            <Input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) =>
                                                    handlePriceChange([
                                                        priceRange[0],
                                                        Number(e.target.value),
                                                    ])
                                                }
                                                className="w-20"
                                                placeholder="Max"
                                            />
                                        </div>
                                        <input
                                            type="range"
                                            min={0}
                                            max={1000}
                                            step={10}
                                            value={priceRange[1]}
                                            onChange={(e) =>
                                                handlePriceChange([
                                                    priceRange[0],
                                                    Number(e.target.value),
                                                ])
                                            }
                                            className="w-full bg-primary"
                                        />
                                        <div className="text-sm text-gray-500">
                                            Price: {formatPrice(priceRange[0])} -{" "}
                                            {formatPrice(priceRange[1])}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )

    return (
        <div className='' >
            <div className="items-center hidden w-full pt-0 bg-white gap-x-4 lg:block">
                <h3 className="inline-flex items-center mb-2 text-sm font-medium text-gray-900 md:text-md">
                    Sort By Price
                </h3>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() =>
                            sortOrder === "lowToHigh" ? onSortChange("") : onSortChange("lowToHigh")
                        }
                        className={`px-2 py-1 md:px-4 md:py-2 text-xs border ${sortOrder === "lowToHigh"
                            ? "border-blue-500 text-blue-500"
                            : "border-gray-300 text-gray-600"
                            } rounded`}
                    >
                        Low to High
                    </button>
                    <button
                        onClick={() =>
                            sortOrder === "highToLow" ? onSortChange("") : onSortChange("highToLow")
                        }
                        className={`px-2 py-1 md:px-4 md:py-2 text-xs border ${sortOrder === "highToLow"
                            ? "border-blue-500 text-blue-500"
                            : "border-gray-300 text-gray-600"
                            } rounded`}
                    >
                        High to Low
                    </button>
                </div>
                <div className="pb-4 mt-4 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 md:text-md">
                        Price Range
                    </h3>
                    <div className="mt-2 space-y-4">
                        <div className="flex justify-between">
                            <Input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) =>
                                    handlePriceChange([
                                        Number(e.target.value),
                                        priceRange[1],
                                    ])
                                }
                                className="w-20"
                                placeholder="Min"
                            />
                            <Input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) =>
                                    handlePriceChange([
                                        priceRange[0],
                                        Number(e.target.value),
                                    ])
                                }
                                className="w-20"
                                placeholder="Max"
                            />
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            step={10}
                            value={priceRange[1]}
                            onChange={(e) =>
                                handlePriceChange([
                                    priceRange[0],
                                    Number(e.target.value),
                                ])
                            }
                            className="w-full bg-primary"
                        />
                        <div className="text-sm text-gray-500">
                            Price: {formatPrice(priceRange[0])} -{" "}
                            {formatPrice(priceRange[1])}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {filtermodel()}
            </div>
        </div>
    );
};
