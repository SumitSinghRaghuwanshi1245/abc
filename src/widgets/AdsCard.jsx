import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import frame1 from "../shared/assets/frame1.png";
import frame2 from "../shared/assets/frame2.png";  
import frame3 from "../shared/assets/frame3.png";
import frame4 from "../shared/assets/frame4.png";

const AdsCard = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide interval (4 seconds)
  const SLIDE_INTERVAL = 4000;

  const ads = [
    
    { 
      id: 3, 
      image: frame3, 
      alt: "Oil and ghee", 
      link: "/categories/Oil%20And%20Ghee" 
    },
    { 
      id: 2, 
      image: frame2, 
      alt: "Medical Essentials", 
      link: "/categories/Medication%20Essentials" 
    },
    { 
      id: 4, 
      image: frame4, 
      alt: "Spices", 
      link: "/categories/Spices" 
    },
    { 
      id: 1, 
      image: frame1, 
      alt: "Oral wellness care", 
      link: "/categories/Oral%20Wellness%20Care" 
    },
  ];

  // Check if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Auto-slide functionality for mobile only
  useEffect(() => {
    let interval;
    
    if (isMobile) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, SLIDE_INTERVAL);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile, ads.length]);

  // Handle touch events for manual scrolling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;
    
    // If swipe distance is significant enough (more than 50px)
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        // Swipe left - go to next slide
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      } else {
        // Swipe right - go to previous slide
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? ads.length - 1 : prevIndex - 1));
      }
    }
  };

  // Go to a specific slide
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="mt-6">
      {isMobile ? (
        // Mobile view - Carousel
        <div className="relative w-full mb-6">
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="w-full overflow-hidden rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-[740/418] cursor-pointer"
              onClick={() => navigate(ads[currentIndex].link)}
            >
              <img
                src={ads[currentIndex].image}
                alt={ads[currentIndex].alt}
                className="object-cover w-full h-full rounded-xl"
              />
            </motion.div>
          </div>
          
          {/* Dots/Indicators */}
          <div className="flex justify-center mt-4">
            {ads.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`mx-1 h-2 w-2 rounded-full cursor-pointer ${
                  slideIndex === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Desktop view - Grid layout
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ads.map((ad) => (
            <motion.div 
              key={ad.id}
              variants={itemVariants}
              className="relative w-full aspect-[740/418] overflow-hidden rounded-xl cursor-pointer"
              onClick={() => navigate(ad.link)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={ad.image}
                alt={ad.alt}
                className="absolute inset-0 object-cover w-full h-full rounded-xl"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdsCard;