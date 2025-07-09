// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from "react";
import { Check } from "lucide-react"; // Import the Check icon

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../lib/utils";


const Stepper = ({ steps, currentStep, setCurrentStep }) => {
  const getStepColor = (index) => {
    switch (index) {
      case 1:
        return "border-purple-500 bg-purple-500 text-white"; // Color for the 1st step
      case 2:
        return "border-green-500 bg-green-500 text-white"; // Color for the 2nd step
      case 3:
        return "border-sky-500 bg-sky-500 text-white"; // Color for the 3rd step
      default:
        return "border-muted-foreground bg-background text-muted-foreground"; // Default color
    }
  };

  return (
    <div className="flex items-center justify-center w-full mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={index + 1}>
          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => setCurrentStep(index + 1)}
              className={cn(
                "z-10 flex w-full flex-col items-center text-center",
                index + 1 <= currentStep
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-colors duration-300",
                  index + 1 === currentStep
                    ? getStepColor(index + 1)
                    : index + 1 < currentStep
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-muted-foreground bg-background text-muted-foreground",
                )}
              >
                {index + 1 < currentStep && <Check size={20} />}
              </div>
              <span className="w-full mt-2 text-xs font-medium">{step}</span>
            </button>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "z-20 mx-2 h-0.5 w-full translate-y-[-575%] transform transition-colors duration-300",
                index + 1 < currentStep
                  ? "bg-primary"
                  : "bg-muted-foreground/30",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
