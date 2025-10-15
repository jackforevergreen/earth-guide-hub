// TypeScript interfaces for YouTube Data API v3 responses and internal data structures

// ===== API Response Types =====

export interface YouTubeChannelStatsResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<{
    kind: string;
    etag: string;
    id: string;
    statistics: {
      viewCount: string;
      subscriberCount: string;
      hiddenSubscriberCount: boolean;
      videoCount: string;
    };
  }>;
}

export interface YouTubeVideoSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<{
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
        standard?: YouTubeThumbnail;
        maxres?: YouTubeThumbnail;
      };
      channelTitle: string;
      publishTime: string;
    };
  }>;
}

export interface YouTubeVideoDetailsResponse {
  kind: string;
  etag: string;
  items: Array<{
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
        standard?: YouTubeThumbnail;
        maxres?: YouTubeThumbnail;
      };
      channelTitle: string;
      tags?: string[];
      categoryId: string;
      liveBroadcastContent: string;
      defaultLanguage?: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
    };
  }>;
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

// ===== Internal Application Types =====

export interface ChannelStats {
  subscriberCount: number;
  totalViewCount: number;
  videoCount: number;
  lastUpdated: number;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
  viewCount: number;
  url: string;
  duration?: string;
  relativeTime: string; // "2 days ago", "1 week ago", etc.
}

export interface YouTubeData {
  channelStats: ChannelStats | null;
  latestVideos: VideoData[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

// ===== Cache Types =====

export interface CachedData<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export interface YouTubeCacheData {
  channelStats?: CachedData<ChannelStats>;
  latestVideos?: CachedData<VideoData[]>;
}

// ===== Configuration Types =====

export interface YouTubeConfig {
  apiKey: string;
  channelId: string;
  maxResults: number;
  cacheTTL: {
    channelStats: number; // 1 hour
    latestVideos: number; // 30 minutes
  };
}

// ===== Utility Types =====

export interface ApiError {
  message: string;
  code?: number;
  details?: unknown;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// ===== Format Helper Types =====

export interface FormattedNumber {
  value: number;
  formatted: string; // "1.2K", "15K", "2.3M", etc.
}

// Export the channel ID constant
// TODO: Replace with actual Forevergreen YouTube channel ID
export const FOREVERGREEN_CHANNEL_ID = 'UCloT0b5vaVK0-_TqxPU4yxA';