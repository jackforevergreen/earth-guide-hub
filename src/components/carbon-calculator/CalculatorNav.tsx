import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

type CalculatorNavProps = {
  currentStep: number;
  totalSteps: number;
  onStepClick: (index: number) => void;
};

const stepNames = ["Start", "Transportation", "Diet", "Energy"];

const CalculatorNav = ({ currentStep, totalSteps, onStepClick }: CalculatorNavProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-16 z-40"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Carbon Calculator
              </span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Step Navigation - with proper overflow handling */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {stepNames.map((name, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isDisabled = index > currentStep;
            const isClickable = !isDisabled && !isActive;

            return (
              <motion.button
                key={name}
                onClick={() => isClickable && onStepClick(index)}
                disabled={isDisabled}
                whileHover={isClickable ? { scale: 1.03 } : {}}
                whileTap={isClickable ? { scale: 0.97 } : {}}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md"
                    : isCompleted
                    ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isCompleted && <Check className="h-4 w-4" />}
                {name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorNav;
