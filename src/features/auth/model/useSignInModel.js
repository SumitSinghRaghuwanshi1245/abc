// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { sendOtpAPI, verifyOtpAPI } from "../api/authSignIn";

// export const useSignInModel = ({ isSignUp, setSearchParams }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [userOTP, setUserOTP] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [expireTime, setExpireTime] = useState(null);
//   const loginSteps = ["Mobile", "OTP Verification"];

//   useEffect(() => {
//     const handleGlobalKeyDown = (e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         if (currentStep === 1 && mobileNumber.length === 10 && termsAccepted && !loading) {
//           handleNextStep();
//         } else if (currentStep === 2 && userOTP.length === 6 && !loading) {
//           handleNextStep();
//         }
//       }
//     };
//     document.addEventListener("keydown", handleGlobalKeyDown);
//     return () => document.removeEventListener("keydown", handleGlobalKeyDown);
//   }, [currentStep, mobileNumber, termsAccepted, userOTP, loading]);

//   const sendOtp = async () => {
//     try {
//       setLoading(true);
//       const response = await sendOtpAPI(mobileNumber);
//       if (response?.status === 201) {
//         setUserId(response.data?.data?.userId);
//         setExpireTime(response.data?.data?.expire);
//         setCurrentStep(currentStep + 1);
//         toast.success(response.data?.data?.message || "OTP Sent");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Try Later!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       setLoading(true);
//       const response = await verifyOtpAPI({ userId, expireTime, mobileNumber, userOTP });
//       if (response?.status === 200) {
//         setCurrentStep(currentStep + 1);
//         localStorage.setItem("userToken", response.data?.data);
//         toast.success(response.data?.data?.message || "OTP Verified");
//         window.location.href = "/";
//       }
//     } catch (error) {
//       toast.error(error.response?.status === 500 ? "Invalid OTP" : "Try Later!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNextStep = () => {
//     if (currentStep === 1) {
//       if (mobileNumber.length < 10) return setErrorMessage("Please enter a valid mobile number");
//       if (!termsAccepted) return setErrorMessage("Please accept the terms and conditions");
//       sendOtp();
//     } else if (currentStep === 2) {
//       if (userOTP.length < 6) return setErrorMessage("Please enter a 6 digit OTP");
//       verifyOtp();
//     }
//   };

//   const handleChangeOtp = (e, index) => {
//     const value = e.target.value;
//     if (value.match(/[^0-9]/)) return;
//     const newOTP = userOTP.split("");
//     newOTP[index] = value;
//     setUserOTP(newOTP.join(""));
//     setErrorMessage("");
//     if (value && index < 5) document.getElementById(`otp-input-${index + 1}`).focus();
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const otpArray = userOTP.split("");
//       if (otpArray[index]) {
//         otpArray[index] = "";
//         setUserOTP(otpArray.join(""));
//       } else if (index > 0) {
//         document.getElementById(`otp-input-${index - 1}`).focus();
//       }
//     }
//   };

//   return {
//     currentStep,
//     errorMessage,
//     userOTP,
//     loading,
//     termsAccepted,
//     mobileNumber,
//     loginSteps,
//     setTermsAccepted,
//     setMobileNumber,
//     setErrorMessage,
//     setSearchParams,
//     handleNextStep,
//     handleChangeOtp,
//     handleKeyDown,
//   };
// };
