import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-bottom border-neutral-100">
              <h2 className="text-xl font-serif italic font-bold">Your Bag</h2>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-neutral-500 italic">Your bag is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-xs uppercase tracking-widest font-bold underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm font-medium">${item.price}</p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">{item.selectedSize} / {item.selectedColor}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-neutral-200 rounded-sm">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-neutral-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-neutral-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Subtotal</span>
                  <span className="text-lg font-medium">${subtotal}</span>
                </div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider text-center">
                  Shipping and taxes calculated at checkout
                </p>
                <button className="w-full bg-brand-black text-white py-4 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
