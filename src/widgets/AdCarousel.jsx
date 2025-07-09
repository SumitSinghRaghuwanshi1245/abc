// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from 'react'

// -------------------- OTHER IMPORT FILES -------------------- //
import rgsbanner1 from "../shared/assets/rgsbannerlatest.png";

const AdCarousel = () => {
  return (
    <div className="mt-4 md:mt-4 sm:mt-14">
  <div className="relative w-full h-40 overflow-hidden rounded-xl">
    <img
      src={rgsbanner1}
      alt="RGS Banner"
      className="absolute inset-0 object-cover w-full h-full rounded-xl"
    />
  </div>
</div>
  );
};

export default AdCarousel