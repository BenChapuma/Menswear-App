import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Cashmere Overcoat',
    price: 850,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop',
    description: 'A timeless silhouette crafted from premium Italian cashmere blend. Features a tailored fit and silk lining.',
    colors: ['Camel', 'Navy', 'Black'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Merino Wool Rollneck',
    price: 180,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=800&auto=format&fit=crop',
    description: 'Fine-gauge merino wool sweater with a soft handle and elegant drape. Perfect for layering.',
    colors: ['Ivory', 'Charcoal', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Selvedge Denim Jeans',
    price: 220,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
    description: '14oz Japanese selvedge denim. Raw finish that develops a unique patina over time.',
    colors: ['Indigo'],
    sizes: ['30', '32', '34', '36']
  },
  {
    id: '4',
    name: 'Supima Cotton Tee',
    price: 65,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    description: 'The perfect everyday t-shirt. Made from extra-long staple Supima cotton for durability and softness.',
    colors: ['White', 'Black', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '5',
    name: 'Leather Chelsea Boots',
    price: 340,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop',
    description: 'Handcrafted leather boots with elastic side panels and a durable Goodyear-welted sole.',
    colors: ['Tan', 'Dark Brown'],
    sizes: ['8', '9', '10', '11']
  },
  {
    id: '6',
    name: 'Linen Chore Jacket',
    price: 210,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    description: 'Breathable heavy linen jacket inspired by classic French workwear. Unlined for a relaxed feel.',
    colors: ['Sand', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL']
  }
];
