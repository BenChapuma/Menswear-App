import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-medium">
            <a href="#" className="hover:opacity-50 transition-opacity">Shop All</a>
            <a href="#" className="hover:opacity-50 transition-opacity">New Arrivals</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Collections</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-serif tracking-tighter italic font-bold">MANOIR</h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden md:block hover:opacity-50 transition-opacity">
            <Search size={20} />
          </button>
          <button className="hidden md:block hover:opacity-50 transition-opacity">
            <User size={20} />
          </button>
          <button 
            onClick={onCartClick}
            className="relative hover:opacity-50 transition-opacity"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-8 text-2xl font-serif italic">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Shop All</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Collections</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
