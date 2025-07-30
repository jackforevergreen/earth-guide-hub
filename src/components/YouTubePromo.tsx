import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Users, Youtube } from "lucide-react";

const YouTubePromo = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Sustainability <span className="text-primary">Education</span>,
              Made Entertaining
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get weekly climate tips, sustainability hacks, and inspiring
              stories from our community of eco-warriors.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="overflow-hidden shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/zB4OlMqmNW8"
                  title="5 Easy Ways to Reduce Your Carbon Footprint"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                ></iframe>
              </div>
            </Card>

            <Card className="overflow-hidden shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/64Awm4L2WRM"
                  title="Understanding Carbon Credits"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                ></iframe>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>125K+ Subscribers</span>
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
