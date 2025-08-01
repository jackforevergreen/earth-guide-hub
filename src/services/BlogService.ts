export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author?: string;
  image?: string;
  tags?: string[];
}

export class BlogService {
  private static STORAGE_KEY = 'forevergreen_blog_posts';

  static savePosts(posts: BlogPost[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
  }

  static getPosts(): BlogPost[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getPostBySlug(slug: string): BlogPost | null {
    const posts = this.getPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  static addPost(post: BlogPost): void {
    const posts = this.getPosts();
    const existingIndex = posts.findIndex(p => p.slug === post.slug);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
    } else {
      posts.unshift(post);
    }
    
    this.savePosts(posts);
  }

  static deletePost(slug: string): void {
    const posts = this.getPosts();
    const filtered = posts.filter(post => post.slug !== slug);
    this.savePosts(filtered);
  }

  static createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  static extractExcerpt(content: string, maxLength: number = 150): string {
    // Remove markdown and HTML
    const plainText = content
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }

  static estimateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  static parseScrapedContent(scrapedData: any): Partial<BlogPost> {
    const title = scrapedData.metadata?.title || 
                 scrapedData.title || 
                 'Untitled Post';
    
    const content = scrapedData.markdown || 
                   scrapedData.content || 
                   scrapedData.html || 
                   '';
    
    const excerpt = this.extractExcerpt(content);
    const readTime = this.estimateReadTime(content);
    const slug = this.createSlug(title);
    
    // Try to extract date from URL or metadata
    const date = scrapedData.metadata?.date || 
                scrapedData.publishedTime ||
                new Date().toISOString().split('T')[0];

    return {
      title,
      slug,
      excerpt,
      content,
      date,
      readTime,
      image: scrapedData.metadata?.image,
      author: scrapedData.metadata?.author || 'Forevergreen Team'
    };
  }
}