import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BlogService, BlogPost as BlogPostType } from "@/services/BlogService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundPost = BlogService.getPostBySlug(slug);
      setPost(foundPost);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatContent = (content: string) => {
    // Convert markdown-style headings to HTML
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <Button variant="outline" size="sm" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-8 font-medium leading-relaxed">
              {post.excerpt}
            </p>
            
            <div 
              className="prose-content space-y-4 text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: `<p class="mb-4">${formatContent(post.content)}</p>` 
              }}
            />
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Written by</p>
                <p className="font-semibold">{post.author}</p>
              </div>
              <Button asChild>
                <Link to="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;