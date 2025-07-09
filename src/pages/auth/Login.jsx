// -------------------- PACKAGE IMPORT FILES -------------------- //
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
// -------------------- OTHER IMPORT FILES -------------------- //
import { CardFooter } from "../../shared/ui/card";
import SignUp from "../../features/auth/ui/SignUp";
import SignIn from "../../features/auth/ui/SignIn";

const Login = () => {

  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  }

  return (
    <>
      {isSignUp ?
        <SignUp isSignUp={isSignUp} handleToggle={handleToggle} />
        :
        <SignIn isSignUp={isSignUp} handleToggle={handleToggle} />}
      <CardFooter className="flex flex-col px-2 py-2 pt-0 space-y-4">
      </CardFooter>
    </>
  );
};

export default Login;
