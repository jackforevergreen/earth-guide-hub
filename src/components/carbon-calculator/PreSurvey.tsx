import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Leaf, Globe, Info } from "lucide-react";
import { motion } from "framer-motion";
import type { SurveyData } from "@/pages/CarbonCalculator";

type PreSurveyProps = {
  surveyData: SurveyData;
  setSurveyData: (data: SurveyData) => void;
  onNext: () => void;
};

// Mock country data - in a real app this would come from an API
const countries = [
  { name: "United States", abbreviation: "US" },
  { name: "Canada", abbreviation: "CA" },
  { name: "United Kingdom", abbreviation: "GB" },
  { name: "Germany", abbreviation: "DE" },
  { name: "France", abbreviation: "FR" },
  { name: "Australia", abbreviation: "AU" },
  { name: "Japan", abbreviation: "JP" },
  { name: "India", abbreviation: "IN" },
  { name: "Brazil", abbreviation: "BR" },
  { name: "Mexico", abbreviation: "MX" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const PreSurvey = ({ surveyData, setSurveyData, onNext }: PreSurveyProps) => {
  const handleContinue = () => {
    if (!surveyData.country) {
      alert("Please select a country before continuing.");
      return;
    }
    onNext();
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="max-w-4xl mx-auto pt-8"
    >
      <motion.div
        variants={fadeUp}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 mt-4">
          Welcome to <span className="text-primary">Forevergreen</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate your carbon footprint and discover how you can make a positive impact on our planet
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="shadow-xl border-2 border-green-100">
          <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Let's Get Started 🌱
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-4">
              <motion.div variants={fadeUp} className="flex items-start space-x-3 p-5 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <Calculator className="h-7 w-7 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Carbon Footprint</h3>
                  <p className="text-sm text-gray-600">Get a personalized calculation of your environmental impact.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start space-x-3 p-5 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <Leaf className="h-7 w-7 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Reduce Impact</h3>
                  <p className="text-sm text-gray-600">Receive tailored tips to minimize your carbon emissions.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start space-x-3 p-5 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <Globe className="h-7 w-7 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Help the Planet</h3>
                  <p className="text-sm text-gray-600">Take meaningful action for environmental sustainability.</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4 pt-4">
              <h3 className="text-2xl font-bold text-center text-gray-900">Select Your Country 🌍</h3>
              <Select
                value={surveyData.country}
                onValueChange={(value) => setSurveyData({ ...surveyData, country: value })}
              >
                <SelectTrigger className="w-full h-14 text-lg border-2 hover:border-green-400 transition-colors">
                  <SelectValue placeholder="Choose your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.abbreviation} value={country.abbreviation} className="text-base">
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Your country helps us provide accurate carbon calculations and local environmental data.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button
                onClick={handleContinue}
                disabled={!surveyData.country}
                variant="hero"
                className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                Begin Survey →
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PreSurvey;
