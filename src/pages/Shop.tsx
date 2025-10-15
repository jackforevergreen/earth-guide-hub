import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Leaf, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
          >
            Carbon Credits{" "}
            <span className="text-primary">Shop</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Offset your carbon footprint with verified carbon credits.
            Our web shop is launching soon with seamless purchasing and instant delivery.
          </motion.p>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Credits</h3>
              <p className="text-sm text-muted-foreground">
                All credits are verified and certified by leading standards
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Purchase</h3>
              <p className="text-sm text-muted-foreground">
                Simple checkout process with instant credit delivery
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Track your offset progress and environmental impact
              </p>
            </Card>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a
                href="https://apps.apple.com/us/app/forevergreen-app/id6578432563"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="app-download"
                data-analytics-source="shop-placeholder"
              >
                Download App to Shop Now
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 p-6 bg-muted/50 rounded-lg"
          >
            <h3 className="font-semibold mb-2">Development Progress</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Web shop is currently in development as part of Phase 2 of our roadmap
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Phase 1.1 Complete • Phase 2 In Progress</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;