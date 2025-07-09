// import axiosInstance from "../../../shared/axios_API/axios";
// import { toast } from "react-toastify";

// export const sendOtpAPI = async (mobileNumber) => {
//   try {
//     const response = await axiosInstance.post('/user/login', {}, {
//       params: { phoneNumber: mobileNumber }
//     });
//     if (response?.status === 201) {
//       toast.success(response.data?.data?.message || 'OTP Sent');
//       return response.data?.data;
//     }
//   } catch (error) {
//     if (error.response?.status === 409) {
//       toast.error(error.response.data.message);
//     } else {
//       toast.error("Try Later!");
//     }
//     throw error;
//   }
// };

// export const verifyOtpAPI = async ({ userId, expireTime, mobileNumber, userOTP }) => {
//   try {
//     const response = await axiosInstance.post('/user/verify-otp', 
//       { userId, expire: expireTime },
//       { params: { phoneNumber: mobileNumber, otp: userOTP, login: true } }
//     );
//     if (response?.status === 200) {
//       toast.success(response.data?.data.message || 'OTP Verified');
//       return response.data?.data;
//     }
//   } catch (error) {
//     if (error.response?.status === 500) {
//       toast.error("Invalid OTP");
//     } else {
//       toast.error("Try Later!");
//     }
//     throw error;
//   }
// };
