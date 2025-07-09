// -------------------- PACKAGE IMPORT FILES -------------------- //
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CreditCard, Loader2, ShoppingBag, X, } from "lucide-react";
import { useLocation } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import axios from "../shared/axios_API/axios";
import { Button } from "../shared/ui/button";
import { cartStorage } from "../features/cart/model/cartStorage";
import { Skeleton } from "../shared/ui/skeleton";
import { cn, formatPrice } from "../shared/lib/utils";
import { useUserContext } from "../shared/context/UserContext";
import MaxWidthWrapper from "../widgets/max-width-wrapper";
import axiosInstance from "../shared/axios_API/axios";
const Checkout = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [store, setStore] = useState("");
  const [address, setAddress] = useState("");
  const [allStore, setAllStore] = useState([]);
  const [allAddress, setAllAddress] = useState([]);
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentInitiateData, setPaymentInitiateData] = useState(null);

  const getStorageLocation = async () => {
    try {
      const response = await axios.get("/store/get-all-shop-details");
      const allStores = response.data.data;
      const citiesJson = localStorage.getItem('userCities');
      if (!citiesJson) {
        setAllStore(allStores);
        return;
      }
      const userCities = JSON.parse(citiesJson);
      if (!userCities || userCities.length === 0) {
        setAllStore(allStores);
        return;
      }
      const lowerCaseUserCities = userCities.map(city => city.toLowerCase());
      const filteredStores = allStores.filter(store => {
        const storeCity = store?.shop_details?.shop_address?.city;
        return storeCity && lowerCaseUserCities.includes(storeCity.toLowerCase());
      });
      setAllStore(filteredStores);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/checkout");
      } else {
        toast.error(error.response?.data?.message || error);
      }
    }
  };
  const queryParams = new URLSearchParams(location.search);

  const productId = queryParams.get("id");
  const quantity = queryParams.get("quantity");
  useEffect(() => {
    if(productId == undefined){
      setItems(cartStorage.getItems());
    }
    getStorageLocation()
    setIsMounted(true);
  }, []);

 const getSingleProduct = async()=>{
  try {
    const response = await axiosInstance.get(`/product/get-single?id=${productId}`);
    console.log()
    if(response?.data?.data){
      const productWithQuantity = {
        ...response.data.data,
        quantity: quantity
      };
      setItems([productWithQuantity])
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "they have some error try later");
  }
 }

 useEffect(()=>{
   if(productId!=undefined){
    getSingleProduct();
  }
 },[productId])

  let cartTotal = items.reduce((total, item) => {
      return total + (item.sellingPrice || 0) * (Number(item.quantity) || 1);
    }, 0);
    

  
  const fee = cartTotal * 0.01;

  const removeItem = (id) => {
    cartStorage.removeItem(id);
    setItems(cartStorage.getItems());
  };

  const clearCart = () => {
    cartStorage.setItems([]);
    setItems([]);
  };

  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="p-6 text-center bg-white rounded-lg shadow-lg dark:bg-zinc-800">
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
        <p className="text-lg font-medium font-polySansMedian">
          Processing Your Order
        </p>
        <p className={cn("text-sm text-gray-500 dark:text-gray-400")}>
          Please wait while we confirm your payment and prepare your order.
        </p>
      </div>
    </motion.div>
  );

  const getUserAllAddress = async () => {
    try {
      const userAddress = await axios.get(`/user/find-address/${user.userId}`);
      setAllAddress(userAddress?.data?.data[0]?.allAddress);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/checkout")
      }
      toast.error(error.response?.data?.message || error);
    }
  }

  const handlePaymentMode = (e) => {
    setPayment(e.target.value)
  }

  const handleCheckoutCod = async () => {
    setIsLoading(true);
    setIsVerifying(true);
    const totalAmount = cartTotal + fee;
    // if (totalAmount < 50) {
    //   toast.error("Minimum order amount should be 50 Rs");
    //   setIsLoading(false);
    //   setIsVerifying(false);
    //   return;
    // }
  
    const productDetail = [];
    items.map((info) => {
      productDetail.push({ productId: info._id, productQuantity: info.quantity })
    })

    try {
      await axios.post("/user-order/create-order", { storeId: store, totalAmount, productDetail, address, orderMode: "COD" })
      toast.success("order have successfully place...")
      setIsVerifying(false);
      setIsLoading(false);
      clearCart();
      navigate('/order-successfull')
    } catch (error) {
      alert(error.response.data.message);
      setIsLoading(false);
      setIsVerifying(false);
    }
  };

  const processPayment = async (initialPaymentData) => {
    try {
      setIsVerifying(true);
      setIsLoading(true);
  
      // Step 1: Initiate Payment
      const paymentInitiationResponse = await axiosInstance.post(
        "/payment/initiate-payment",
        { data: initialPaymentData }
      );
  
      setIsVerifying(false);
      setIsLoading(false);
  
      if (paymentInitiationResponse.data.status === 0) {
        setErrorMessage("Wait a while and try again");
        return;
      }
  
      // Step 2: Create an iframe for payment
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.zIndex = "10000";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.border = "none";
      document.body.appendChild(iframe);
  
      const iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(paymentInitiationResponse.data);
      iframeDoc.close();
  
      // Step 3: Wait for Payment Response using a Promise
      const waitForPaymentResponse = () => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Payment response timeout"));
          }, 60000); // Timeout after 60 seconds
  
          const interval = setInterval(() => {
            const responseElement = iframeDoc.getElementById("response");
            if (responseElement && responseElement.innerText) {
              clearInterval(interval);
              clearTimeout(timeout);
              resolve(responseElement.innerText);
            }
          }, 500); // Check every 500ms
        });
      };
  
      try {
        const paymentResponseText = await waitForPaymentResponse();
        const paymentResponse = JSON.parse(paymentResponseText);
  
        console.log("Payment Response:", paymentResponse);
        iframe.remove();
  
        // Step 4: Store Payment Status
        await storePaymentStatus(paymentResponse);
  
        // Step 5: Update Order Status
        if (paymentResponse.status === "success") {
          const data = {
            orderPayment : "Completed",
            status : "Order Placed",
            orderMode : "Digital"
          }
          const response = await updateOrderStatus(data, paymentResponse.txnid);

          if(response.status === 200){
            toast.success("Payment Successful and Order Updated!");
            navigate("/order-successfull");
            window.scrollTo(0, 0);
            return clearCart();
          }
          
        } else if (paymentResponse.status === "userCancelled") {
          const data = {
            orderPayment : "Cancelled",
            status: "User Cancelled",
            orderMode : "Digital",
          }
          const response = await updateOrderStatus(data, paymentResponse.txnid);

          if(response.status === 200){
            return toast('user cancelled ', {
              icon: '❌',
            });
          }
        }
        else if(paymentResponse.status === "dropped"){
          const data = {
            orderPayment : "Dropped",
            status: "User Dropped",
            orderMode : "Digital",
          }
          const response = await updateOrderStatus(data, paymentResponse.txnid);
          
          if(response.status === 200){
            toast('user dropped ', {
              icon: '🥺',
            });
          }

        }
      } catch (error) {
        console.error("Error waiting for payment response:", error);
        toast.error("Error processing payment response.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      setErrorMessage("An error occurred during payment initiation.");
    }
  };
  
  // Updated helper functions with async keyword
  const storePaymentStatus = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/payment/saved-payment-response",
        data,
        { params: { userId: user?.userId } }
      );
  
      if (response) {
        toast.success("Payment status stored!");
      }
    } catch (error) {
      console.error("Error storing payment status:", error);
    }
  };
  
  const updateOrderStatus = async (data, txnid) => {
    try {
      const response = await axiosInstance.patch(`/user-order/update-order-status/${txnid}`, data);
      if (response) {
        console.log("Order status updated!");
      }

      return response;
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleCheckoutOnline = async () => {

    const totalAmount = cartTotal + fee;
    // if (totalAmount < 50) {
    //   toast.error("Minimum order amount should be 50 Rs");
    //   setIsLoading(false);
    //   setIsVerifying(false);
    //   return;
    // }
  
    const productDetail = [];
    items.map((info) => {
      productDetail.push({ productId: info._id, productQuantity: info.quantity })
    })

    if (!store) {
      return setErrorMessage("please select the store!");
    }

    try {
      setIsLoading(true);
      setIsVerifying(true);

      if (!user || !user.phoneNumber) {
        return setErrorMessage("wait a while")
      }
      
      const createdOrder = await axios.post("/user-order/create-order", { storeId: store, totalAmount, productDetail, address, orderMode:"Digital" })
      console.log(createdOrder)
    
      if (createdOrder.status === 201) {
        const data = {
          txnid: createdOrder.data?.data?._id,
          amount: `${totalAmount}`,
          name: `${user.firstName || user.FirstName}`,
          email: `${user.email || user.Email}`,
          phone: user.phoneNumber.toString(),
          productinfo: createdOrder.data?.data?._id,
          surl: "http://localhost:3000/response",
          furl: "http://localhost:3000/response",
          udf1: "",
          udf2: "",
          udf3: "",
          udf4: "",
          udf5: "",
          addressId: createdOrder.data?.data?.address,
          address2: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
          sub_merchant_id: "",
          unique_id: "",
          split_payments: "",
          customer_authentication_id: "",
          udf6: "",
          udf7: "",
          udf8: "",
          udf9: "",
          udf10: ""
        }
        setPaymentInitiateData(data);
        processPayment(data);
      } 

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong");
      setIsLoading(false);
      setIsVerifying(false);
    }

  };
console.log(items)
  useEffect(() => {
    getUserAllAddress();
  }, [])

  if(!user){
    navigate("/signup")
  }

  return (
      <MaxWidthWrapper className="px-3 pt-8 selection:bg-teal-500/30">
        <div className="relative h-full">
          <div className="max-w-2xl pb-24 mx-auto sm:pt-0 lg:max-w-7xl lg:pt-8">
            <div className="flex flex-col items-center mb-8">
              <h2 className="mb-6 text-xl font-bold md:text-2xl text-zinc-900 dark:text-zinc-100">
                Checkout
              </h2>
              
              <div className="flex items-center justify-between w-full max-w-3xl">
                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className={`rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ${
                    step >= 1 ? "bg-green-500" : "bg-gray-200"
                  }`}>
                    {step >= 1 ? (
                      <CheckCircle className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                    ) : (
                      <span className="font-semibold text-gray-500">1</span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm text-center font-medium ${
                    step >= 1 ? "text-gray-900" : "text-gray-400"
                  }`}>
                    Review Order
                  </span>
                </div>
                
                {/* Connector */}
                <div className={`h-1 flex-1 -mx-2 ${step >= 1 ? "bg-green-500" : "bg-gray-200"}`}></div>
                
                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className={`rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ${
                    step >= 2 ? "bg-green-500" : "bg-gray-200"
                  }`}>
                    {step >= 2 ? (
                      <CheckCircle className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                    ) : (
                      <span className="font-semibold text-gray-500">2</span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm text-center font-medium ${
                    step >= 2 ? "text-gray-900" : "text-gray-400"
                  }`}>
                    Order Summary
                  </span>
                </div>
                
                {/* Connector */}
                <div className={`h-1 flex-1 -mx-2 ${step >= 2 ? "bg-green-500" : "bg-gray-200"}`}></div>
                
                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className={`rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ${
                    step === 3 ? "bg-green-500" : "bg-gray-200"
                  }`}>
                    {step === 3 ? (
                      <CheckCircle className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                    ) : (
                      <span className="font-semibold text-gray-500">3</span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs sm:text-sm text-center font-medium ${
                    step === 3 ? "text-gray-900" : "text-gray-400"
                  }`}>
                    Payment
                  </span>
                </div>
              </div>
            </div>
    
            <div className="h-full mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
              {/* Cart Items Section */}
              <div className={cn("lg:col-span-7", {
                "rounded-lg border-[1.2px] border-dashed border-zinc-400 p-12 dark:border-zinc-200/30":
                  isMounted && items.length === 0,
              })}>
                <h2 className="sr-only">Items in your shopping bag</h2>
    
                {/* Empty Cart State */}
                {isMounted && items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center h-full space-y-1"
                  >
                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                    <h3 className="text-2xl font-semibold font-polySansMedian">
                      Your bag is empty
                    </h3>
                    <p className="text-center text-muted-foreground">
                      {`Looks like you haven't added anything to your bag yet.`}
                    </p>
                    <Link to="/categories">
                      <Button className="group mt-4 flex items-center justify-center gap-1.5 rounded-lg sm:w-36">
                        <span className="text-zinc-200 dark:text-zinc-300">
                          Start Shopping
                        </span>
                        <ArrowRight className="w-5 h-5 transition-all text-zinc-200 group-hover:translate-x-1 dark:text-zinc-300" />
                      </Button>
                    </Link>
                  </motion.div>
                ) : null}
    
                {/* Loading State */}
                {!isMounted && items.length === 0 ? (
                  <div className="flex flex-col py-6 space-y-4 lg:flex-row">
                    <div className="flex flex-shrink-0">
                      <div className="relative w-24 h-24">
                        <Skeleton className="w-full h-full bg-zinc-200 dark:bg-zinc-800/50" />
                      </div>
                    </div>
    
                    <div className="flex flex-col justify-between flex-1 lg:ml-4">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div className="flex flex-col justify-between space-y-2">
                          <Skeleton className="w-full h-3 bg-zinc-200 dark:bg-zinc-800/50" />
                          <Skeleton className="w-full h-3 bg-zinc-200 dark:bg-zinc-800/50" />
                          <Skeleton className="w-full h-3 bg-zinc-200 dark:bg-zinc-800/50" />
                        </div>
    
                        <div className="w-20 mt-4 sm:mt-0 sm:pr-9">
                          <div className="absolute top-0 right-0">
                            <Skeleton className="w-12 h-12 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <Skeleton className="w-full h-3 bg-zinc-200 dark:bg-zinc-800/50" />
                    </div>
                  </div>
                ) : null}
    
                {/* Step 1: Cart Items */}
                {step === 0 ? (
                  <div className="bg-white border rounded-lg shadow-sm dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Your Cart</h2>
                    </div>
                    
                    <ul className={cn("divide-y divide-zinc-200 dark:divide-zinc-800", {
                      "": isMounted && items.length > 0,
                    })}>
                      <AnimatePresence>
                        {isMounted &&
                          items.map((product) => {
                            const image = product.productImageUrl
                            return (
                              <motion.li
                                key={`${product.id}-${product.title}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex p-4 transition-colors sm:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                              >
                                <div className="flex-shrink-0">
                                  <div className="relative w-24 h-24 overflow-hidden rounded-md sm:h-32 sm:w-32">
                                    {image && (
                                      <img
                                        src={image}
                                        alt="product image"
                                        className="object-contain object-center w-full h-full md:object-cover"
                                      />
                                    )}
                                  </div>
                                </div>
    
                                <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                                  <div className="relative flex flex-col sm:flex-row sm:justify-between">
                                    <div>
                                      <h3 className="text-base font-medium text-zinc-800 dark:text-zinc-100">
                                        <Link
                                          to={`/products/${product.title.toLowerCase().replace(" ", "-")}`}
                                          className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                          {product.name || product.productImageName}
                                        </Link>
                                      </h3>
                                      <div className="flex mt-1 text-sm">
                                        <p className="text-zinc-500 dark:text-zinc-400">
                                          Category:{" "}
                                          <span className="capitalize">
                                            {product?.category?.replace("-", " ")}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-4 mt-2">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                          {formatPrice(product.sellingPrice)}
                                        </p>
                                        <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                                          <span>Qty: {product.quantity}</span>
                                        </div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                          Total: {formatPrice(product.sellingPrice * product.quantity)}
                                        </p>
                                      </div>
                                    </div>
                                    {(productId==undefined)&&(<>
                                      <div className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto sm:mt-0">
                                      <Button
                                        aria-label="remove product"
                                        onClick={() => removeItem(product._id)}
                                        variant="destructive"
                                        size="icon"
                                        className="flex items-center justify-center rounded-full size-8 md:size-8"
                                      >
                                        <X aria-hidden="true" className="size-4" />
                                      </Button>
                                    </div>
                                    </>)}            
                                  </div>
                                </div>
                              </motion.li>
                            );
                          })}
                      </AnimatePresence>
                    </ul>
                  </div>
                ) : step === 1 ? (
                  /* Step 2: Order Summary */
                  <div className="space-y-6">
                    <div className="bg-white border rounded-lg shadow-sm dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Order Summary</h2>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              Subtotal
                            </p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {isMounted ? (
                                formatPrice(cartTotal)
                              ) : (
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                              )}
                            </p>
                          </div>
    
                          <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                              <span>Transaction Fee (1%)</span>
                            </div>
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {isMounted ? (
                                formatPrice(fee)
                              ) : (
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                              )}
                            </div>
                          </div>
    
                          <div className="flex items-center justify-between pt-2 border-t-2 border-zinc-200 dark:border-zinc-700">
                            <div className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                              Order Total
                            </div>
                            <div className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                              {isMounted ? (
                                formatPrice(cartTotal + fee)
                              ) : (
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
    
                    <div className="bg-white border rounded-lg shadow-sm dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Delivery Details</h2>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="p-4 space-y-4 sm:p-6"
                      >
                        <div className="space-y-2">
                          <label htmlFor="store" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Select Store
                          </label>
                          <select 
                            id="store"
                            required 
                            onChange={(e) => setStore(e.target.value)} 
                            className="w-full p-2 bg-white border rounded-md dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Store</option>
                            {allStore.map((data, index) => (
                              <option key={index} value={data.storeId}>
                                {`${data.shop_details.shop_address.street} ${data.shop_details.shop_address.city}`}
                              </option>
                            ))}
                          </select>
                        </div>
    
                        <div className="space-y-2">
                          <label htmlFor="address" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Select Address
                          </label>
                          <select
                            id="address"
                            required
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              if (selectedValue === "addAddress") {
                                window.scrollTo(0, 0);
                                navigate("/account?section=address");
                              } else {
                                setAddress(selectedValue);
                              }
                            }}
                            className="w-full p-2 bg-white border rounded-md dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Address</option>
                            {allAddress?.length !== 0 && allAddress.map((data) => (
                              <option key={data._id} value={data._id}>
                                {data.Location} {data.Area} {data.City} {data.State} ({data.Pincode})
                              </option>
                            ))}
                            <option value="addAddress" className="text-green-500">
                              + Add New Address
                            </option>
                          </select>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  /* Step 3: Payment Options */
                  <div className="bg-white border rounded-lg shadow-sm dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Payment Method</h2>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 sm:p-6"
                    >
                      <div className="space-y-6">
                        <div className={`p-4 border rounded-lg ${payment === "online" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-zinc-200 dark:border-zinc-700"}`}>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              id="online"
                              name="payment"
                              value="online"
                              onChange={handlePaymentMode}
                              checked={payment === "online"}
                              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="ml-3">
                              <span className="block text-base font-medium text-zinc-900 dark:text-zinc-100">
                                Online Payment
                              </span>
                              <span className="block mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Pay securely with your credit/debit card or UPI
                              </span>
                            </div>
                          </label>
                        </div>
                        
                        <div className={`p-4 border rounded-lg ${payment === "cod" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-zinc-200 dark:border-zinc-700"}`}>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              id="cod"
                              name="payment"
                              value="cod"
                              onChange={handlePaymentMode}
                              checked={payment === "cod"}
                              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="ml-3">
                              <span className="block text-base font-medium text-zinc-900 dark:text-zinc-100">
                                Cash on Delivery
                              </span>
                              <span className="block mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Pay when your order is delivered
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
    
              {/* Order Summary/Cart Sidebar */}
              <div className="mt-8 lg:col-span-5 lg:mt-0">
                {step !== 0 ? (
                  <div className="sticky space-y-6 top-20">
                    {/* Mini Cart Preview */}
                    <div className="bg-white border rounded-lg shadow-sm dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
  <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Order Items</h2>
  </div>

  <div className="p-4 overflow-y-auto max-h-72 custom-scrollbar">
      {items.map((item) => (
        <div key={item._id} className="flex items-center py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
          <div className="relative flex-shrink-0 w-12 h-12">
            <img 
              src={item.productImageUrl} 
              alt={item.name || item.productImageName} 
              className="object-contain w-full h-full" 
            />
          </div>
          <div className="flex-1 ml-4">
            <h3 className="text-sm font-medium truncate text-zinc-800 dark:text-zinc-200">
              {item.name || item.productImageName}
            </h3>
            <div className="flex justify-between mt-1 text-xs text-zinc-500">
              <span>Qty: {item.quantity}</span>
              <span>{formatPrice(item.sellingPrice * item.quantity)}</span>
            </div>
          </div>
        </div>
      ))}
  </div>

  <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
    <div className="flex justify-between font-medium">
      <span>Total ({items.length} {items.length === 1 ? "item" : "items"})</span>
      <span>{formatPrice(cartTotal + fee)}</span>
    </div>
  </div>
</div>
                    <div className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:text-blue-200">
                      <h3 className="flex items-center mb-1 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Need help?
                      </h3>
                      <p>If you have any questions about your order, contact our support team.</p>
                    </div>
                  </div>
                ) : (
                  <div className="sticky top-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white border rounded-lg shadow-sm dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    >
                      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Order Summary</h2>
                      </div>
                      
                      <div className="p-4 sm:p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
                            </p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {isMounted ? formatPrice(cartTotal) : <Loader2 className="w-4 h-4 animate-spin" />}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              Transaction Fee (1%)
                            </p>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              {isMounted ? formatPrice(fee) : <Loader2 className="w-4 h-4 animate-spin" />}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                              Total
                            </p>
                            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                              {isMounted ? formatPrice(cartTotal + fee) : <Loader2 className="w-4 h-4 animate-spin" />}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
    
            {/* Navigation Buttons */}
            <div className="flex justify-between px-4 mt-8 sm:px-0">
              {step === 0 ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/')
                    window.scrollTo(0, 0)
                  }}
                  className="px-4 py-2 text-blue-600 border-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(step - 1)
                    window.scrollTo(0, 0);
                  }}
                  className="px-4 py-2 text-blue-600 border-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
              )}
              
              {step !== 2 ? (
                <Button
                  disabled={items.length === 0 || isLoading || (step === 1 && (store === "" || address === ""))}
                  onClick={() => {
                    setStep(step + 1);
                    window.scrollTo(0, 0);
                  }}
                  className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              ) : (
                <Button
                  disabled={items.length === 0 || isLoading || store === "" || address === "" || payment === ""}
                  onClick={payment === "cod" ? handleCheckoutCod : handleCheckoutOnline}
                  className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      Processing...
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    </>
                  ) : (
                    <>
                      {payment === "cod" ? "Complete Purchase" : "Pay Now"}
                      <CreditCard className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>{isVerifying && <LoadingScreen />}</AnimatePresence>
      </MaxWidthWrapper>
  );
};

export default Checkout;
