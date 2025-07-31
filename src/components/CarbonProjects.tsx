import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Shield, Trees } from "lucide-react";

import afforestCredit from "@/assets/afforestation-credit.png";
import energyCredit from "@/assets/energy-waste-credit.png";
import hydroCredit from "@/assets/hydroelectric.png";
import reforestCredit from "@/assets/reforest-credit.png";

import OurPartners from "@/components/Partners";

const projects = [
  {
    icon: energyCredit,
    title: "Energy & Waste Credit",
    description:
      "Boosting efficiency and reducing emissions across 10,000+ facilities in Quebec through data-driven sustainability practices.",
    impact: "22.8M+ tCO₂ reduced (2010–2020)",
  },
  {
    icon: hydroCredit,
    title: "Hydroelectric Power Credit",
    description:
      "Delivering 195MW of zero-emission hydropower to Sulawesi, replacing fossil fuel plants and improving local livelihoods.",
    impact: "608,000+ tCO₂ reduced per year",
  },
  {
    icon: afforestCredit,
    title: "Afforestation & Reforestation Credit",
    description:
      "Restoring native forests in Colombia’s Eastern Plains to promote biodiversity and sustainable land use.",
    impact: "5.5M+ tCO₂ reduced (2005–2065)",
  },
  {
    icon: reforestCredit,
    title: "REDD Reforestation Credit",
    description:
      "Protecting tropical forests in Acre, Brazil through REDD+ strategies and community-driven conservation.",
    impact: "VCS1112 certified REDD+ project",
  },
];

const trustBadges = [
  { name: "Verra", icon: Shield },
  { name: "UN Verified", icon: Award },
  { name: "BioCarbon", icon: Trees },
];

const CarbonProjects = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Offset With <span className="text-primary">Verified Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Support high-impact environmental projects that create real,
            measurable change. All our carbon credits are verified by leading
            certification standards.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-8 bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Icon Container */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-forest rounded-2xl flex items-center justify-center shadow-[var(--shadow-button)] flex-shrink-0">
                  <img
                    src={project.icon}
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-leaf rounded-full" />
                    <span className="text-sm font-medium text-primary">
                      {project.impact}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-foreground">
            Trusted & Certified
          </h3>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-background rounded-full px-6 py-3 shadow-[var(--shadow-soft)]"
              >
                <badge.icon className="h-6 w-6 text-primary" />
                <span className="font-medium text-foreground">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Browse Projects
          </Button>
        </div>
      </div>

      <OurPartners />
    </section>
  );
};

export default CarbonProjects;
