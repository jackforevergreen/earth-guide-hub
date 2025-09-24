import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Search, Tag, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
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
            Forevergreen{" "}
            <span className="text-primary">Blog</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover insights about sustainability, climate action, and environmental conservation.
            Our blog platform is launching soon with expert articles and community stories.
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
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Articles</h3>
              <p className="text-sm text-muted-foreground">
                In-depth articles about climate science and sustainability
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Discovery</h3>
              <p className="text-sm text-muted-foreground">
                Search and filter articles by topics and categories
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Organized Content</h3>
              <p className="text-sm text-muted-foreground">
                Content organized by tags, categories, and difficulty levels
              </p>
            </Card>
          </motion.div>

          {/* Upcoming blog topics preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold mb-6">Upcoming Topics</h3>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="text-left p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  Coming Soon
                </div>
                <h4 className="font-medium">Understanding Carbon Footprints</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  A beginner's guide to calculating and reducing your environmental impact
                </p>
              </div>
              <div className="text-left p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  Coming Soon
                </div>
                <h4 className="font-medium">Sustainable Living Tips</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Practical ways to live more sustainably in your daily life
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a
                href="https://www.youtube.com/@Forevergreenapp?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="youtube-subscribe"
                data-analytics-source="blog-placeholder"
              >
                Watch Our YouTube Channel
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
              Blog system is planned for Phase 1.2 of our development roadmap
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Phase 1.1 Complete • Phase 1.2 Planned</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;