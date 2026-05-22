import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import clsx from 'clsx';
import { useShop } from '../context/ShopContext';

export const Sidebar = () => {
  const { t, activeCategory, setActiveCategory, activeSubCategory, setActiveSubCategory, setIsSearchOpen, products, activeDepartment, isMobileMenuOpen, setIsMobileMenuOpen, navigateTo } = useShop();

  const categories = [
    { id: 'shoes', label: t('shoes') },
    { id: 'clothing', label: t('clothing') },
    { id: 'bag', label: t('bag') },
    { id: 'accessories', label: t('accessories') },
  ];

  const subCategoryMap = {
    accessories: [
      { id: 'belts', label: t('belts') },
      { id: 'hats', label: t('hats') },
      { id: 'sunglasses', label: t('sunglasses') },
      { id: 'wallets', label: t('wallets') }
    ],
    bag: [
      { id: 'backpacks', label: t('backpacks') },
      { id: 'totes', label: t('totes') },
      { id: 'crossbody', label: t('crossbody') },
      { id: 'briefcases', label: t('briefcases') }
    ],
    clothing: [
      { id: 'jackets', label: t('jackets') },
      { id: 'shirts', label: t('shirts') },
      { id: 'pants', label: t('pants') },
      { id: 'tshirts', label: t('tshirts') },
      { id: 'knitwear', label: t('knitwear') }
    ],
    shoes: [
      { id: 'sneakers', label: t('sneakers') },
      { id: 'boots', label: t('boots') },
      { id: 'espadrilles', label: t('espadrilles') },
      { id: 'loafers', label: t('loafers') },
      { id: 'monkstraps', label: t('monkstraps') },
      { id: 'sandals', label: t('sandals') }
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobileMenuOpen]);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    if (subCategoryMap[catId] && subCategoryMap[catId].length > 0) {
      setActiveSubCategory(subCategoryMap[catId][0].id);
    } else {
      setActiveSubCategory(null);
    }
  };

  const sidebarContent = (
    <>
      <div 
        onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
        className="flex items-center text-gray-400 mb-12 cursor-pointer hover:text-black transition-colors"
      >
        <Search size={18} className="mr-3" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase">{t('search')}</span>
      </div>

      <div className="flex flex-col relative">
        {/* Continuous vertical line in background */}
        <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-gray-200 z-0"></div>

        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          const subs = subCategoryMap[cat.id] || [];
          
          return (
            <div key={cat.id} className="relative z-10 flex flex-col mb-8">
              {/* Active Indicator Line */}
              {isActive && (
                <motion.div 
                  layoutId="activeCategoryIndicator"
                  className="absolute left-[3px] top-[4px] bottom-auto w-[2px] h-4 bg-black -translate-x-[0.5px]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div 
                onClick={() => handleCategoryClick(cat.id)}
                className={clsx(
                  "pl-8 text-[13px] font-black uppercase tracking-[0.25em] cursor-pointer transition-colors duration-300 py-1 flex items-center justify-between",
                  isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <span>{cat.label}</span>
                <span className={clsx(
                  "text-[10px] pr-8 transition-colors",
                  isActive ? "text-gray-500" : "text-gray-400"
                )}>
                  ({products.filter(p => p.category === cat.id && ((p.department || 'men') === activeDepartment)).length})
                </span>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden flex flex-col space-y-4 mt-5 mb-2 pl-8 pr-8"
                  >
                    {subs.map((sub) => {
                      const isSubActive = sub.id === activeSubCategory;
                      const count = products.filter(p => p.category === cat.id && p.subCategory === sub.id && ((p.department || 'men') === activeDepartment)).length;
                      const hasItems = count > 0;
                      
                      return (
                        <div 
                          key={sub.id} 
                          onClick={() => {
                            if (hasItems) {
                              setActiveSubCategory(sub.id);
                              if (window.innerWidth < 1024) {
                                setIsMobileMenuOpen(false);
                              }
                            }
                          }}
                          className={clsx(
                            "text-xs transition-all duration-300 uppercase tracking-[0.15em] flex items-center justify-between",
                            hasItems ? "cursor-pointer" : "cursor-not-allowed opacity-60",
                            isSubActive ? "text-black font-bold" : (hasItems ? "text-gray-500 hover:text-black" : "text-gray-400")
                          )}
                        >
                          <div className="flex items-center">
                            {isSubActive && <span className="w-1.5 h-1.5 bg-black rounded-full mr-3" />}
                            {!isSubActive && <span className="w-1.5 h-1.5 bg-transparent rounded-full mr-3" />}
                            {sub.label}
                          </div>
                          <span className={clsx(
                            "text-[10px] font-bold",
                            isSubActive ? "text-gray-500" : "text-gray-400"
                          )}>({count})</span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 pl-12 flex-col items-start z-40 pointer-events-auto">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#f4f4f4] z-[70] p-8 overflow-y-auto lg:hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-12 flex flex-col space-y-6 mt-4">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveDepartment('men'); navigateTo('home'); setIsMobileMenuOpen(false); }}
                  className={clsx("text-2xl font-anton uppercase tracking-widest", activeDepartment === 'men' ? "text-black" : "text-gray-400")}
                >
                  {t('men')}
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setActiveDepartment('woman'); navigateTo('home'); setIsMobileMenuOpen(false); }}
                  className={clsx("text-2xl font-anton uppercase tracking-widest", activeDepartment === 'woman' ? "text-black" : "text-gray-400")}
                >
                  {t('woman')}
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('blog'); setIsMobileMenuOpen(false); }}
                  className="text-2xl font-anton uppercase tracking-widest text-gray-400 hover:text-black"
                >
                  {t('blog')}
                </a>
              </div>

              <div className="h-[1px] w-full bg-gray-200 mb-12" />

              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
