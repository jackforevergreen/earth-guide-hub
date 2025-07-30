import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Youtube, Users } from "lucide-react";

const YouTubePromo = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Sustainability, <span className="text-primary">Simplified</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get weekly climate tips, sustainability hacks, and inspiring stories 
              from our community of eco-warriors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-forest/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Latest Episode
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    "5 Easy Ways to Reduce Your Carbon Footprint"
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video bg-gradient-to-br from-leaf/20 to-sage/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Popular Video
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    "Understanding Carbon Credits"
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>50K+ Subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                <span>New videos weekly</span>
              </div>
            </div>
            
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Youtube className="h-5 w-5" />
              Subscribe on YouTube
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubePromo;