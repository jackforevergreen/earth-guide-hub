import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import AppShowcase from "@/components/AppShowcase";
import CarbonProjects from "@/components/CarbonProjects";
import YouTubePromo from "@/components/YouTubePromo";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <HowItWorks />
      <AppShowcase />
      <CarbonProjects />
      <YouTubePromo />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
