import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Leaf, Zap, Car, Utensils, Home, TrendingDown, Award, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import type { SurveyData, SurveyEmissions } from "@/pages/CarbonCalculator";
import { auth } from "@/lib/firebase";
import { saveEmissionsData, saveCommunityEmissionsData } from "@/api/emissions";
import LoginModal from "@/components/auth/LoginModal";

type BreakdownProps = {
  surveyData: SurveyData;
  surveyEmissions: SurveyEmissions;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const Breakdown = ({ surveyData, surveyEmissions }: BreakdownProps) => {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Check auth status and save data if logged in
  useEffect(() => {
    const saveData = async () => {
      const user = auth.currentUser;
      setIsLoggedIn(!!user);

      if (user && !dataSaved) {
        try {
          // Save emissions data
          await saveEmissionsData({
            surveyData,
            surveyEmissions,
            totalEmissions: surveyEmissions.totalEmissions || 0,
            monthlyEmissions: surveyEmissions.monthlyEmissions || 0,
          });

          // Update community stats
          await saveCommunityEmissionsData(surveyEmissions.totalEmissions || 0);

          setDataSaved(true);
          console.log("Data saved successfully!");
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }
    };

    saveData();
  }, [surveyData, surveyEmissions, dataSaved]);

  const totalEmissions = surveyEmissions.totalEmissions || 0;
  const avgAmericanEmissions = 16; // Average American carbon footprint

  const percentageOfAverage = ((totalEmissions / avgAmericanEmissions) * 100).toFixed(0);

  const getEmissionCategory = () => {
    if (totalEmissions < 8) return { label: "Excellent", color: "text-green-600", bgColor: "bg-green-100" };
    if (totalEmissions < 12) return { label: "Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (totalEmissions < 16) return { label: "Average", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { label: "High", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const category = getEmissionCategory();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="max-w-6xl mx-auto space-y-6 pt-8"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp} className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 mt-4">Your Carbon Footprint Results</h1>
        <p className="text-xl text-gray-600">Here's your environmental impact breakdown</p>
      </motion.div>

      {/* Login Prompt Banner (if not logged in) */}
      {!isLoggedIn && (
        <motion.div variants={fadeUp}>
          <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Save Your Progress!
                  </h3>
                  <p className="text-gray-700">
                    Create an account to track your carbon footprint over time and see your progress.
                  </p>
                </div>
                <Button
                  onClick={() => setLoginModalOpen(true)}
                  variant="hero"
                  size="lg"
                  className="flex-shrink-0 gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Sign Up / Log In
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Results Card */}
      <motion.div variants={fadeUp}>
        <Card className="shadow-xl border-2 border-green-200 hover:shadow-2xl transition-shadow">
        <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
          <div className="mx-auto mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600">
              <Leaf className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-5xl font-bold text-gray-800">
            {totalEmissions.toFixed(2)} tons
          </CardTitle>
          <p className="text-xl text-gray-600 mt-2">of CO₂ per year</p>
          <div className={`inline-block px-4 py-2 rounded-full ${category.bgColor} mt-4`}>
            <span className={`font-semibold ${category.color}`}>{category.label}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                Emissions Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Transportation</span>
                  </div>
                  <span className="font-bold">{surveyEmissions.transportationEmissions?.toFixed(2)} tons</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Utensils className="h-5 w-5 text-orange-600" />
                    <span className="font-medium">Diet</span>
                  </div>
                  <span className="font-bold">{surveyEmissions.dietEmissions?.toFixed(2)} tons</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Energy</span>
                  </div>
                  <span className="font-bold">{surveyEmissions.energyEmissions?.toFixed(2)} tons</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Comparison
              </h3>
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600 mb-2">Your footprint vs. Average American</p>
                <p className="text-4xl font-bold text-gray-800 mb-2">{percentageOfAverage}%</p>
                <p className="text-sm text-gray-600">
                  {totalEmissions < avgAmericanEmissions
                    ? `You're ${(100 - parseFloat(percentageOfAverage)).toFixed(0)}% below average! Great job!`
                    : `You're ${(parseFloat(percentageOfAverage) - 100).toFixed(0)}% above average. Let's work on that!`}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Monthly Impact:</strong> {surveyEmissions.monthlyEmissions?.toFixed(2)} tons CO₂
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Recommendations Card */}
      <motion.div variants={fadeUp}>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl">Reduce Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-green-600 bg-green-50 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Transportation Tips</h4>
              <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                <li>Consider carpooling or using public transportation</li>
                <li>If possible, switch to an electric or hybrid vehicle</li>
                <li>Reduce air travel when possible</li>
              </ul>
            </div>
            <div className="p-4 border-l-4 border-orange-600 bg-orange-50 rounded">
              <h4 className="font-semibold text-orange-900 mb-2">Diet Tips</h4>
              <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                <li>Try reducing meat consumption, especially beef</li>
                <li>Choose local and seasonal produce</li>
                <li>Minimize food waste</li>
              </ul>
            </div>
            <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">Energy Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Switch to energy-efficient appliances</li>
                <li>Improve home insulation</li>
                <li>Consider renewable energy sources</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* CTA Card */}
      <motion.div variants={fadeUp}>
        <Card className="shadow-xl bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-2xl transition-shadow">
        <CardContent className="py-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Take Action Today</h2>
          <p className="text-lg mb-6">
            Build your legacy and leave a lasting impact by investing in carbon credits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              size="lg"
              className="text-lg font-semibold"
            >
              Offset Your Carbon
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="text-lg font-semibold bg-white text-gray-800 hover:bg-gray-100"
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Back to Home */}
      <motion.div variants={fadeUp} className="text-center pb-8">
        <Button
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          variant="outline"
          size="lg"
          className="text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
        >
          <Home className="h-5 w-5 mr-2" />
          Return to Home
        </Button>
      </motion.div>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={async () => {
          // After successful login, save the data
          try {
            await saveEmissionsData({
              surveyData,
              surveyEmissions,
              totalEmissions: surveyEmissions.totalEmissions || 0,
              monthlyEmissions: surveyEmissions.monthlyEmissions || 0,
            });
            await saveCommunityEmissionsData(surveyEmissions.totalEmissions || 0);
            setDataSaved(true);
            setIsLoggedIn(true);
            console.log("Data saved after login!");
          } catch (error) {
            console.error("Error saving data after login:", error);
          }
        }}
      />
    </motion.div>
  );
};

export default Breakdown;
