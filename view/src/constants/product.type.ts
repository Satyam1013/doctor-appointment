export interface Product {
  _id?: string;
  title: string;
  categoryKey: string;
  price: number;
  originalPrice: number;
  description: string;
  tags: string[];
  images: any[];
  productDetails?: string;
  benefits?: string;
  howToUse?: string;
  ingredients?: string;
  caution?: string;
  information?: string;
  contents?: string;
}
