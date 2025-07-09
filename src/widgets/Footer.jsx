// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Link } from "react-router-dom";
import { ImLinkedin2 } from "react-icons/im";
import React, { useEffect } from "react";
import { FaFacebookF, FaPhone } from "react-icons/fa";
import { IoLogoInstagram, IoLogoTwitter, IoMail } from "react-icons/io5";

// -------------------- OTHER IMPORT FILES -------------------- //
import rgslogo from "../shared/assets/rgslogo.avif";
import useCategoryStore from "../entities/category/api/categoryStore.js";

// -------------------- PDF FILE IMPORTS -------------------- //
import privacypolicy from "../shared/assets/privacypolicy.pdf";
import refundpolicy from "../shared/assets/refundpolicy.pdf";
import tandcpolicy from "../shared/assets/tandcpolicy.pdf";

const Footer = () => {
  const { categories, fetchCategories, isLoading } = useCategoryStore();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <footer className="mt-2 border-t border-gray-200">
      <div className="max-w-screen-xl px-4 pt-16 pb-8 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block mb-0">
              <img className="size-14" src={rgslogo} alt="RGS Logo" />
            </Link>
            <div className="mt-0 space-y-4 text-sm text-gray-600">
              <p className="flex items-center gap-3">
                <span>
                  Head Office No: 1 MPSEDC IT COMPLEX BUILDING, IT Park, Badwai
                  Bhopal <br /> 462033
                </span>
              </p>
              <p className="flex items-center gap-3">
                <IoMail className="text-gray-400" />
                <span>reeplayerindia@gmail.com</span>
              </p>
              <p className="flex items-center gap-3">
                <FaPhone className="text-gray-400 rotate-90" />
                <span>+91 9244321195</span>
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Product Categories
            </h2>
            <ul className="space-y-4">
              {isLoading ? (
                <li className="text-gray-500">Loading categories...</li>
              ) : categories.length > 0 ? (
                categories.slice(0, 5).map((category) => (
                  <li key={category._id}>
                    <Link
                      onClick={() => window.scrollTo(0, 0)}
                      to={"categories/" + category.name}
                      className="text-gray-600 transition hover:text-gray-900"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No categories found</li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Customer Service
            </h2>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 transition hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-600 transition hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={refundpolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-gray-900"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href={tandcpolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-gray-900"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href={privacypolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Contact Us
              </h2>
              <form className="flex items-center w-full max-w-sm space-x-2">
                <input
                  className="w-full px-3 py-2 text-sm placeholder-gray-400 bg-white border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  type="email"
                  placeholder="Your Email Address"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Send
                </button>
              </form>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow Us
              </h2>
              <div className="flex space-x-4">
                {[FaFacebookF, IoLogoTwitter, IoLogoInstagram, ImLinkedin2].map(
                  (Icon, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Social Media</span>
                      <Icon className="w-6 h-6" />
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-6 border-t border-gray-200">
          <p className="text-xs leading-5 text-center text-gray-500">
            &copy; {currentYear} RGS India Private Limited - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
