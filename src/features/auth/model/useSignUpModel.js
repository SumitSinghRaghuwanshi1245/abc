// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { signUpAPI } from "../api/authSignUp";

// export const useSignUpModel = (isSignUp, handleToggle) => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [currentStep, setCurrentStep] = useState(1);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [userOTP, setUserOTP] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [termsAccepted, setTermsAccepted] = useState(false);
//     const navigate = useNavigate();

//     const [mobileNumber, setMobileNumber] = useState('');
//     const [userId, setUserId] = useState(null);
//     const [expireTime, setExpireTime] = useState(null);
//     const signupSteps = ["Mobile", "OTP", "Details"];

//     const [profile, setProfile] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         dob: '',
//         gender: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProfile((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//         setErrorMessage("");
//     };

//     const sendOtp = async () => {
//         try {
//             setLoading(true);
//             const response = await signUpAPI.sendOTP(mobileNumber);
//             if (response && response.status === 201) {
//                 setUserId(response.data?.data?.userId);
//                 setExpireTime(response.data?.data?.expire);
//                 setCurrentStep(currentStep + 1);
//                 setLoading(false);
//                 return toast.success(response.data?.data?.message || 'OTP Sent');
//             }
//         } catch (error) {
//             setLoading(false);
//             if (error.response && error.response.status === 409) {
//                 return toast.error(error.response.data.message || 'User already exists with this mobile number');
//             }
//             return toast.error("Try Later!");
//         }
//     };

//     const verifyOtp = async () => {
//         try {
//             const isTokenPresent = localStorage.removeItem("userToken");
//             if(isTokenPresent !== ""){
//                 localStorage.removeItem("userToken");
//             }
//             setLoading(true);
//             const response = await signUpAPI.verifyOTP(mobileNumber, userOTP, userId, expireTime);

//             if (response && response.status === 201) {
//                 setCurrentStep(currentStep + 1);
//                 localStorage.setItem('userToken', response.data?.data);
//                 setLoading(false);
//                 return toast.success(response.data?.data.message || 'OTP Verified');
//             }
//         } catch (error) {
//             setLoading(false);
//             if (error.response && error.response.status === 500) {
//                 return toast.error('Invalid OTP');
//             }
//             return toast.error("try later!");
//         }
//     };

//     const createProfile = async () => {
//         try {
//             setLoading(true);
//             const response = await signUpAPI.createProfile(profile);
//             if(response.status === 200){
//                 navigate("/");
//                 window.location.reload();
//                 setLoading(false);
//                 return toast.success('Profile created successfully');
//             }
//         } catch (error) {
//             if (error.response || error.response.status === 403) {
//                 return toast.error(error.response.data.message || 'User already exists with this mobile number');
//             }
//             return toast.error(error.response);
//         }
//         finally{
//             setLoading(false);
//         }
//     };

//     const handleNextStep = () => {
//         if (currentStep === 1) {
//             if (mobileNumber.length < 10) {
//                 return setErrorMessage('Please enter a valid mobile number');
//             }
//             if (!termsAccepted) {
//                 return setErrorMessage('Please accept the terms and conditions');
//             }
//             sendOtp();
//         }
//         else if (currentStep === 2) {
//             if (userOTP.length < 6) {
//                 return setErrorMessage('Please enter a 6 digit OTP');
//             }
//             verifyOtp();
//         }
//         else if (currentStep === 3) {
//             if (!profile.firstName.trim()) {
//                 return setErrorMessage('Please enter your first name');
//             }
//             else if (!profile.lastName.trim()) {
//                 return setErrorMessage('Please enter your last name');
//             }
//             else if (!profile.email.trim()) {
//                 return setErrorMessage('Please enter your email');
//             }
//             else if (!profile.gender.trim()) {
//                 return setErrorMessage('Please select gender');
//             }
//             else if (!profile.dob.trim()) {
//                 return setErrorMessage('Please enter date of birth');
//             }
//             const today = new Date();
//             const minDate = new Date();
//             minDate.setFullYear(minDate.getFullYear() - 100);
    
//             const userDob = new Date(profile?.dob);
        
//             if (userDob > today || userDob < minDate) {
//               toast.error("Enter correct date of birth... ");
//               return;
//             }
//             createProfile();
//         }
//     };

//     const handleChangeOtp = (e, index) => {
//         const value = e.target.value;
//         if (value.match(/[^0-9]/)) return;
//         const newOTP = userOTP.split("");
//         newOTP[index] = value;
//         setUserOTP(newOTP.join(""));
//         setErrorMessage("");
//         if (value && index < 5) {
//             document.getElementById(`otp-input-${index + 1}`).focus();
//         }
//     };

//     const handleKeyDown = (e, index) => {
//         if (e.key === "Backspace") {
//             const otpArray = userOTP.split("");
//             if (otpArray[index]) {
//                 otpArray[index] = "";
//                 setUserOTP(otpArray.join(""));
//             } else if (index > 0) {
//                 document.getElementById(`otp-input-${index - 1}`).focus();
//             }
//         } else if (e.key === "Enter" && userOTP.length === 6) {
//             handleNextStep();
//         }
//     };

//     // Global keydown handler for the entire component
//     useEffect(() => {
//         const handleGlobalKeyDown = (e) => {
//             // Only handle Enter key
//             if (e.key === 'Enter') {
//                 // Prevent default form submission
//                 e.preventDefault();
                
//                 // Check which step we're on and validate before proceeding
//                 if (currentStep === 1) {
//                     if (mobileNumber.length === 10 && termsAccepted && !loading) {
//                         handleNextStep();
//                     }
//                 } else if (currentStep === 2) {
//                     if (userOTP.length === 6 && !loading) {
//                         handleNextStep();
//                     }
//                 } else if (currentStep === 3) {
//                     if (!loading) {
//                         handleNextStep();
//                     }
//                 }
//             }
//         };

//         // Add event listener to document
//         document.addEventListener('keydown', handleGlobalKeyDown);

//         // Clean up the event listener when component unmounts
//         return () => {
//             document.removeEventListener('keydown', handleGlobalKeyDown);
//         };
//     }, [currentStep, mobileNumber, termsAccepted, userOTP, loading]);

//     // Handle tab navigation in profile details form
//     const handleProfileInputKeyDown = (e) => {
//         if (e.key === "Tab") {
//             // Let the default tab behavior work
//             return;
//         } else if (e.key === "Enter") {
//             // Prevent default to avoid form submission
//             e.preventDefault();
//         }
//     };

//     return {
//         // State
//         searchParams,
//         setSearchParams,
//         currentStep,
//         errorMessage,
//         userOTP,
//         loading,
//         termsAccepted,
//         setTermsAccepted,
//         mobileNumber,
//         setMobileNumber,
//         userId,
//         expireTime,
//         signupSteps,
//         profile,
        
//         // Functions
//         handleChange,
//         handleNextStep,
//         handleChangeOtp,
//         handleKeyDown,
//         handleProfileInputKeyDown,
//         setErrorMessage,
        
//         // Props passed through
//         isSignUp,
//         handleToggle
//     };
// };