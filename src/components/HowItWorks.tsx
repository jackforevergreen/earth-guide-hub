import { Card } from "@/components/ui/card";
import { Calculator, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Calculator,
    title: "Calculate Your Impact",
    description:
      "Track your daily activities and discover your carbon footprint across travel, food, and lifestyle.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Monitor your emissions reduction over time with detailed insights and monthly impact reports.",
  },
  {
    icon: Target,
    title: "Reach Net-Zero",
    description:
      "Offset your remaining emissions through verified carbon credit projects and achieve carbon neutrality.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to understand and reduce your environmental
            impact
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 text-center bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-forest rounded-2xl flex items-center justify-center mx-auto shadow-[var(--shadow-button)]">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
