import FGLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { User as FirebaseUser } from "firebase/auth";
import LoginModal from "@/components/auth/LoginModal";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Carbon Calculator", href: "/carbon-calculator" },
  { name: "Shop", href: "/shop" },
  { name: "Course", href: "#" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "#" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
            <span className="text-lg md:text-2xl font-bold text-foreground">
              Forever<span className="text-lg md:text-2xl font-bold text-foreground" style={{ color: "#217E38" }}>green</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, i) => {
              const isActive = location.pathname === item.href ||
                (item.href.startsWith('/carbon-calculator') && location.pathname.startsWith('/carbon-calculator'));
              return (
                <motion.a
                  key={i}
                  href={item.href}
                  className={`text-lg font-bold transition-all duration-200 hover:text-primary hover:scale-105 ${
                    isActive
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-muted-foreground"
                  }`}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                  <motion.span
                    whileHover={{
                      y: -1,
                      transition: { duration: 0.15 }
                    }}
                  >
                    {item.name}
                  </motion.span>
                </motion.a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          {user ? (
            <Button
              variant="outline"
              size="lg"
              className="hidden lg:flex text-lg gap-2 border-2 hover:border-primary hover:shadow-md transition-all"
              onClick={() => navigate("/profile")}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">Profile</span>
            </Button>
          ) : (
            <Button
              variant="hero"
              size="lg"
              className="hidden lg:flex text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={() => setLoginModalOpen(true)}
            >
              Log In
            </Button>
          )}

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
            {navigationItems.map((item, i) => {
              const isActive = location.pathname === item.href ||
                (item.href.startsWith('/carbon-calculator') && location.pathname.startsWith('/carbon-calculator'));
              return (
                <motion.a
                  key={i}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-3 text-base font-medium rounded-md transition-all duration-200 ${
                    isActive ? "text-primary" : "text-foreground"
                  } hover:bg-accent/30 hover:scale-105 hover:text-primary`}
                  whileHover={{
                    scale: 1.02,
                    x: 4,
                    transition: { duration: 0.15 }
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {item.name}
                </motion.a>
              );
            })}

            <div className="px-2 pt-2 pb-4">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full gap-2 border-2 h-12 font-semibold"
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  Profile
                </Button>
              ) : (
                <Button
                  variant="hero"
                  className="w-full h-12 font-semibold text-base"
                  onClick={() => {
                    setOpen(false);
                    setLoginModalOpen(true);
                  }}
                >
                  Log In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => navigate("/profile")}
      />
    </nav>
  );
};

export default Navigation;
