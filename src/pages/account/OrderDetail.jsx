import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FiPackage, 
  FiCalendar, 
  FiMapPin, 
  FiShoppingBag, 
  FiDownload
} from 'react-icons/fi';

const scrollbarStyles = `
  /* Custom Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #2563eb;
  }
  
  /* Firefox scrollbar styling */
  * {
    scrollbar-width: thin;
    scrollbar-color: #3b82f6 #f1f5f9;
  }
`;

function OrderDetail(props) {

  const navigate = useNavigate();
  const getOrderStatusColor = (status) => {
    switch(status) {
      case "Order Placed": return "text-blue-600";
      case "Order Accepted": return "text-teal-600";
      case "Order Processed": return "text-indigo-600";
      case "Order Shipped": return "text-purple-600";
      case "Order Delivered": return "text-green-600";
      case "Order Completed": return "text-emerald-600";
      case "User Dropped":
      case "User Cancelled":
      case "Order Cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case "Completed": return "text-green-600";
      case "Pending": return "text-yellow-600";
      case "Failed": return "text-red-600";
      case "Cancelled": return "text-gray-600";
      case "Refunded": return "text-blue-600";
      case "Disputed": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  useEffect(() => {
    if (props.product === undefined) {
      navigate("/account?section=orders");
    }
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = scrollbarStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [props.product, navigate]);
  {console.log(props)}
  const orderStatus = props?.product?.Status || props?.product?.status || props?.product?.order?.Status || props?.product?.order?.status;
  const paymentStatus = props?.product?.orderPayment || props?.product?.order?.orderPayment;
  const orderMode = props?.product?.orderMode || props?.product?.order?.orderMode;
  const orderDate = props?.product?.OrderDate || props?.product?.orderDate || props?.product?.order?.OrderDate || props?.product?.order?.orderDate;
  const orderId = props?.product?._id || props?.product?.order?._id;
  const totalAmount = props?.product?.TotalAmount || props?.product?.totalAmount || props?.product?.order?.TotalAmount || props?.product?.order?.totalAmount;
  const products = props?.product?.productDetail || props?.product?.ProductDetail || props?.product?.order?.productDetail || props?.product?.order?.ProductDetail || [];
  const address = props?.product?.Address || props?.product?.address || {};
  const InvoiceUrl = props?.product?.order?.receiptUrl || null;
  

  
  return (
    <div className="bg-white min-h-screen p-4 md:p-6 lg:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="border-b pb-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FiPackage className="text-blue-500" />
                Order Details
              </h1>
              <p className="text-gray-600 mt-1">
                Order ID: {orderId?.substring(0, 12)}
              </p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center gap-2 text-gray-600">
              <FiCalendar /> 
              <span>{orderDate}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="font-semibold text-lg mb-4 text-gray-800">Order Status</h2>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${getOrderStatusColor(orderStatus)}`}>
                {orderStatus}
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-4 text-gray-800">Payment Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className={`font-medium ${getPaymentStatusColor(paymentStatus)}`}>
                  {paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{orderMode}</span>
              </div>
              <div className="flex justify-between pt-2 border-t mt-2">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-semibold">₹ {totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
            <FiMapPin className="text-blue-500" />
            Delivery Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 text-gray-700 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Area:</span>
              <span>{address?.Area || address?.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Location:</span>
              <span>
          {props?.product?.Address?.Locality}
        </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">City:</span>
              <span>{address?.City || address?.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">State:</span>
              <span>{address?.State || address?.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Pincode:</span>
              <span>{address?.Pincode || address?.pincode}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
            <FiShoppingBag className="text-blue-500" />
            Ordered Products
          </h2>
          {console.log(products)}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row border rounded-md p-4"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={product?.productId?.productImageUrl || product?.ProductId?.productImageUrl}
                    alt={product?.productId?.productImageName || product?.ProductId?.productImageName}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-grow sm:ml-4 mt-3 sm:mt-0">
                  <h3 className="font-medium text-gray-800">
                    {product?.productId?.name || product?.ProductId?.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 mt-2 text-sm text-gray-600">
                    <div>
                      Price: ₹{product?.ProductId?.sellingPrice * product?.ProductQuantity || 
                              product?.productId?.sellingPrice * product?.productQuantity}
                    </div>
                    <div>
                      Quantity: {product?.ProductQuantity || product?.productQuantity}
                    </div>
                    <div className="col-span-2 mt-1">
                      Category: {product?.productId?.category || product?.ProductId?.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8 overflow-x-auto">
          <h2 className="font-semibold text-lg mb-4 text-gray-800">Order Timeline</h2>
          <div className="relative flex min-w-max items-center pb-2">
            <div className="absolute left-0 top-5 h-0.5 w-full bg-gray-200"></div>
            {['Order Placed', 'Order Processed', 'Order Shipped', 'Order Delivered'].map((step, index) => (
              <div key={index} className="relative flex flex-col items-center mx-4 first:ml-0 last:mr-0">
                <div className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                  orderStatus === step ? 'bg-blue-500' : 
                  index === 0 || (index <= ['Order Placed', 'Order Processed', 'Order Shipped', 'Order Delivered'].indexOf(orderStatus)) 
                  ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
                <span className="mt-2 text-center text-xs font-medium text-gray-700 max-w-20">{step}</span>
              </div>
            ))}
          </div>
        </div>
        {(InvoiceUrl!=null)&&(<>
          <div className="text-center border-t pt-6">
          <a
  href={InvoiceUrl}
  download
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-2 w-fit bg-blue-500 text-white font-medium rounded flex items-center justify-center mx-auto gap-2 hover:bg-blue-600 transition"
>
  <FiDownload />
  Download Invoice
</a>

</div>

        </>)}
    
      </div>
    </div>
  );
}

export default OrderDetail;
