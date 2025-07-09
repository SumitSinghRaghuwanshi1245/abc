// -------------------- PACKAGE IMPORT FILES -------------------- //
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Package, ArrowRight } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { Button } from "../shared/ui/button";

const OrderSuccessPlaced = () => {
  const orderId = "1234567890"; // Dummy Order ID
  const navigate = useNavigate();

  const handleViewOrder = () => {
    navigate(`/account?section=orders`);
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const successCheckVariants = {
    hidden: { 
      scale: 0,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        duration: 0.8 
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex items-center justify-center px-4 py-16 bg-gradient-to-br from-blue-50 to-indigo-50 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-md overflow-hidden bg-white shadow-xl rounded-xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {orderId ? (
          <div className="flex flex-col items-center">
            <div className="w-full py-8 bg-gradient-to-r from-green-400 to-emerald-500">
              <div className="relative w-24 h-24 mx-auto">
                <motion.div
                  className="absolute inset-0 bg-white rounded-full bg-opacity-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2,
                    repeatDelay: 0.5
                  }}
                />
                
                <motion.div 
                  className="flex items-center justify-center w-full h-full bg-white rounded-full"
                  variants={successCheckVariants}
                >
                  <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2} />
                </motion.div>
              </div>
            </div>

            <div className="px-6 py-8">
              <motion.div variants={itemVariants} className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">Order Placed!</h1>
                <p className="mb-6 text-gray-600">
                  Thank you for your purchase. We're preparing your order for delivery.
                </p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="p-4 mb-6 rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Ordered On</span>
                  <span className="text-xs font-bold text-right text-indigo-600">{Date(Date.now())}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <span className="flex items-center text-sm font-medium text-emerald-600">
                    <span className="w-2 h-2 mr-1 rounded-full bg-emerald-500"></span>
                    Confirmed
                  </span>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col space-y-3"
              >
                <Button 
                  onClick={handleViewOrder} 
                  className="flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Package size={18} />
                  View Order Details
                </Button>
                
                <Button 
                  onClick={handleContinueShopping} 
                  variant="outline"
                  className="flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <ShoppingBag size={18} />
                  Continue Shopping
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full py-8 bg-gradient-to-r from-red-400 to-red-500">
              <div className="relative w-24 h-24 mx-auto">
                <motion.div
                  className="flex items-center justify-center w-full h-full bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-16 h-16 text-red-500" 
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </motion.div>
              </div>
            </div>

            <div className="px-6 py-8">
              <motion.div variants={itemVariants} className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">Transaction Failed</h1>
                <p className="mb-6 text-gray-600">
                  We couldn't process your payment. Please try placing your order again.
                </p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col space-y-3"
              >
                <Button 
                  onClick={handleContinueShopping} 
                  className="flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ShoppingBag size={18} />
                  Return to Shop
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrderSuccessPlaced;