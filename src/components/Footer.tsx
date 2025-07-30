import { Separator } from "@/components/ui/separator";
import { Leaf, Youtube, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Contact", href: "mailto:hello@forevergreen.com" }
  ],
  products: [
    { name: "Carbon Credits", href: "#" },
    { name: "Offset Flights", href: "#" },
    { name: "Store", href: "#" }
  ],
  social: [
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Twitter", href: "#", icon: Twitter }
  ]
};

const Footer = () => {
  return (
    <footer className="bg-forest text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Forevergreen</span>
            </div>
            <p className="text-sage leading-relaxed max-w-md">
              Making sustainability simple and accessible. Track, reduce, and offset 
              your carbon footprint while supporting verified environmental projects.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sage hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sage hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="bg-sage/30 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sage text-sm">
            © 2024 Forevergreen. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {footerLinks.social.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;