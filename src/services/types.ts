export interface HeroConfig {
  type: 'video' | 'image';
  videoUrl: string;
  imageUrl: string;
  overlayOpacity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  image: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
}

export const DEFAULT_HERO: HeroConfig = {
  type: 'video',
  videoUrl: '35ZOZSx7wBk',
  imageUrl: '',
  overlayOpacity: 0.8,
};
