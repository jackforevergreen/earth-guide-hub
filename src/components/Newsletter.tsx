import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Sparkles } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-accent/20 shadow-[var(--shadow-card)] border-0 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-forest rounded-full flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-button)]">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Get Monthly <span className="text-primary">Climate Tips</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join 25,000+ eco-conscious individuals receiving practical sustainability tips, 
              exclusive content, and inspiring climate success stories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 h-12 rounded-xl border-2 border-input focus:border-primary transition-colors"
              />
              <Button variant="hero" size="lg" className="px-8">
                <Sparkles className="h-5 w-5" />
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;