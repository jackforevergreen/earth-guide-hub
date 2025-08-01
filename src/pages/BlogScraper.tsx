import Navigation from "@/components/Navigation";
import { BlogScraper } from "@/components/BlogScraper";
import Footer from "@/components/Footer";

const BlogScraperPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <BlogScraper />
      </div>
      <Footer />
    </div>
  );
};

export default BlogScraperPage;