import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trees, Zap, Shield, Award } from "lucide-react";

const projects = [
  {
    icon: Trees,
    title: "Afforestation Projects",
    description: "Planting native trees in deforested areas to restore ecosystems and capture carbon",
    impact: "2.5M+ trees planted"
  },
  {
    icon: Zap,
    title: "Clean Energy",
    description: "Supporting renewable energy infrastructure in developing communities",
    impact: "150MW+ clean power"
  }
];

const trustBadges = [
  { name: "Verra", icon: Shield },
  { name: "UN Verified", icon: Award },
  { name: "BioCarbon", icon: Trees }
];

const CarbonProjects = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Offset With <span className="text-primary">Verified Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Support high-impact environmental projects that create real, measurable change. 
            All our carbon credits are verified by leading certification standards.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="p-8 bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-forest rounded-2xl flex items-center justify-center shadow-[var(--shadow-button)] flex-shrink-0">
                  <project.icon className="h-8 w-8 text-primary-foreground" />
                </div>
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
        
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-foreground">
            Trusted & Certified
          </h3>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 bg-background rounded-full px-6 py-3 shadow-[var(--shadow-soft)]">
                <badge.icon className="h-6 w-6 text-primary" />
                <span className="font-medium text-foreground">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Browse Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarbonProjects;