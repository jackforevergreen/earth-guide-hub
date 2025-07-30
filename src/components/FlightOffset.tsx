import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane } from "lucide-react";

const FlightOffset = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Offset Your <span className="text-primary">Flights!</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Want to travel with a clear conscience? Offset your flight's carbon footprint and 
              support sustainable initiatives. Every little bit counts in making a big difference 
              for our planet. Fly green, feel good.
            </p>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              See More
            </Button>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-[var(--shadow-card)]">
                <div className="w-48 h-48 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center">
                  <Plane className="h-24 w-24 text-white transform rotate-45" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-200 rounded-full opacity-60" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-pink-100 rounded-full opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightOffset;