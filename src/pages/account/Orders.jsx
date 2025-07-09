import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderDetail from "./OrderDetail";
import  { useOrderStore } from "../../app/providers/zustandStoreApi";
import { Package, ArrowLeft, Calendar, CreditCard, Truck } from "lucide-react";

const Orders = () => {
  const { userOrder, isLoading, error, fetchUserOrder } = useOrderStore();
  const [productDetail, setProductDetail] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const showDetail = searchParams.get("showDetail") === "true";

  useEffect(() => {
    fetchUserOrder();
  }, [fetchUserOrder]);

  const handleViewDetails = (product) => {
    setSearchParams({ section: "orders", showDetail: "true" });
    setProductDetail(product);
  };

  const handleBackToOrders = () => {
    setSearchParams({ section: "orders" });
  };

  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toLowerCase() || "";
    
    if (normalizedStatus.includes("delivered")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
          {status}
        </span>
      );
    }
    
    if (normalizedStatus.includes("shipped")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
          {status}
        </span>
      );
    }
    
    if (normalizedStatus.includes("cancelled")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
          {status}
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></span>
        {status || "Processing"}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-medium text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center w-16 h-16 mb-4 text-red-600 bg-red-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Something went wrong</h3>
        <p className="mt-2 text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-[70vh] bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {!showDetail ? (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">My Orders</h2>
          </div>
          
          {/* Table Header - Desktop only */}
          <div className="hidden px-6 py-3 border-b border-gray-200 md:flex bg-gray-50">
            <div className="w-5/12 text-xs font-medium tracking-wider text-gray-500 uppercase">Order Details</div>
            <div className="w-2/12 text-xs font-medium tracking-wider text-gray-500 uppercase">Date</div>
            <div className="w-2/12 text-xs font-medium tracking-wider text-gray-500 uppercase">Amount</div>
            <div className="w-2/12 text-xs font-medium tracking-wider text-gray-500 uppercase">Status</div>
            <div className="w-1/12 text-xs font-medium tracking-wider text-gray-500 uppercase"></div>
          </div>
          
          {/* Order List */}
          <div className="flex-1 overflow-y-auto orders-scroll-custom">
            {userOrder.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {userOrder.slice(0, 10).map((product, index) => {
                  const orderId = product?._id || product?.order?._id;
                  const orderDate = product?.orderDate || product?.OrderDate || product?.order?.orderDate || product?.order?.OrderDate;
                  const totalAmount = product?.totalAmount || product?.TotalAmount || product?.order?.totalAmount || product?.order?.TotalAmount;
                  const status = product?.status || product?.Status || product?.order?.status || product?.order?.Status || "Processing";

                  return (
                    <div key={index} className="hover:bg-gray-50">
                      {/* Mobile View */}
                      <div className="p-4 space-y-3 md:hidden">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Package size={16} className="text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-xs text-gray-500">Order ID</p>
                              <p className="text-sm font-medium text-gray-900">{orderId.substring(0, 8)}...</p>
                            </div>
                          </div>
                          {getStatusBadge(status)}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="ml-2 text-sm text-gray-600">{orderDate}</span>
                          </div>
                          <div className="flex items-center">
                            <CreditCard size={16} className="text-gray-400" />
                            <span className="ml-2 text-sm font-medium text-gray-900">₹{totalAmount}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-blue-600 transition-colors bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                        >
                          View Details
                        </button>
                      </div>
                      
                      {/* Desktop View */}
                      <div className="items-center hidden px-6 py-4 md:flex">
                        <div className="flex items-center w-5/12">
                          <div className="p-2 mr-4 bg-blue-100 rounded-full">
                            <Package size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Order #{orderId.substring(0, 8)}...</p>
                            <p className="text-xs text-gray-500">{orderId}</p>
                          </div>
                        </div>
                        <div className="w-2/12 text-sm text-gray-600">{orderDate}</div>
                        <div className="w-2/12 text-sm font-medium text-gray-900">₹{totalAmount}</div>
                        <div className="w-2/12">{getStatusBadge(status)}</div>
                        <div className="flex justify-end w-1/12">
                          <button
                            onClick={() => handleViewDetails(product)}
                            className="inline-flex items-center px-3 py-1.5 border border-blue-600 rounded-md text-xs font-medium text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full px-4 py-12 text-center">
                <div className="p-4 mb-4 bg-gray-100 rounded-full">
                  <Truck size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                <p className="max-w-md mt-2 text-sm text-gray-500">
                  Looks like you haven't placed any orders yet. When you do, they'll appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center px-6 py-4 bg-white border-b border-gray-200">
            <button
              onClick={handleBackToOrders}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Back to Orders
            </button>
            <h2 className="ml-4 text-lg font-semibold text-gray-800">Order Details</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <OrderDetail product={productDetail} onBack={handleBackToOrders} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;