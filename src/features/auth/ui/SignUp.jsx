// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import Stepper from "../../../shared/ui/stepper";
import privacypolicy from "../../../shared/assets/privacypolicy.pdf";
import refundpolicy from "../../../shared/assets/refundpolicy.pdf";
import tandcpolicy from "../../../shared/assets/tandcpolicy.pdf";
import { Button } from "../../../shared/ui/button";
import { createAxiosInstance } from "../../../shared/axios_API/axios";
import { Card, CardFooter, CardHeader } from "../../../shared/ui/card";


function SignUp({ isSignUp, handleToggle }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [userOTP, setUserOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const [mobileNumber, setMobileNumber] = useState('');
    const [userId, setUserId] = useState(null);
    const [expireTime, setExpireTime] = useState(null);
    const signupSteps = ["Mobile", "OTP", "Details"];

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrorMessage("");
    };

    const sendOtp = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const api = createAxiosInstance(token);
            const response = await api.post('/user/register', {}, { params: { phoneNumber: mobileNumber } });
            if (response && response.status === 201) {
                setUserId(response.data?.data?.userId);
                setExpireTime(response.data?.data?.expire);
                setCurrentStep(currentStep + 1);
                setLoading(false);
                return toast.success(response.data?.data?.message || 'OTP Sent');
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 409) {
                return toast.error(error.response.data.message || 'User already exists with this mobile number');
            }
            return toast.error("Try Later!");
        }
    };

    const verifyOtp = async () => {
        try {
            const isTokenPresent = localStorage.removeItem("userToken");
            if(isTokenPresent !== ""){
                localStorage.removeItem("userToken");
            }
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const api = createAxiosInstance(token);
            const response = await api.post('/user/verify-otp',
                { userId: userId, expire: expireTime },
                { params: { phoneNumber: mobileNumber, otp: userOTP, login: false } });

            if (response && response.status === 201) {
                setCurrentStep(currentStep + 1);
                localStorage.setItem('userToken', response.data?.data);
                setLoading(false);
                return toast.success(response.data?.data.message || 'OTP Verified');
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 500) {
                return toast.error('Invalid OTP');
            }
            return toast.error("try later!");
        }
    };

    const createProfile = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const api = createAxiosInstance(token);
            const response = await api.post('/user/create-profile', profile);
            if(response.status === 200){
                navigate("/");
                window.location.reload();
                setLoading(false);
                return toast.success('Profile created successfully');
            }
        } catch (error) {
            if (error.response || error.response.status === 403) {
                return toast.error(error.response.data.message || 'User already exists with this mobile number');
            }
            return toast.error(error.response);
        }
        finally{
            setLoading(false);
        }
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (mobileNumber.length < 10) {
                return setErrorMessage('Please enter a valid mobile number');
            }
            if (!termsAccepted) {
                return setErrorMessage('Please accept the terms and conditions');
            }
            sendOtp();
        }
        else if (currentStep === 2) {
            if (userOTP.length < 6) {
                return setErrorMessage('Please enter a 6 digit OTP');
            }
            verifyOtp();
        }
        else if (currentStep === 3) {
            if (!profile.firstName.trim()) {
                return setErrorMessage('Please enter your first name');
            }
            else if (!profile.lastName.trim()) {
                return setErrorMessage('Please enter your last name');
            }
            else if (!profile.email.trim()) {
                return setErrorMessage('Please enter your email');
            }
            else if (!profile.gender.trim()) {
                return setErrorMessage('Please select gender');
            }
            else if (!profile.dob.trim()) {
                return setErrorMessage('Please enter date of birth');
            }
            const today = new Date();
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 100);

            const userDob = new Date(profile?.dob);

            if (userDob > today || userDob < minDate) {
              toast.error("Enter correct date of birth... ");
              return;
            }
            createProfile();
        }
    };

    const handleChangeOtp = (e, index) => {
        const value = e.target.value;
        if (value.match(/[^0-9]/)) return;
        const newOTP = userOTP.split("");
        newOTP[index] = value;
        setUserOTP(newOTP.join(""));
        setErrorMessage("");
        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const otpArray = userOTP.split("");
            if (otpArray[index]) {
                otpArray[index] = "";
                setUserOTP(otpArray.join(""));
            } else if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        } else if (e.key === "Enter" && userOTP.length === 6) {
            handleNextStep();
        }
    };

    // Global keydown handler for the entire component
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            // Only handle Enter key
            if (e.key === 'Enter') {
                // Prevent default form submission
                e.preventDefault();

                // Check which step we're on and validate before proceeding
                if (currentStep === 1) {
                    if (mobileNumber.length === 10 && termsAccepted && !loading) {
                        handleNextStep();
                    }
                } else if (currentStep === 2) {
                    if (userOTP.length === 6 && !loading) {
                        handleNextStep();
                    }
                } else if (currentStep === 3) {
                    if (!loading) {
                        handleNextStep();
                    }
                }
            }
        };

        // Add event listener to document
        document.addEventListener('keydown', handleGlobalKeyDown);

        // Clean up the event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [currentStep, mobileNumber, termsAccepted, userOTP, loading]);

    // Handle tab navigation in profile details form
    const handleProfileInputKeyDown = (e) => {
        if (e.key === "Tab") {
            // Let the default tab behavior work
            return;
        } else if (e.key === "Enter") {
            // Prevent default to avoid form submission
            e.preventDefault();
        }
    };

    return (
        <section className="mx-auto flex h-[100%] max-w-8xl items-center justify-center bg-card py-2">
            <div className="mx-auto w-[95%] md:w-[70%] md:py-4">
                <div className="flex justify-center border border-gray-100 rounded-md place-items-center md:gap-0 lg:grid lg:grid-cols-12">
                    <section className="relative hidden h-20 gap-2 py-0 my-0 mt-20 rounded-md lg:col-span-4 lg:col-start-2 lg:col-end-6 lg:flex lg:h-full">
                        <div className="lg:full h-[20rem] w-full rounded-xl bg-gray-100 lg:h-[28rem]">
                            <div className="relative w-full h-full">
                                <img
                                    src="https://thumbs.dreamstime.com/b/man-compares-prices-his-phone-walking-grocery-store-vector-illustration-man-compares-prices-his-phone-339567915.jpg"
                                    alt="Grocery Delivery"
                                    className="object-cover w-full h-full rounded-xl"
                                />
                            </div>
                        </div>
                    </section>
                    <Card className="flex flex-col items-center justify-center w-full max-w-xl px-4 py-10 my-10 border-none sm:px-8 lg:col-start-7 lg:col-end-12 lg:px-0 lg:py-6">
                        <div className="w-full">
                            <CardHeader className="px-2 py-0">
                                <h1 className="my-2 text-lg font-bold text-center text-gray-900 sm:text-2xl">
                                    {currentStep == 1
                                        ? isSignUp
                                            ? "Sign Up"
                                            : "Login"
                                        : currentStep == 2
                                            ? "OTP Verification"
                                            : "Personal Information"}
                                </h1>
                                <Stepper
                                    steps={signupSteps}
                                    currentStep={currentStep}
                                />
                            </CardHeader>
                            <div className="lg:px-4">
                                {currentStep == 1 ? (
                                    <div>
                                        <div className="flex items-center gap-2 mt-10">
                                            <span className="p-2 font-medium text-gray-700 bg-gray-100 rounded-sm">
                                                +91
                                            </span>
                                            <input
                                                type="number"
                                                maxLength={10}
                                                onChange={(e) => {
                                                    setSearchParams({
                                                        signup: isSignUp.toString(),
                                                        step: currentStep.toString(),
                                                        number: encodeURIComponent(e.target.value),
                                                    });
                                                    setMobileNumber(e.target.value);
                                                    setErrorMessage("");
                                                }}
                                                
                                                value={mobileNumber}
                                                placeholder="Enter Mobile Number..."
                                                className="w-full px-3 py-2 text-gray-700 bg-transparent border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        
                                        <div className="flex items-start mt-6 space-x-2">
                                            <div 
                                                className="flex items-center h-5 cursor-pointer"
                                                onClick={() => setTermsAccepted(!termsAccepted)}
                                            >
                                                <div className={`h-4 w-4 rounded border ${termsAccepted ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'} flex items-center justify-center`}>
                                                    {termsAccepted && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                            <label className="text-sm text-gray-700">
                                                I agree to the <a href={tandcpolicy}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer" className="text-indigo-600 hover:underline">Terms and Conditions</a>, <a href={privacypolicy}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer" className="text-indigo-600 hover:underline">Privacy Policy</a> and <a href={refundpolicy} className="text-indigo-600 hover:underline">Returns & Refund Policy</a>
                                            </label>
                                        </div>
                                    </div>
                                ) : currentStep == 2 ? (
                                    <>
                                        <div className="flex items-center justify-center mt-8">
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-input-${index}`}
                                                    value={userOTP[index] || ""}
                                                    onChange={(e) => handleChangeOtp(e, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    type="text"
                                                    maxLength="1"
                                                    className="w-10 h-10 ml-2 text-xl text-center bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="—"
                                                />
                                            ))}
                                        </div>
                                        <p className="mt-4 text-sm text-center text-gray-600">
                                            We've sent a verification code to +91 {mobileNumber}
                                        </p>
                                    </>
                                ) : (
                                    currentStep == 3 && (
                                        <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                                            <div className="flex gap-3 my-2">
                                                <div className="w-1/2 bg-white">
                                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={profile.firstName}
                                                        onChange={handleChange}
                                                        onKeyDown={handleProfileInputKeyDown}
                                                        placeholder="Enter First Name"
                                                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        required
                                                    />
                                                </div>
                                                <div className="w-1/2 bg-white">
                                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={profile.lastName}
                                                        onChange={handleChange}
                                                        onKeyDown={handleProfileInputKeyDown}
                                                        placeholder="Enter Last Name"
                                                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <label className="text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profile.email}
                                                    onChange={handleChange}
                                                    onKeyDown={handleProfileInputKeyDown}
                                                    placeholder="Enter Email"
                                                    className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    required
                                                />
                                            </div>
                                            <div className="flex gap-3 my-4">
                                                <div className="w-1/2 bg-white">
                                                    <label className="text-sm font-medium text-gray-700">Gender</label>
                                                    <select
                                                        name="gender"
                                                        value={profile.gender}
                                                        onChange={handleChange}
                                                        onKeyDown={handleProfileInputKeyDown}
                                                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        required
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="w-1/2 bg-white">
                                                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        name="dob"
                                                        value={profile.dob}
                                                        onChange={handleChange}
                                                        onKeyDown={handleProfileInputKeyDown}
                                                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    )
                                )}
                                <CardFooter className="flex flex-col px-2 py-2 pt-4 space-y-4">
                                    {errorMessage && (
                                        <p className="text-sm font-medium text-red-500">{errorMessage}</p>
                                    )}
                                    <Button
                                        type="button"
                                        className="w-full rounded-lg"
                                        onClick={() => {
                                            handleNextStep();
                                        }}
                                        disabled={
                                            loading || 
                                            (currentStep === 1 && (mobileNumber.length < 10 || !termsAccepted)) ||
                                            (currentStep === 2 && userOTP.length < 6)
                                        }
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            currentStep === 3 ? "Create Account" : "Next"
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="w-full"
                                        onClick={handleToggle}
                                    >
                                        {isSignUp
                                            ? "Already have an account? Login"
                                            : "Don't have an account? Sign Up"}
                                    </Button>
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
export default SignUp;