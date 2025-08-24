import FGLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { name: "Home", href: "/", active: true },
  { name: "Course", href: "#" },
  { name: "Carbon Credits", href: "#" },
  { name: "Projects", href: "#" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "#" },
  { name: "FAQs", href: "#" },
  { name: "Shop", href: "#" },
  { name: "Cart", href: "#" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a
            href="/"
            aria-label="Forevergreen home"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <img
              src={FGLogo}
              alt="Forevergreen"
              className="h-8 w-auto md:h-10 object-contain select-none"
              draggable={false}
            />
            <span className="text-lg md:text-xl font-bold text-foreground">
              Forevergreen
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, i) => (
              <a
                key={i}
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

          {/* Desktop CTA */}
          <Button variant="hero" size="sm" className="hidden lg:flex">
            Get Started
          </Button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile slide-down panel */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-2 border-t border-border">
            {navigationItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-2 py-3 text-base font-medium rounded-md ${
                  item.active ? "text-primary" : "text-foreground"
                } hover:bg-accent/30`}
              >
                {item.name}
              </a>
            ))}

            <div className="px-2 pt-2 pb-4">
              <Button
                variant="hero"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
