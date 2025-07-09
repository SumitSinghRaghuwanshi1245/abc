// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, Popover, PopoverButton, PopoverGroup, PopoverPanel, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

// -------------------- OTHER IMPORT FILES -------------------- //
import "../app/styles/App.css";
import Heart from "./heart";
import AppLogo from "./logo";
import Cart from "../features/cart/ui/cart.jsx";
import { cn } from "../shared/lib/utils.js";
import { Button } from "../shared/ui/button";
import UserAvatar from "./user-avatar";
import SearchInput from "./search-input";
import rgslogo from "../shared/assets/rgslogo.avif";
import useCategoryStore from "../entities/category/api/categoryStore.js";
import { useUserContext } from "../shared/context/UserContext.jsx";
import { CategorySkeleton } from "../widgets/skeletons/CategorySkeleton.jsx";

const NavBar = () => {
  const {user} = useUserContext();
  const navigate = useNavigate();
  const { fetchDynamicCategories, categories, isLoading, error } =
    useCategoryStore();
  const links = [
    { name: "Home", to: "/" },
    { name: "Deals", to: "/deals" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [Menutogglebar, setMenutogglebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [user, location]);

  useEffect(() => {
    fetchDynamicCategories();
  }, [fetchDynamicCategories]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    return navigate("/");
  }

  return (
    <header className="top-0 z-40 border-b bg-card">
      <div className="flex items-center justify-center scrollingTextContainer">
        <div className="w-full bg-blue-500 text-xs md:max-w-7xl md:rounded md:text-sm flex justify-center py-0.5 md:py-1 font-semibold text-center text-white mt-0.5 md:mt-2">
          <h1 className="max-w-sm overflow-hidden scrollingText md:max-w-full">
            FLAT 10% off on order above 999 Rs/-
          </h1>
        </div>
      </div>
      <div className="flex flex-col mx-auto lg:max-w-8xl lg:flex-row">
        <nav
          aria-label="Global"
          className="flex items-center justify-between w-full px-6 py-1 mx-auto lg:w-fit lg:px-8"
        >
          <div className="flex lg:flex-none">
            <Link to="/" className="-m-1.5 p-1.5">
              <div className="flex flex-col items-center justify-center gap-x-1">
                <img className="size-14" src={rgslogo} alt="" />
                <span className="mt-0 ml-2 text-sm font-bold text-gray-700">
                  RGS Grocery
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-x-2 lg:hidden">
            <Heart />
            <Cart />
            {user ? (
              <UserAvatar user={user} />
            ) :
              <button
                className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-2"
                onClick={() => setMenutogglebar(!Menutogglebar)}
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>}
          </div>
        </nav>
        <div className="flex items-center px-6 py-2 lg:hidden gap-x-2">
          <button
            className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-2"
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
          >
            {
              categoryDropdownOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />
            }
          </button>
          <SearchInput className="w-full" />
        </div>
        {categoryDropdownOpen && (
          <div className="absolute lg:hidden flex top-44 left-2 z-50 w-[95%] max-h-[300px] overflow-y-auto bg-white shadow-lg ring-1 ring-gray-900/10 rounded-md custom-scrollbar">
            <div className="flex flex-col p-2 gap-y-2">
              {
                categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/categories/${category.name}`}
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="flex items-center px-2 py-1 text-sm text-gray-700 rounded-md gap-x-2 hover:bg-gray-100"
                  >
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <span>{category.name}</span>
                  </Link>
                ))
              }
            </div>
          </div>
        )}

        <div className="items-center justify-between hidden w-full px-6 py-2 gap-x-12 lg:flex">
          <PopoverGroup className="flex lg:gap-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {link.name}
              </Link>
            ))}

            <Popover className="relative">
              {({ open, close }) => (
                <>
                  <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
                    Category
                    <ChevronDown
                      aria-hidden="true"
                      className="flex-none w-5 h-5 text-gray-400"
                    />
                  </PopoverButton>
                  {open && (
                    <PopoverPanel className="absolute custom-scrollbar z-50 mt-4 w-80 max-h-[450px] overflow-y-auto bg-white shadow-lg ring-1 ring-gray-900/10 rounded-md">
                      <div className="flex flex-col p-2 gap-y-2">
                        {isLoading ? (
                          <div>
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                          </div>

                        ) : 
                          categories.map((category) => (
                            <Link
                              key={category.slug}
                              to={`/categories/${category.name}`}
                              onClick={() => close()} // Close dropdown on click
                              className="flex items-center px-2 py-1 text-sm text-gray-700 rounded-md gap-x-2 hover:bg-gray-100"
                            >
                              <img
                                src={category.image_url}
                                alt={category.name}
                                className="object-cover w-12 h-12 rounded-full"
                              />
                              <span>{category.name}</span>
                            </Link>
                          ))
                        }
                      </div>
                    </PopoverPanel>
                  )}
                </>
              )}
            </Popover>
          </PopoverGroup>

          <SearchInput className="hidden lg:flex" />
          <div className="items-center hidden gap-x-2 lg:flex">
            <Heart />
            <Cart />
            {user ? (
              <UserAvatar user={user} />
            ) :
              (
                <Link
                  to="/signup"
                  className="block px-3 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  <Button
                    variant="default"
                    className="flex items-center w-full space-x-2"
                  >
                    <span>Login / Signup</span>
                  </Button>
                </Link>
              )
            }
          </div>
        </div>
      </div>

      <Dialog
        open={Menutogglebar}
        onClose={setMenutogglebar}
        className="z-[100] lg:hidden overflow-hidden"
      >
        <div className="fixed inset-0" />
        <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">RGS Grocery</span>
              <AppLogo />
            </Link>
            <div className="flex space-x-2">
              <Heart />
              <Cart />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMenutogglebar(false)}
                className="inline-flex items-center justify-center rounded-md py-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDown
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">

                  </DisclosurePanel>
                </Disclosure>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setMenutogglebar(false)}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-6">
                <Link
                  to="/signup"
                  className="block -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  <Button
                    variant="default"
                    onClick={() => setMenutogglebar(false)}
                    className="flex w-full items-center space-x-2 px-3 py-2.5"
                  >
                    <span>Login / Signup</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavBar;
