import app from "@/assets/app.jpg";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Leaf, Smartphone } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Carbon Tracking",
    description: "Real-time monitoring of your environmental impact",
  },
  {
    icon: Calendar,
    title: "Monthly Reports",
    description: "Detailed insights and progress analytics",
  },
  {
    icon: Leaf,
    title: "Easy Offsetting",
    description: "One-tap carbon credit purchases",
  },
];

const AppShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Your Climate <span className="text-primary">Companion</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Take control of your environmental impact with our intuitive app.
              Track emissions, get personalized insights, and make a real
              difference with verified carbon offsets.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-sage rounded-xl flex items-center justify-center shadow-[var(--shadow-soft)] flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Smartphone className="h-5 w-5" />
              Download for iOS
            </Button>
          </div>

          <div className="relative">
            <div className="bg-background rounded-2xl p-6 shadow-inner">
              <img
                src={app}
                alt="Forevergreen App Interface"
                className="w-full h-96 object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
