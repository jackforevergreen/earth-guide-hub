import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type QuestionSliderProps = {
  question: string;
  value: number;
  onChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  useColoredSlider?: boolean;
};

const QuestionSlider = ({
  question,
  value,
  onChange,
  minimumValue,
  maximumValue,
  useColoredSlider,
}: QuestionSliderProps) => {
  const getColor = () => {
    if (!useColoredSlider) return "";
    const ratio = value / maximumValue;
    if (ratio < 0.3) return "text-green-600";
    if (ratio < 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4 my-6">
      <Label className="text-lg font-semibold text-gray-800">{question}</Label>
      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={minimumValue}
          max={maximumValue}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{minimumValue}</span>
          <span className={`text-2xl font-bold ${getColor()}`}>{value}</span>
          <span className="text-sm text-gray-500">{maximumValue}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionSlider;
