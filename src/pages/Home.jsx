import AdCarousel from "../widgets/AdCarousel.jsx";
import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "../widgets/max-width-wrapper";
import {
  fetchCategories,
  fetchProductsByMultipleCategories,
  fetchRecommendedProducts,
} from "../shared/API_Calls/index.js";
import ProductCarousel from "../widgets/productDisplayCarousel";
import Features from "../widgets/Features.jsx";
import ShowCategory from "../widgets/ShowCategory.jsx";
import CTA from "../widgets/CTA.jsx";
import { SkeletonLoading } from "../widgets/skeletons/HomeSkeleton.jsx";
import AdsCard from "../widgets/AdsCard.jsx";

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([])

  const getBatchOfCategories = (categories) => {
    const totalbatchs = Math.ceil(categories.length / 4)
    const batches = []
    for (let i = 0; i < totalbatchs; i++) {
      batches.push(categories.slice(i * 4, (i + 1) * 4))
    }
    return batches
  }

  const fetchProducts = async (batchesOfCategories) => {
    try {
      for (const batch of batchesOfCategories) {
        const response = await fetchProductsByMultipleCategories(batch);
        const productList = {};

        for (const item of response.data) {
          productList[item.products[0].category] = item.products;
        }

        setProductsByCategory((prev) => ({
          ...prev,
          ...productList
        }));
      }
    } catch (error) {
      console.log("Error during fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetchCategories();
      const Categories = response.map(category => {
        return category.title
      })

      setCategories(Categories)
      const Batches = getBatchOfCategories(Categories)
      fetchProducts(Batches)
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  const fetchRecommendedProductsForUser = async (userId) => {
    try {
      const recommendedProducts = await fetchRecommendedProducts(userId);
      const productList = {};

      recommendedProducts.forEach((product) => {
        if (product.category) {
          if (!productList[product.category]) {
            productList[product.category] = [];
          }
          productList[product.category].push(product);
        }
      });

      setProductsByCategory((prev) => ({
        ...prev,
        ...productList
      }));
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    }}

  useEffect(() => {
    fetchAllCategories()
    fetchRecommendedProductsForUser()
  }, []);

  return (
    <MaxWidthWrapper className="h-full pt-0 pb-4">
      <div className="mx-auto max-w-8xl">
        {/* <AdCarousel /> */}
        <AdsCard />
        <ShowCategory />
       
        {isLoading ? (
          <SkeletonLoading />
        ) :
          (

            // Object.keys(productsByCategory).map((recommendedProducts, index) => (
            //   <ProductCarousel
            //     key={index}
            //     title={recommendedProducts}
            //     products={recommendedProducts}
            //     category={recommendedProducts}
            //     />))
            
            
            Object.keys(productsByCategory).map((category, index) => (
              <ProductCarousel
                key={index}
                title={category}
                products={productsByCategory[category]}
                category={category}     
              />
            )
            )
          )
        }
  
        <CTA />
        <Features />
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;