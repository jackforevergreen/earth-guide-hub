import flightOffset from "@/assets/flight-offset.png";
import { Button } from "@/components/ui/button";

const FlightOffset = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Offset Your <span style={{ color: "#217E38" }}>Flights!</span>
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Want to travel with a clear conscience? Offset your flight's
              carbon footprint and support sustainable initiatives. Every little
              bit counts in making a big difference for our planet. Fly green,
              feel good.
            </p>
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              See More
            </Button>
          </div>

          {/* Right Plane Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={flightOffset}
                alt="Flight offset"
                className="w-52 h-52 md:w-64 md:h-64 object-contain animate-float"
              />
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
