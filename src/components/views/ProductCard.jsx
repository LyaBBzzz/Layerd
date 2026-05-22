import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import clsx from 'clsx';
import { useShop } from '../../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { addToCart, language, t, navigateTo, wishlistItems, toggleWishlist, formatPrice } = useShop();
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col hover:shadow-lg transition-shadow h-full group">
      <h3 className="font-anton text-2xl uppercase tracking-wide mb-4">{product.brand}</h3>
      <div 
        className="aspect-square flex items-center justify-center bg-[#f4f4f4] rounded-2xl p-4 cursor-pointer mb-4 overflow-hidden relative"
        onClick={() => {
          navigateTo('product', product);
        }}
      >
        <img 
          src={product.colors[0].image} 
          className="w-full h-full object-contain invisible" 
          alt=""
          loading="lazy"
        />
        {product.colors.map((color, colorIdx) => (
          <motion.img 
            key={colorIdx}
            src={color.image} 
            alt={product.name[language]}
            className="absolute top-0 left-0 w-full h-full p-4 object-contain drop-shadow-xl"
            initial={false}
            whileHover={{ scale: 1.1 }}
            animate={{ opacity: currentColorIndex === colorIdx ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ pointerEvents: currentColorIndex === colorIdx ? 'auto' : 'none' }}
            loading="lazy"
          />
        ))}
        
        {/* Quick Actions Overlay */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product, product.colors[currentColorIndex]);
            }}
            className="w-10 h-10 bg-white/80 backdrop-blur-md shadow-sm rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors text-black"
          >
            <Heart size={16} className={clsx(wishlistItems.some(i => i.id === product.id) ? "fill-current" : "")} />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Select first available size by default for quick add
              addToCart(product, product.availableSizes[0], product.colors[currentColorIndex]);
            }}
            className="w-full py-3 bg-black/90 backdrop-blur-md text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center shadow-lg"
          >
            {t('addToCart')} <ShoppingCart size={14} className="ml-2" />
          </button>
        </div>
      </div>
      <p className="text-gray-500 font-bold text-xs mt-1 mb-4 flex-1">{product.name[language]}</p>
      
      <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
        <div className="font-anton text-xl">{formatPrice(product.price)}</div>
        <div className="flex space-x-2">
          {product.colors.map((c, colorIdx) => (
            <button
              key={colorIdx}
              onClick={() => setCurrentColorIndex(colorIdx)}
              className={clsx(
                "w-4 h-4 rounded-full border-2 cursor-pointer transition-all hover:scale-110",
                currentColorIndex === colorIdx ? "border-black scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: c.colorCode, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
