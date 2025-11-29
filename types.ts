export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for rich text simulation
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  readTime: number; // in minutes
  featured?: boolean;
}

export enum NewsCategory {
  Mundo = 'Mundo',
  Politica = 'Política',
  Negocios = 'Negócios',
  Tecnologia = 'Tecnologia',
  Ciencia = 'Ciência',
  Saude = 'Saúde',
  Esportes = 'Esportes',
  Entretenimento = 'Entretenimento'
}

export interface NavLink {
  label: string;
  href: string;
}