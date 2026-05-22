import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen, products, language, t, navigateTo, formatPrice } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Auto-focus when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery(''); // Reset query on close
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsSearchOpen]);

  // Filter products across all categories
  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    
    return products.filter(p => {
      const n = p.name[language]?.toLowerCase() || '';
      const b = p.brand?.toLowerCase() || '';
      const c = p.category?.toLowerCase() || '';
      const sc = p.subCategory?.toLowerCase() || '';
      
      return n.includes(q) || b.includes(q) || c.includes(q) || sc.includes(q);
    });
  }, [query, products, language]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col"
        >
          {/* Header & Input */}
          <div className="w-full max-w-5xl mx-auto px-8 py-12 flex flex-col relative shrink-0">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-12 right-8 text-gray-400 hover:text-black transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="w-full flex items-center border-b-2 border-black pb-4 mt-12">
              <Search size={32} className="text-gray-400 mr-6" />
              <input 
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder') || "What are you looking for?"}
                className="w-full bg-transparent text-4xl font-anton uppercase outline-none placeholder-gray-300"
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="w-full flex-1 overflow-y-auto">
            <div className="w-full max-w-5xl mx-auto px-8 pb-12">
              {!query.trim() ? (
                <div className="text-center text-gray-400 font-bold mt-20 text-sm uppercase tracking-widest">
                  {t('searchHint') || 'Type to search products, brands, or categories'}
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center text-gray-500 font-bold mt-20 text-xl">
                  {t('noResults') || 'No products found'}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                  {searchResults.map((product) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="cursor-pointer group flex flex-col h-full bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg transition-shadow"
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('product', product);
                      }}
                    >
                      <div className="w-full aspect-square relative bg-[#f4f4f4] rounded-2xl p-4 flex items-center justify-center mb-4 overflow-hidden shrink-0">
                        <img 
                          src={product.colors?.[0]?.image || ''} 
                          alt={product.brand}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-anton text-lg uppercase tracking-wide truncate mt-2">{product.brand}</h3>
                      <p className="text-gray-500 font-bold text-xs mt-1 mb-3 line-clamp-2">{product.name[language]}</p>
                      <div className="font-anton mt-auto pt-2 border-t border-gray-100">{formatPrice(product.price)}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
