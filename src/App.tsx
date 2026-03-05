import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { Product, CartItem } from './types';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Outerwear', 'Knitwear', 'T-Shirts', 'Pants', 'Accessories'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity: 1, 
        selectedSize: product.sizes[0], 
        selectedColor: product.colors[0] 
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=2000&auto=format&fit=crop" 
              alt="Hero" 
              className="w-full h-full object-cover grayscale brightness-75"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 text-center text-white px-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.3em] font-medium mb-4"
            >
              Spring / Summer 2026
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif italic font-bold tracking-tighter mb-8"
            >
              The Modern <br /> Silhouette
            </motion.h1>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group flex items-center gap-2 mx-auto bg-white text-brand-black px-8 py-4 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-brand-black hover:text-white transition-all duration-300"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <h2 className="text-3xl font-serif italic font-bold">Curated Essentials</h2>
              <p className="text-neutral-500 mt-2 max-w-md">
                A selection of our most sought-after pieces, crafted with precision and purpose.
              </p>
            </div>
            
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'text-brand-black border-b-2 border-brand-black pb-1' 
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section className="bg-brand-gray py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-neutral-200 rounded-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:pl-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif italic font-bold mt-4 leading-tight">
                Crafted for the <br /> Discerning Individual
              </h2>
              <p className="text-neutral-600 mt-6 leading-relaxed">
                We believe that true luxury lies in the details. Every piece in our collection is the result of rigorous design, sourced from the world's finest mills and workshops.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold">Materials</h4>
                  <p className="text-sm text-neutral-500 mt-2">Sourced from Italian and Japanese heritage mills.</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold">Ethical</h4>
                  <p className="text-sm text-neutral-500 mt-2">Fair wages and sustainable production practices.</p>
                </div>
              </div>
              <button className="mt-12 text-xs uppercase tracking-widest font-bold border-b border-brand-black pb-1 hover:opacity-50 transition-opacity">
                Read Our Story
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <h2 className="text-2xl font-serif italic font-bold tracking-tighter mb-6">MANOIR</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Curating the modern wardrobe since 2024. Quality over quantity, always.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-neutral-500">Shop</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-neutral-400 transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-neutral-500">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-neutral-400 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-neutral-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-neutral-500">Newsletter</h4>
              <p className="text-sm text-neutral-400 mb-6">Join for early access to new collections.</p>
              <div className="flex border-b border-neutral-700 pb-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent text-sm w-full focus:outline-none"
                />
                <button className="text-xs uppercase tracking-widest font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-neutral-800 gap-6">
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
              © 2026 MANOIR. All rights reserved.
            </p>
            <div className="flex gap-8 text-[10px] text-neutral-500 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
