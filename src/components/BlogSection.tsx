import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, MessageSquare, Heart } from "lucide-react";

const blogPosts = [
  {
    title: "The Future of Food: Innovations in Sustainable Agriculture",
    excerpt: "As we move forward in the 21st century and the global population nears 9 billion, the goal to produce sufficient food without...",
    date: "Jun 29, 2024",
    readTime: "3 min read",
    views: 60,
    comments: 0,
    likes: 7,
    color: "from-green-200 to-green-300"
  },
  {
    title: "Clean Oceans, Safe Seas: Combating Marine Pollution",
    excerpt: "The oceans are the lifeblood of our planet, covering over 70% of the Earth's surface and playing a crucial role in supporting a...",
    date: "Apr 13, 2024",
    readTime: "4 min read",
    views: 103,
    comments: 0,
    likes: 5,
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "What is Carbon Footprinting?",
    excerpt: "A carbon footprint is the total amount of carbon that an individual, company, entity, or activity emits into the atmosphere...",
    date: "Apr 2, 2024",
    readTime: "4 min read",
    views: 57,
    comments: 0,
    likes: 4,
    color: "from-green-100 to-green-200"
  },
  {
    title: "The Impact of E-Waste and How to Recycle Tech Responsibly",
    excerpt: "In our rapidly advancing digital world, electronic devices have become essential to daily life, revolutionizing the way we...",
    date: "Feb 25, 2024",
    readTime: "2 min read",
    views: 95,
    comments: 0,
    likes: 4,
    color: "from-teal-400 to-blue-500"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Check Out Our <span className="text-primary">Blogs</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden bg-card shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className={`aspect-video bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-[8px] text-primary-foreground">🌲</span>
                    </div>
                    <span>Forevergreen</span>
                  </div>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-red-500">
                    <span>{post.likes}</span>
                    <Heart className="h-3 w-3 fill-current" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Read More Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;