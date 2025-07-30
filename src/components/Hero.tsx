import heroBackground from "@/assets/hero-background.jpg";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground">
          Forever
          <span className="font-bold" style={{ color: "#217E38" }}>
            green
          </span>
        </h1>

        <p className="text-2xl md:text-3xl mb-10 text-foreground max-w-3xl mx-auto leading-relaxed">
          Join the movement. Download our app, watch climate tips, and take
          climate action today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            <Download className="h-5 w-5" />
            Download the App
          </Button>
          <Button
            variant="outline-hero"
            size="lg"
            className="text-lg px-8 py-6"
          >
            Offset Now
          </Button>
        </div>
      </div>

      <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"></div>
    </section>
  );
};

export default Hero;
