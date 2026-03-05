import React from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-gray rounded-sm">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-black hover:text-white"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium tracking-tight">{product.name}</h3>
          <p className="text-xs text-neutral-500 mt-1">{product.category}</p>
        </div>
        <p className="text-sm font-medium">${product.price}</p>
      </div>
    </motion.div>
  );
};
