import heroBackground from "@/assets/hero-background.jpg";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.05] animate-zoomSlow"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/20" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="relative z-10 container mx-auto px-4 text-center max-w-6xl"
      >
        <motion.h1
          variants={fadeUp}
          className="text-6xl sm:text-6xl md:text-8xl font-bold mb-5 sm:mb-6 text-white"
        >
          Forever
          <span className="font-bold" style={{ color: "#217E38" }}>
            green
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl sm:text-xl md:text-3xl mb-8 sm:mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          Join the movement. Download our app, watch nature content, and take
          climate action today.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Button
            variant="hero"
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-5 py-3 sm:px-6 sm:py-4"
          >
            <Download className="h-5 w-5" />
            Download the App
          </Button>
          <Button
            variant="outline-hero"
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-5 py-3 sm:px-6 sm:py-4"
          >
            Offset Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
