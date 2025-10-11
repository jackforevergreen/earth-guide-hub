import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PreSurvey from "@/components/carbon-calculator/PreSurvey";
import Transportation from "@/components/carbon-calculator/Transportation";
import Diet from "@/components/carbon-calculator/Diet";
import Energy from "@/components/carbon-calculator/Energy";
import Breakdown from "@/components/carbon-calculator/Breakdown";
import CalculatorNav from "@/components/carbon-calculator/CalculatorNav";

export type SurveyData = {
  // Location
  country?: string;
  state?: string;

  // Transportation
  longFlights?: number;
  shortFlights?: number;
  carType?: string;
  milesPerWeek?: string;
  useTrain?: string;
  trainFrequency?: string;
  useBus?: string;
  busFrequency?: string;
  walkBike?: string;
  walkBikeFrequency?: string;

  // Diet
  diet?: string;

  // Energy
  electricBill?: string;
  waterBill?: string;
  propaneBill?: string;
  gasBill?: string;
  useWoodStove?: string;
  peopleInHome?: number;
};

export type SurveyEmissions = {
  // Transportation
  flightEmissions?: number;
  carEmissions?: number;
  publicTransportEmissions?: number;
  transportationEmissions?: number;

  // Diet
  dietEmissions?: number;

  // Energy
  electricEmissions?: number;
  waterEmissions?: number;
  otherEnergyEmissions?: number;
  energyEmissions?: number;

  // Total
  totalEmissions?: number;
  monthlyEmissions?: number;
};

const steps = ["pre-survey", "transportation", "diet", "energy", "breakdown"];

const CarbonCalculator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentStep = searchParams.get("step") || "pre-survey";

  const [surveyData, setSurveyData] = useState<SurveyData>({
    country: "",
    longFlights: 0,
    shortFlights: 0,
    carType: "Gas ⛽️",
    milesPerWeek: "300",
    useTrain: "No",
    useBus: "No",
    walkBike: "No",
    diet: "",
    electricBill: "",
    waterBill: "",
    propaneBill: "",
    gasBill: "",
    useWoodStove: "No",
    peopleInHome: 1,
  });

  const [surveyEmissions, setSurveyEmissions] = useState<SurveyEmissions>({
    flightEmissions: 0,
    carEmissions: 0,
    publicTransportEmissions: 0,
    transportationEmissions: 0,
    dietEmissions: 0,
    electricEmissions: 0,
    waterEmissions: 0,
    otherEnergyEmissions: 0,
    energyEmissions: 0,
    totalEmissions: 0,
    monthlyEmissions: 0,
  });

  const goToStep = (step: string) => {
    navigate(`/carbon-calculator?step=${step}`);
  };

  const currentStepIndex = steps.indexOf(currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case "pre-survey":
        return (
          <PreSurvey
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            onNext={() => goToStep("transportation")}
          />
        );
      case "transportation":
        return (
          <Transportation
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            surveyEmissions={surveyEmissions}
            setSurveyEmissions={setSurveyEmissions}
            onNext={() => goToStep("diet")}
          />
        );
      case "diet":
        return (
          <Diet
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            surveyEmissions={surveyEmissions}
            setSurveyEmissions={setSurveyEmissions}
            onNext={() => goToStep("energy")}
          />
        );
      case "energy":
        return (
          <Energy
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            surveyEmissions={surveyEmissions}
            setSurveyEmissions={setSurveyEmissions}
            onNext={() => goToStep("breakdown")}
          />
        );
      case "breakdown":
        return (
          <Breakdown
            surveyData={surveyData}
            surveyEmissions={surveyEmissions}
          />
        );
      default:
        return <PreSurvey surveyData={surveyData} setSurveyData={setSurveyData} onNext={() => goToStep("transportation")} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Main Navigation */}
      <Navigation />

      {/* Calculator Progress Nav */}
      {currentStep !== "breakdown" && (
        <CalculatorNav
          currentStep={currentStepIndex}
          totalSteps={steps.length - 1}
          onStepClick={(index) => goToStep(steps[index])}
        />
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {renderStep()}
      </div>
    </div>
  );
};

export default CarbonCalculator;
