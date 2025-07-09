// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Toaster } from "react-hot-toast";
import React,{ Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

// -------------------- OTHER IMPORT FILES -------------------- //
import Footer from "../widgets/Footer";
import NavBar from "../widgets/nav-bar";
import Loading from "../widgets/loading";
import { UserProvider } from '../shared/context/UserContext';
import { ToastContextProvider } from '../shared/context/toaterContext';
import AppRouter from "./routes/AppRouter";

const App = () => (
  <BrowserRouter>
    <ToastContextProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ToastContextProvider>
  </BrowserRouter>
);

export default App;

const AppContent = () => {

  const noNavbarRoutes = ['',];

  return (
    <div className="flex flex-col w-full h-full min-h-screen font-poppins bg-card text-muted-foreground">
      {!noNavbarRoutes.includes(location.pathname) && <NavBar />}
      <main className="flex-1 w-full font-poppins">
        <Suspense fallback={<Loading />}>
          <AppRouter />
        </Suspense>
      </main>
      <Toaster />
      {location.pathname !== "/account"
        &&
        !noNavbarRoutes.includes(location.pathname) && <Footer />
      }
    </div>
  );
};


