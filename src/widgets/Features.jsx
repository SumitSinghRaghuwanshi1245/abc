// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from 'react'
import { FileText, Shield, Star, Truck } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { Motion } from "./motion";

const Feature = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col items-center text-center space-y-4 p-1 md:flex-row md:items-center md:space-x-4 md:space-y-0 md:text-left">

    <div className="relative flex items-center justify-center md:hidden">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
        <Icon className="size-8 md:size-10 text-purple-600" />
      </div>
    </div>
    <div className="flex w-full max-w-full flex-col md:text-right">
      <h3 className="mb-2 text-xs md:text-sm text-black font-semibold">{title}</h3>
      <p className="text-xs text-gray-600">{subtitle}</p>
    </div>
    <div className="relative hidden items-center justify-center md:flex">
      <div className="flex h-16 w-16 items-center justify-center">
        <Icon className="size-10 text-purple-600" />
      </div>
    </div>
  </div>
);

const Features = () => {

  const features = [
    {
      icon: Truck,
      title: "Delivery in 4 hours",
      subtitle:
        "Fast delivery with active customer support.",
    },
    {
      icon: Shield,
      title: "Quality assurance",
      subtitle:
        "Guaranteed quality, or your money back.",
    },
    {
      icon: Star,
      title: "New stocks and sales",
      subtitle:
        "Fresh arrivals, handy deals on-the-go.",
    },
    {
      icon: FileText,
      title: "Payment only online",
      subtitle:
        "Secure online & cash on delivery payments, hassle-free.",
    },
  ];

  return (
    <Motion direction="up" duration={1.8}>
      <div className="mx-auto mt-12 w-full max-w-8xl pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </Motion>
  )
}

export default Features