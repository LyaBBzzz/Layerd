import React from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';

export const ProductGrid = () => {
  const { products, navigateTo, formatPrice } = useShop();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="w-full min-h-screen pt-40 pb-20 pl-[350px] pr-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            className="flex flex-col cursor-pointer group"
            onClick={() => navigateTo('details', product)}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="bg-white rounded-xl p-8 mb-6 h-80 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <motion.img 
                layoutId={`product-image-${product.id}`}
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>
            
            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="font-anton text-2xl uppercase tracking-wide">{product.brand}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.name}</p>
              </div>
              <p className="font-anton text-xl">{formatPrice(product.price)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
