// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Link } from "react-router-dom";
import React from 'react'

// -------------------- OTHER IMPORT FILES -------------------- //
import { Motion } from "./motion"
import { Button } from "../shared/ui/button";

const CTA = () => {
  return (
    <>
      <Motion direction="up" duration={1.8}>
        <div className="w-full mx-auto mt-12 max-w-8xl">
          <section className="px-6 py-12 rounded-lg bg-primary lg:px-12">
            <div className="mx-auto text-center max-w-7xl">
              <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                Get Fresh Groceries Delivered to Your Doorstep
              </h2>
              <p className="mb-8 text-lg text-white lg:text-xl">
                Shop from a wide range of daily needs, package food, and
                everyday essentials. Fast delivery within hours!
              </p>
              <div className="flex flex-col justify-center gap-4 md:flex-row">
                <Button
                  aschild="true"
                  variant="secondary"
                  className="px-6 py-4 text-lg font-semibold transition duration-300 rounded-md hover:scale-105 text-primary hover:bg-secondary/80"
                >
                  <Link to="/deals">Shop Now</Link>
                </Button>
                <Button
                  aschild="true"
                  variant="outline"
                  className="px-6 py-4 text-lg font-semibold text-white transition duration-300 bg-transparent border-2 border-white rounded-md hover:scale-105"
                >
                  <Link to="/login">Sign Up & Save</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Motion>
    </>
  )
}

export default CTA