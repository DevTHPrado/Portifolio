export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  icon: string; // Nome do ícone do Lucide
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
  title: string;
  description: string;
  audiences: string[];
  serviceName: string;
  demoUrl?: string;
}

export interface Professional {
  id: 'developer';
  name: string;
  role: string;
  subtitle: string;
  bio: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  experience: string;
  location: string;
  phone: string;
  instagram: string;
  email: string;
  avatarUrl: string;
  heroBgGradient: string;
  services: Service[];
  gallery: GalleryItem[];
  galleryCategories: string[];
}
