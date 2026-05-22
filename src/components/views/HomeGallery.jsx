import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomSelect } from '../CustomSelect';
import { MagneticButton } from '../MagneticButton';
import { ReviewsCarousel } from './ReviewsCarousel';
import { Accordion } from './Accordion';
import clsx from 'clsx';

export const HomeGallery = ({ 
  galleryProducts, activeIndex, setActiveIndex, selectedColors, setSelectedColors, 
  language, t, navigateTo, formatPrice, addToCart, toggleWishlist, wishlistItems, 
  sizes, selectedSize, setSelectedSize, galleryBlur, galleryOpacity, galleryY, 
  zoomedImage, setZoomedImage 
}) => {
  const activeProduct = galleryProducts[activeIndex] || galleryProducts[0];

  if (galleryProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="font-anton text-5xl text-gray-300 uppercase tracking-widest">
          {language === 'en' ? 'COMING SOON' : 'СКОРО В ПРОДАЖЕ'}
        </h2>
        <p className="text-gray-400 mt-4 font-bold text-sm">
          {language === 'en' ? 'We are working on adding products to this category.' : 'Мы работаем над добавлением товаров в эту категорию.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-24 z-0 flex flex-col items-center justify-center min-h-[45vh] mb-0">
        <motion.div 
          className="relative w-full max-w-4xl aspect-[2/1] flex items-center justify-center perspective-[1000px]"
          style={{ filter: galleryBlur, opacity: galleryOpacity, y: galleryY }}
        >
          {galleryProducts.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-12 z-20 p-2 md:p-3 bg-white/50 backdrop-blur-md rounded-full hover:bg-white shadow-md transition-all text-gray-800"
                onClick={() => setActiveIndex((prev) => (prev - 1 + galleryProducts.length) % galleryProducts.length)}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-4 md:right-12 z-20 p-2 md:p-3 bg-white/50 backdrop-blur-md rounded-full hover:bg-white shadow-md transition-all text-gray-800"
                onClick={() => setActiveIndex((prev) => (prev + 1) % galleryProducts.length)}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {galleryProducts.map((product, idx) => {
            let offset = idx - activeIndex;
            if (offset < -1) offset += galleryProducts.length;
            if (offset > 1) offset -= galleryProducts.length;

            const isActive = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;

            if (!isActive && !isPrev && !isNext) return null;

            const currentColorIndex = selectedColors[product.id] || 0;

            return (
              <motion.div
                key={product.id}
                className="absolute cursor-pointer flex items-center justify-center"
                onClick={() => {
                  if (isActive) {
                    navigateTo('product', product);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                initial={false}
                onPanEnd={(e, info) => {
                  if (info.offset.x < -50) {
                    setActiveIndex((prev) => (prev + 1) % galleryProducts.length);
                  } else if (info.offset.x > 50) {
                    setActiveIndex((prev) => (prev - 1 + galleryProducts.length) % galleryProducts.length);
                  }
                }}
                animate={{
                  x: isActive ? 0 : isPrev ? '-75%' : '75%',
                  z: isActive ? 0 : -100,
                  rotateY: isActive ? 0 : isPrev ? 25 : -25,
                  scale: isActive ? 1.2 : 0.6,
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? 'blur(0px)' : 'blur(4px)'
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                style={{ zIndex: isActive ? 10 : 1 }}
              >
                <img 
                  src={product.colors[0].image} 
                  className={clsx(
                    "w-full object-contain invisible",
                    product.category === 'clothing' ? "max-w-xs md:max-w-sm" : "max-w-lg"
                  )}
                  alt=""
                />
                
                {product.colors.map((color, colorIdx) => (
                  <motion.img 
                    key={colorIdx}
                    src={color.image} 
                    alt={`${product.name[language]} - ${color.name}`}
                    className={clsx(
                      "absolute top-0 left-0 w-full h-full object-contain drop-shadow-2xl",
                      product.category === 'clothing' && "p-4 md:p-8"
                    )}
                    initial={false}
                    animate={{ opacity: currentColorIndex === colorIdx ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ pointerEvents: currentColorIndex === colorIdx ? 'auto' : 'none' }}
                  />
                ))}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto pt-8 pb-12 min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col xl:flex-row gap-12"
          >
            <div className="flex-1 flex flex-col order-2 xl:order-1">
              <h1 className="font-anton text-6xl md:text-8xl uppercase tracking-wider">
                {activeProduct.brand}
              </h1>
              <p className="text-gray-500 font-bold text-sm mt-2 mb-8">
                {activeProduct.name[language]}
              </p>
              
              <div className="text-sm text-gray-600 leading-relaxed mb-8">
                {activeProduct.description[language]}
              </div>

              <div className="flex flex-col">
                <Accordion title={t('details')} defaultOpen={true}>
                  {t('materialText')}
                </Accordion>
                <Accordion title={t('freeDelivery')}>
                  {t('deliveryText')}
                </Accordion>
                <Accordion title={t('reviews')}>
                  <ReviewsCarousel />
                </Accordion>
              </div>
            </div>

            <div className="w-full xl:w-[400px] flex flex-col pt-4 order-1 xl:order-2">
              <div className="flex justify-between items-end mb-8">
                <h2 className="font-anton text-4xl">{formatPrice(activeProduct.price)}</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    {activeProduct.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColors(prev => ({ ...prev, [activeProduct.id]: idx }))}
                        className={clsx(
                          "w-5 h-5 rounded-full border-2 cursor-pointer transition-all hover:scale-110",
                          selectedColors[activeProduct.id] === idx ? "border-black scale-110" : "border-transparent"
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
                <button 
                  onClick={() => addToCart(activeProduct, selectedSize, activeProduct.colors[selectedColors[activeProduct.id] || 0])}
                  className="flex-1 w-full bg-[#a3a3a3] hover:bg-black hover:scale-[1.02] hover:shadow-lg transition-all duration-300 text-white rounded-full py-3 flex items-center justify-center font-bold text-xs uppercase"
                >
                  {t('addToCart')} <ShoppingCart size={14} className="ml-2" />
                </button>
                <button 
                  onClick={() => toggleWishlist(activeProduct, activeProduct.colors[selectedColors[activeProduct.id] || 0])}
                  className={clsx(
                    "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md shrink-0",
                    wishlistItems.some(i => i.id === activeProduct.id && i.selectedColor.name === activeProduct.colors[selectedColors[activeProduct.id] || 0].name) 
                      ? "bg-red-50 border-red-100 text-red-500 hover:bg-red-100" 
                      : "border-gray-300 hover:bg-gray-100 text-black hover:border-gray-400"
                  )}
                >
                  <Heart size={16} fill={wishlistItems.some(i => i.id === activeProduct.id && i.selectedColor.name === activeProduct.colors[selectedColors[activeProduct.id] || 0].name) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-gray-400">{t('additionalViews')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {activeProduct.colors[selectedColors[activeProduct.id] || 0].additionalImages?.map((img, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-xl aspect-square flex items-center justify-center overflow-hidden shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                      onClick={() => setZoomedImage(img)}
                    >
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={img} 
                        alt={`${activeProduct.name[language]} view ${i}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
