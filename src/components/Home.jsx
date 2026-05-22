import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Heart, ChevronDown, ChevronUp, Search, Globe, MessageCircle, Mail, ArrowRight, Check, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomSelect } from './CustomSelect';
import { MagneticButton } from './MagneticButton';
import { ProductCard } from './views/ProductCard';
import { ReviewsCarousel } from './views/ReviewsCarousel';
import { Accordion } from './views/Accordion';
import { Footer } from './Footer';
import { HomeGallery } from './views/HomeGallery';
import { HomeList } from './views/HomeList';
import clsx from 'clsx';

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
    <div className="w-full min-h-screen bg-[#f4f4f4] pt-24 pb-20 px-4 lg:pl-[300px] lg:pr-24 overflow-y-auto overflow-x-hidden">
      
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
            key={`gallery-view-${activeDepartment}-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            
            <HomeGallery 
              galleryProducts={galleryProducts}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              language={language}
              t={t}
              navigateTo={navigateTo}
              formatPrice={formatPrice}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlistItems={wishlistItems}
              sizes={sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              galleryBlur={galleryBlur}
              galleryOpacity={galleryOpacity}
              galleryY={galleryY}
              zoomedImage={zoomedImage}
              setZoomedImage={setZoomedImage}
            />
          
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key={`list-view-${activeDepartment}-${activeCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl mx-auto pb-12"
          >
            <HomeList 
              displayedProducts={displayedProducts}
              language={language}
              t={t}
              filterSize={filterSize}
              setFilterSize={setFilterSize}
              allAvailableSizes={allAvailableSizes}
              filterColor={filterColor}
              setFilterColor={setFilterColor}
              allAvailableColors={allAvailableColors}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          
          </motion.div>
        </AnimatePresence>
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
};
