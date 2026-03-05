export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Outerwear' | 'Knitwear' | 'T-Shirts' | 'Pants' | 'Accessories';
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
