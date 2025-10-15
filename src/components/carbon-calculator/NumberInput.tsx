import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type NumberInputProps = {
  question: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  label?: string;
  disabled?: boolean;
  maxValue?: number;
};

const NumberInput = ({
  question,
  value,
  onChange,
  unit,
  label,
  disabled,
  maxValue,
}: NumberInputProps) => {
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text && !/^\d*\.?\d*$/.test(text)) {
      setError("Please enter valid numbers only");
      return;
    }

    let formattedText = text;
    if (text.length > 1 && text.startsWith("0") && !text.startsWith("0.")) {
      formattedText = text.replace(/^0+/, "");
    }

    const numValue = parseFloat(formattedText) || 0;

    if (maxValue && numValue > maxValue) {
      setError(`Maximum value allowed is ${maxValue}`);
      onChange(maxValue.toString());
    } else {
      setError("");
      onChange(formattedText === "" ? "" : formattedText || "0");
    }
  };

  const handleBlur = () => {
    if (!value) {
      onChange("0");
    }
  };

  return (
    <div className="space-y-3 my-6">
      <Label className="text-lg font-semibold text-gray-800">{question}</Label>
      <div className="relative">
        {unit && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            {unit}
          </span>
        )}
        <Input
          type="text"
          inputMode="decimal"
          value={disabled ? "Loading..." : value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder="Your Answer"
          className={`text-base h-12 ${unit ? "pl-10" : ""} ${label ? "pr-32" : ""}`}
        />
        {label && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            {label}
          </span>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default NumberInput;
