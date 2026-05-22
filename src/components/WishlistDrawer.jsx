import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlistItems, toggleWishlist, navigateTo, language, t, formatPrice } = useShop();

  const handleProductClick = (product) => {
    setIsWishlistOpen(false);
    navigateTo('product', product);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-[110] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-anton text-3xl uppercase">{t('wishlist') || 'WISHLIST'}</h2>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p className="font-bold text-sm uppercase tracking-widest">{language === 'en' ? 'YOUR WISHLIST IS EMPTY' : 'СПИСОК ЖЕЛАНИЙ ПУСТ'}</p>
                </div>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.wishlistId} className="flex space-x-4 bg-[#f4f4f4] p-4 rounded-2xl relative cursor-pointer hover:bg-[#ebebeb] transition-colors" onClick={() => handleProductClick(item)}>
                    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2">
                      <img src={item.selectedColor.image} alt={item.name[language]} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-anton text-xl uppercase leading-none mb-1">{item.brand}</h3>
                      <p className="text-gray-500 text-xs font-bold mb-2">{item.name[language]}</p>
                      <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 mb-2">
                        <span className="flex items-center">
                          <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.selectedColor.colorCode, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}></span>
                          {item.selectedColor.name}
                        </span>
                      </div>
                      <div className="font-anton text-lg mt-1">{formatPrice(item.price)}</div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item, item.selectedColor);
                      }}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-red-500 hover:scale-110 transition-transform"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
