import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FirecrawlService } from '@/services/FirecrawlService';
import { BlogService, BlogPost } from '@/services/BlogService';
import { Download, Globe, Key, Plus, Trash2 } from 'lucide-react';

export const BlogScraper = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(FirecrawlService.getApiKey() || '');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedPosts, setScrapedPosts] = useState<BlogPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<BlogPost[]>(BlogService.getPosts());

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    FirecrawlService.saveApiKey(apiKey);
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  const handleScrapeSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FirecrawlService.getApiKey()) {
      toast({
        title: "Error",
        description: "Please set your API key first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    try {
      console.log('Scraping single URL:', url);
      const result = await FirecrawlService.scrapePage(url);
      setProgress(50);
      
      if (result.success && result.data) {
        const parsedPost = BlogService.parseScrapedContent(result.data);
        const fullPost: BlogPost = {
          id: Date.now().toString(),
          title: parsedPost.title || 'Untitled Post',
          slug: parsedPost.slug || 'untitled-post',
          excerpt: parsedPost.excerpt || '',
          content: parsedPost.content || '',
          date: parsedPost.date || new Date().toISOString().split('T')[0],
          readTime: parsedPost.readTime || '5 min read',
          author: parsedPost.author || 'Forevergreen Team',
          image: parsedPost.image
        };

        setScrapedPosts([fullPost]);
        setProgress(100);
        
        toast({
          title: "Success",
          description: "Page scraped successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to scrape page",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error scraping page:', error);
      toast({
        title: "Error",
        description: "Failed to scrape page",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCrawlSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FirecrawlService.getApiKey()) {
      toast({
        title: "Error",
        description: "Please set your API key first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    try {
      console.log('Crawling site:', url);
      const result = await FirecrawlService.crawlWebsite(url);
      setProgress(50);
      
      if (result.success && result.data) {
        const posts: BlogPost[] = [];
        
        if (Array.isArray(result.data.data)) {
          result.data.data.forEach((item: any, index: number) => {
            const parsedPost = BlogService.parseScrapedContent(item);
            const fullPost: BlogPost = {
              id: (Date.now() + index).toString(),
              title: parsedPost.title || 'Untitled Post',
              slug: parsedPost.slug || `untitled-post-${index}`,
              excerpt: parsedPost.excerpt || '',
              content: parsedPost.content || '',
              date: parsedPost.date || new Date().toISOString().split('T')[0],
              readTime: parsedPost.readTime || '5 min read',
              author: parsedPost.author || 'Forevergreen Team',
              image: parsedPost.image
            };
            posts.push(fullPost);
          });
        }

        setScrapedPosts(posts);
        setProgress(100);
        
        toast({
          title: "Success",
          description: `Crawled ${posts.length} pages successfully`,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to crawl website",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({
        title: "Error",
        description: "Failed to crawl website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePost = (post: BlogPost) => {
    BlogService.addPost(post);
    setSavedPosts(BlogService.getPosts());
    toast({
      title: "Success",
      description: "Post saved successfully",
    });
  };

  const handleDeletePost = (slug: string) => {
    BlogService.deletePost(slug);
    setSavedPosts(BlogService.getPosts());
    toast({
      title: "Success",
      description: "Post deleted successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Scraper</h1>
        <p className="text-muted-foreground">Import your blog posts from Wix or any website</p>
      </div>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="scrape">Scrape</TabsTrigger>
          <TabsTrigger value="manage">Manage Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Firecrawl API Key</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get your free API key from <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">firecrawl.dev</a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="fc-xxxxxxxxxxxxxxxx"
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey}>Save Key</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="scrape" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Scrape Content</h3>
            </div>
            
            <form onSubmit={handleScrapeSingle} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Website URL</label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yoursite.wix.com/blog"
                  required
                />
              </div>
              
              {isLoading && (
                <Progress value={progress} className="w-full" />
              )}
              
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Scraping..." : "Scrape Single Page"}
                </Button>
                <Button type="button" onClick={handleCrawlSite} disabled={isLoading} variant="outline" className="flex-1">
                  {isLoading ? "Crawling..." : "Crawl Entire Site"}
                </Button>
              </div>
            </form>
          </Card>

          {scrapedPosts.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Scraped Posts ({scrapedPosts.length})</h3>
              <div className="space-y-4">
                {scrapedPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{post.title}</h4>
                      <Button
                        size="sm"
                        onClick={() => handleSavePost(post)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                    <div className="text-xs text-muted-foreground">
                      {post.date} • {post.readTime}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Saved Posts ({savedPosts.length})</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="/blog">
                  <Download className="h-4 w-4 mr-1" />
                  View Blog
                </a>
              </Button>
            </div>
            
            {savedPosts.length === 0 ? (
              <p className="text-muted-foreground">No posts saved yet. Go to the Scrape tab to import content.</p>
            ) : (
              <div className="space-y-4">
                {savedPosts.map((post) => (
                  <div key={post.slug} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{post.title}</h4>
                        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          {post.date} • {post.readTime}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePost(post.slug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};