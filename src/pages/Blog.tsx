import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BlogService, BlogPost } from "@/services/BlogService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Heart, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(BlogService.getPosts());
  }, []);

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground mb-8">No blog posts found. Import your content first.</p>
            <Button asChild>
              <Link to="/admin/scraper">
                <Settings className="h-4 w-4 mr-2" />
                Import Blog Posts
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Our <span className="text-primary">Blog</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover insights, tips, and stories about sustainability, climate action, and building a greener future.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {posts.map((post) => (
                <Card key={post.slug} className="overflow-hidden bg-card shadow-[var(--shadow-card)] border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {post.image && (
                    <div className="aspect-video bg-gradient-to-br from-green-200 to-green-300 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {!post.image && (
                    <div className="aspect-video bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-primary-foreground">🌲</span>
                        </div>
                        <span>{post.author}</span>
                      </div>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 text-foreground line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/blog/${post.slug}`}>
                          Read More
                        </Link>
                      </Button>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center gap-1 text-red-500">
                          <span>0</span>
                          <Heart className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/admin/scraper">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Posts
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;