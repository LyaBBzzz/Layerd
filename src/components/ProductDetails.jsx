import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ShoppingCart, Heart, ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MagneticButton } from './MagneticButton';
import { CustomSelect } from './CustomSelect';
import clsx from 'clsx';
import { ReviewItem } from './views/ReviewItem';
import { ReviewsCarousel } from './views/ReviewsCarousel';
import { Accordion } from './views/Accordion';
import { Footer } from './Footer';



export const ProductDetails = () => {
  const { selectedProduct, navigateTo, addToCart, language, t, wishlistItems, toggleWishlist, formatPrice, products } = useShop();
  const [activeIndex, setActiveIndex] = useState(0); // Selected color index
  const [selectedSize, setSelectedSize] = useState(43);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  if (!selectedProduct) return null;

  const colors = selectedProduct.colors || [];
  const activeColor = colors[activeIndex] || colors[0];
  const sizes = selectedProduct.availableSizes || [40, 41, 42, 43, 44, 45];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-[100dvh] bg-[#f4f4f4] z-20 flex flex-col pt-24 pb-12 px-4 lg:px-12 overflow-y-auto overflow-x-hidden"
    >


      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors"
              onClick={() => setZoomedImage(null)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={zoomedImage}
              alt="Zoomed product"
              className="max-w-full max-h-full object-contain drop-shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-7xl mx-auto mb-4">
        <button 
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} />
          <span>{language === 'ru' ? 'Вернуться в каталог' : 'Back to Catalog'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full flex-grow shrink-0 gap-12 pb-4">
        
        {/* Left Side - 3D Carousel (Colors) */}
        <div className="flex-1 relative flex flex-col items-center justify-start min-h-[500px]">
          {/* Brand Background Text */}
          <div className="w-full flex flex-col items-center pointer-events-none z-0 mt-4 lg:mt-8">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-anton text-[12vw] lg:text-[7vw] xl:text-[110px] uppercase text-black tracking-wider text-center whitespace-nowrap leading-none"
            >
              {selectedProduct.brand}
            </motion.h1>
          </div>

          <div className="relative z-10 w-full max-w-2xl aspect-square flex items-center justify-center perspective-[1000px] -mt-8 lg:-mt-20">
            {colors.map((color, idx) => {
              let offset = idx - activeIndex;
              if (offset < -1) offset += colors.length;
              if (offset > 1) offset -= colors.length;

              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;

              if (!isActive && !isPrev && !isNext) return null;

              return (
                <motion.div
                  key={idx}
                  className="absolute cursor-pointer flex items-center justify-center"
                  onClick={() => setActiveIndex(idx)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) {
                      setActiveIndex((prev) => (prev + 1) % colors.length);
                    } else if (offset.x > 50) {
                      setActiveIndex((prev) => (prev - 1 + colors.length) % colors.length);
                    }
                  }}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? '-75%' : '75%',
                    z: isActive ? 0 : -100,
                    rotateY: isActive ? 0 : isPrev ? 25 : -25,
                    scale: isActive ? 1.2 : 0.6,
                    opacity: isActive ? 1 : 0.4,
                    filter: isActive ? 'blur(0px)' : 'blur(4px)'
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  style={{ zIndex: isActive ? 10 : 1 }}
                >
                  <img 
                    src={color.image} 
                    alt={`${selectedProduct.name[language]} - ${color.name}`} 
                    className="w-full max-w-md object-contain drop-shadow-2xl"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Details */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-full lg:w-[450px] flex flex-col justify-start pl-0 lg:pl-4 pt-4 lg:pt-4"
        >
          <div className="h-6 overflow-hidden mb-2">
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-gray-500 font-bold text-sm uppercase tracking-widest"
              >
                {activeColor.name}
              </motion.p>
            </AnimatePresence>
          </div>
          <h2 className="font-anton text-4xl mb-6 uppercase">{selectedProduct.name[language]}</h2>
          
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-anton text-4xl">{formatPrice(selectedProduct.price)}</h2>
            
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={clsx(
                      "w-5 h-5 rounded-full border-2 cursor-pointer transition-all hover:scale-110",
                      activeIndex === idx ? "border-black scale-110" : "border-transparent"
                    )}
                    style={{ backgroundColor: c.colorCode, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}
                    title={c.name}
                  />
                ))}
              </div>
              <CustomSelect 
                value={selectedSize}
                onChange={(val) => setSelectedSize(Number(val))}
                options={[
                  { value: '', label: t('size') },
                  ...sizes.map(size => ({ value: size, label: `${t('size')}: ${size}` }))
                ]}
                placeholder={t('size')}
                className="bg-transparent border border-gray-300 rounded-full px-4 py-1 text-xs font-bold outline-none cursor-pointer hover:border-black transition-colors min-w-[90px]"
              />
            </div>
          </div>

          <div className="flex space-x-4 mb-10 w-full">
            <MagneticButton className="flex-1">
              <button 
                onClick={() => addToCart(selectedProduct, selectedSize, activeColor)}
                className="w-full bg-[#a3a3a3] hover:bg-black transition-colors text-white rounded-full py-3 flex items-center justify-center font-bold text-xs uppercase"
              >
                {t('addToCart')} <ShoppingCart size={14} className="ml-2" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <button 
                onClick={() => toggleWishlist(selectedProduct, activeColor)}
                className={clsx(
                  "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
                  wishlistItems.some(i => i.id === selectedProduct.id && i.selectedColor.name === activeColor.name) 
                    ? "bg-red-50 border-red-100 text-red-500 hover:bg-red-100" 
                    : "border-gray-300 hover:bg-gray-100 text-black"
                )}
              >
                <Heart size={16} fill={wishlistItems.some(i => i.id === selectedProduct.id && i.selectedColor.name === activeColor.name) ? "currentColor" : "none"} />
              </button>
            </MagneticButton>
          </div>

          <div className="mb-8 text-xs text-gray-500 leading-relaxed">
            {selectedProduct.description[language]}
          </div>

          {/* Additional Photos */}
          <div className="mt-4 mb-8">
            <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-gray-400">{t('additionalViews')}</h3>
            <div className="relative w-full aspect-[2.05/1]">
              <AnimatePresence>
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 grid grid-cols-2 gap-4"
                >
                  {activeColor.additionalImages?.map((img, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-xl aspect-square flex items-center justify-center overflow-hidden shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                      onClick={() => setZoomedImage(img)}
                    >
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={img} 
                        alt={`${selectedProduct.name[language]} view ${i}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col">
            <Accordion title={t('details')} defaultOpen={false}>
              {t('materialText')}
            </Accordion>
            <Accordion title={t('freeDelivery')}>
              {t('deliveryText')}
            </Accordion>
            <Accordion title={t('reviews')}>
              <ReviewsCarousel />
            </Accordion>
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};
