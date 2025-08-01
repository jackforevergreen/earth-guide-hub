import { Button } from "@/components/ui/button";
import { Trees } from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/", active: true },
  { name: "Course", href: "#" },
  { name: "Carbon Credits", href: "#" },
  { name: "Projects", href: "#" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "#" },
  { name: "FAQs", href: "#" },
  { name: "Shop", href: "#" },
  { name: "Cart", href: "#" }
];

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trees className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Forevergreen</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  item.active 
                    ? "text-primary border-b-2 border-primary pb-1" 
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          <Button variant="hero" size="sm" className="hidden lg:flex">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;