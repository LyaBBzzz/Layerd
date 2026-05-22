import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Heart, ChevronDown, ChevronUp, Search, Globe, MessageCircle, Mail, ArrowRight, Check, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomSelect } from './CustomSelect';
import { MagneticButton } from './MagneticButton';
import { ProductCard } from './views/ProductCard';
import { Footer } from './Footer';
import clsx from 'clsx';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4 group">
      <button 
        className="flex justify-between items-center w-full text-left cursor-pointer outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs font-bold group-hover:text-gray-500 transition-colors duration-200">{title}</span>
        <span className="group-hover:bg-gray-100 p-1 rounded-full transition-colors duration-200 text-gray-500 group-hover:text-black">
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-xs text-gray-500 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Home = () => {
  const { products, addToCart, language, t, navigateTo, viewMode, setViewMode, wishlistItems, toggleWishlist, activeCategory, activeSubCategory, activeDepartment, setActiveInfoPage, formatPrice } = useShop();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(43);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const { scrollY } = useScroll();
  const galleryBlur = useTransform(scrollY, [0, 400], ['blur(0px)', 'blur(12px)']);
  const galleryOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);
  const galleryY = useTransform(scrollY, [0, 400], [0, 200]);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filterSize, setFilterSize] = useState('');
  const [filterColor, setFilterColor] = useState('');

  const categoryProducts = useMemo(() => {
    return products.filter(p => 
      (p.department || 'men') === activeDepartment &&
      p.category === activeCategory && 
      (!activeSubCategory || p.subCategory === activeSubCategory)
    );
  }, [products, activeCategory, activeSubCategory, activeDepartment]);

  // State to track the selected color index for each product
  const [selectedColors, setSelectedColors] = useState(() => {
    const initialColors = {};
    products.forEach(p => { initialColors[p.id] = 0; });
    return initialColors;
  });

  const galleryProducts = useMemo(() => categoryProducts.filter(p => !p.listOnly), [categoryProducts]);
  const activeProduct = galleryProducts[activeIndex] || galleryProducts[0];
  const sizes = [40, 41, 42, 43, 44, 45];

  // Derive unique filters
  const allAvailableSizes = useMemo(() => {
    const s = new Set();
    categoryProducts.forEach(p => p.availableSizes?.forEach(size => s.add(size)));
    return Array.from(s).sort((a,b) => a - b);
  }, [categoryProducts]);

  const allAvailableColors = useMemo(() => {
    const c = new Set();
    categoryProducts.forEach(p => p.colors?.forEach(color => c.add(color.name)));
    return Array.from(c).sort();
  }, [categoryProducts]);

  // Apply filters and sorting
  const displayedProducts = useMemo(() => {
    let result = categoryProducts.filter(product => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const n = product.name[language]?.toLowerCase() || '';
        const b = product.brand?.toLowerCase() || '';
        if (!n.includes(q) && !b.includes(q)) return false;
      }
      if (filterSize && !product.availableSizes?.includes(Number(filterSize))) {
        return false;
      }
      if (filterColor && !product.colors?.some(c => c.name === filterColor)) {
        return false;
      }
      return true;
    });

    if (sortOrder === 'asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [categoryProducts, language, searchQuery, filterSize, filterColor, sortOrder]);

  return (
    <div className="w-full min-h-screen bg-[#f4f4f4] pt-24 pb-20 px-4 lg:pl-[300px] lg:pr-24 overflow-y-auto">
      
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

      {/* View Toggle */}
      <div className="w-full max-w-5xl mx-auto flex justify-end items-center mb-8 space-x-6">
        <button 
          onClick={() => setViewMode('gallery')}
          className={clsx("text-xs font-bold uppercase tracking-widest transition-all", viewMode === 'gallery' ? "text-black border-b-2 border-black pb-1" : "text-gray-400 hover:text-black pb-1 border-b-2 border-transparent")}
        >
          {t('galleryView')}
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={clsx("text-xs font-bold uppercase tracking-widest transition-all", viewMode === 'list' ? "text-black border-b-2 border-black pb-1" : "text-gray-400 hover:text-black pb-1 border-b-2 border-transparent")}
        >
          {t('viewMore')}
        </button>
      </div>

      {viewMode === 'gallery' ? (
        <AnimatePresence mode="wait">
          <motion.div 
            key="gallery-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 3D Gallery Section */}
            {galleryProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="font-anton text-5xl text-gray-300 uppercase tracking-widest">
                  {language === 'en' ? 'COMING SOON' : 'СКОРО В ПРОДАЖЕ'}
                </h2>
                <p className="text-gray-400 mt-4 font-bold text-sm">
                  {language === 'en' ? 'We are working on adding products to this category.' : 'Мы работаем над добавлением товаров в эту категорию.'}
                </p>
              </div>
            ) : (
              <>
                <div className="sticky top-24 z-0 flex flex-col items-center justify-center min-h-[45vh] mb-0">
              <motion.div 
                className="relative w-full max-w-4xl aspect-[2/1] flex items-center justify-center perspective-[1000px]"
                style={{ filter: galleryBlur, opacity: galleryOpacity, y: galleryY }}
              >
                {galleryProducts.map((product, idx) => {
                  let offset = idx - activeIndex;
                  if (offset < -1) offset += galleryProducts.length;
                  if (offset > 1) offset -= galleryProducts.length;

                  const isActive = offset === 0;
                  const isPrev = offset === -1;
                  const isNext = offset === 1;

                  if (!isActive && !isPrev && !isNext) return null;

                  // Get current active color for this product
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
                      {/* Невидимый плейсхолдер для сохранения размеров контейнера */}
                      <img 
                        src={product.colors[0].image} 
                        className={clsx(
                          "w-full object-contain invisible",
                          product.category === 'clothing' ? "max-w-xs md:max-w-sm" : "max-w-lg"
                        )}
                        alt=""
                      />
                      
                      {/* Все цвета загружаются сразу и плавно переключаются через opacity */}
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

            {/* Info Section under the gallery */}
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
                  {/* Left side: Brand, title, details */}
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
                        <div className="space-y-6 mt-4">
                          {[
                            {
                              name: "Alexander M.",
                              rating: 5,
                              date: { en: "Oct 24, 2026", ru: "24 Окт, 2026" },
                              text: {
                                en: "Absolutely stunning quality. The leather is incredibly soft, and the fit is perfect straight out of the box. Worth every penny.",
                                ru: "Потрясающее качество. Кожа невероятно мягкая, и они сели идеально прямо из коробки. Стоят каждого потраченного цента."
                              }
                            },
                            {
                              name: "Sophie T.",
                              rating: 5,
                              date: { en: "Sep 12, 2026", ru: "12 Сен, 2026" },
                              text: {
                                en: "A beautiful minimalist design that pairs well with almost anything. The craftsmanship is highly commendable.",
                                ru: "Прекрасный минималистичный дизайн, который сочетается почти со всем. Мастерство заслуживает самой высокой похвалы."
                              }
                            },
                            {
                              name: "James L.",
                              rating: 4,
                              date: { en: "Aug 05, 2026", ru: "05 Авг, 2026" },
                              text: {
                                en: "Great shoes overall, but they run slightly narrow. I'd recommend sizing up if you have wider feet. Otherwise, exceptional.",
                                ru: "В целом отличная обувь, но немного узковата. Рекомендую брать на размер больше, если у вас широкая стопа. В остальном - превосходно."
                              }
                            }
                          ].map((review, i) => (
                            <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-[11px] uppercase tracking-widest text-black">{review.name}</span>
                                <div className="flex text-black space-x-1">
                                  {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={10} fill={j < review.rating ? "currentColor" : "none"} className={j < review.rating ? "text-black" : "text-gray-200"} />
                                  ))}
                                </div>
                              </div>
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3 block">{review.date[language]}</span>
                              <p className="text-gray-500 text-xs leading-relaxed font-medium">{review.text[language]}</p>
                            </div>
                          ))}
                        </div>
                      </Accordion>
                    </div>
                  </div>

                  {/* Right side: Price, add to cart, extra photos */}
                  <div className="w-full xl:w-[400px] flex flex-col pt-4 order-1 xl:order-2">
                    <div className="flex justify-between items-end mb-8">
                      <h2 className="font-anton text-4xl">{formatPrice(activeProduct.price)}</h2>
                      
                      <div className="flex items-center space-x-4">
                        {/* Dynamic Color Selection */}
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
                      <MagneticButton className="flex-1">
                        <button 
                          onClick={() => addToCart(activeProduct, selectedSize, activeProduct.colors[selectedColors[activeProduct.id] || 0])}
                          className="w-full bg-[#a3a3a3] hover:bg-black transition-colors text-white rounded-full py-3 flex items-center justify-center font-bold text-xs uppercase"
                        >
                          {t('addToCart')} <ShoppingCart size={14} className="ml-2" />
                        </button>
                      </MagneticButton>
                      <MagneticButton>
                        <button 
                          onClick={() => toggleWishlist(activeProduct, activeProduct.colors[selectedColors[activeProduct.id] || 0])}
                          className={clsx(
                            "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
                            wishlistItems.some(i => i.id === activeProduct.id && i.selectedColor.name === activeProduct.colors[selectedColors[activeProduct.id] || 0].name) 
                              ? "bg-red-50 border-red-100 text-red-500 hover:bg-red-100" 
                              : "border-gray-300 hover:bg-gray-100 text-black"
                          )}
                        >
                          <Heart size={16} fill={wishlistItems.some(i => i.id === activeProduct.id && i.selectedColor.name === activeProduct.colors[selectedColors[activeProduct.id] || 0].name) ? "currentColor" : "none"} />
                        </button>
                      </MagneticButton>
                    </div>

                    {/* Additional Photos */}
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
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key="list-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl mx-auto pb-12"
          >
            {/* Filters Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-[#f4f4f4] rounded-full py-3 pl-12 pr-4 text-xs font-bold outline-none placeholder-gray-400 focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>

              {/* Filters & Sorting */}
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <CustomSelect 
                  value={filterSize}
                  onChange={(val) => setFilterSize(val)}
                  options={[
                    { value: '', label: t('allSizes') },
                    ...allAvailableSizes.map(s => ({ value: s, label: s }))
                  ]}
                  placeholder={t('allSizes')}
                  className="bg-transparent border border-gray-300 rounded-full px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:border-black transition-colors min-w-[120px]"
                />

                <CustomSelect 
                  value={filterColor}
                  onChange={(val) => setFilterColor(val)}
                  options={[
                    { value: '', label: t('allColors') },
                    ...allAvailableColors.map(c => ({ value: c, label: c }))
                  ]}
                  placeholder={t('allColors')}
                  className="bg-transparent border border-gray-300 rounded-full px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:border-black transition-colors min-w-[120px]"
                />

                <CustomSelect 
                  value={sortOrder}
                  onChange={(val) => setSortOrder(val)}
                  options={[
                    { value: '', label: t('sortBy') },
                    { value: 'asc', label: t('priceAsc') },
                    { value: 'desc', label: t('priceDesc') }
                  ]}
                  placeholder={t('sortBy')}
                  className="bg-transparent border border-gray-300 rounded-full px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:border-black transition-colors min-w-[140px]"
                />
              </div>

            </div>

            {/* Product Grid */}
            {displayedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[30vh]">
                <h2 className="font-anton text-5xl text-gray-300 uppercase tracking-widest">
                  {language === 'en' ? 'COMING SOON' : 'СКОРО В ПРОДАЖЕ'}
                </h2>
                <p className="text-gray-400 mt-4 font-bold text-sm">
                  {language === 'en' ? 'We are working on adding products to this category.' : 'Мы работаем над добавлением товаров в эту категорию.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
};
