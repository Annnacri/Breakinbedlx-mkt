export interface MenuItem {
  id: string;
  name: string;
  category: 'artesanal' | 'salgado' | 'doce' | 'bebida';
  description: string;
  tagline: string;
  price: string;
  image: string;
  highlight?: boolean;
}

export interface VideoSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  duration: number; // in seconds
}

export interface MarketingCampaign {
  id: string;
  title: string;
  targetAudience: string;
  selectedMenuId: string;
  slides: VideoSlide[];
  aspectRatio: '9:16' | '16:9';
  musicTrack: string;
}
