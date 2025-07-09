// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import Stepper from "../../../shared/ui/stepper";
import { Button } from "../../../shared/ui/button";
import axiosInstance from "../../../shared/axios_API/axios";
import { Card, CardFooter, CardHeader } from "../../../shared/ui/card";

function SignIn({ isSignUp, handleToggle }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [userOTP, setUserOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [mobileNumber, setMobileNumber] = useState('');
    const [userId, setUserId] = useState(null);
    const [expireTime, setExpireTime] = useState(null);
    const loginSteps = ["Mobile", "OTP Verification"];

    // Global keydown handler for Enter key submission
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

    const sendOtp = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/user/login', {}, { params: { phoneNumber: mobileNumber } });
            if (response && response.status === 201) {
                setUserId(response.data?.data?.userId);
                setExpireTime(response.data?.data?.expire);
                setCurrentStep(currentStep + 1);
                setLoading(false);
                return toast.success(response.data?.data?.message || 'OTP Sent');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setLoading(false);
                return toast.error(error.response.data.message);
            }
            setLoading(false);
            return toast.error("Try Later!");
        }
    };

    const verifyOtp = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/user/verify-otp',
                { userId: userId, expire: expireTime },
                { params: { phoneNumber: mobileNumber, otp: userOTP, login: true } });

            if (response && response.status === 200) {
                setCurrentStep(currentStep + 1);
                const token = response.data?.data;
                localStorage.setItem('userToken', token);
                setLoading(false);
                document.location.href = '/';
                return toast.success(response.data?.data.message || 'OTP Verified');
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 500) {
                return toast.error('Invalid OTP');
            }
            return toast.error("Try Later!");
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
                                    steps={loginSteps}
                                    currentStep={currentStep}
                                />
                            </CardHeader>

                            <div className="lg:px-4">
                                {currentStep == 1 && (
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
                                                I agree to the <a href="/terms" className="text-indigo-600 hover:underline">Terms and Conditions</a>, <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a> and <a href="/returns" className="text-indigo-600 hover:underline">Returns & Refund Policy</a>
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {currentStep == 2 && (
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
                                            currentStep === 1 ? "Continue" : "Verify"
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

export default SignIn;