import React from 'react';
import clsx from 'clsx';
import { useShop } from '../context/ShopContext';

export const CategoriesBar = () => {
  const { t, activeCategory, setActiveCategory, activeSubCategory, setActiveSubCategory } = useShop();

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

  const currentSubCategories = subCategoryMap[activeCategory] || [];

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    if (subCategoryMap[catId] && subCategoryMap[catId].length > 0) {
      setActiveSubCategory(subCategoryMap[catId][0].id);
    } else {
      setActiveSubCategory(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-8 pb-12">
      <div className="flex space-x-8 md:space-x-16 overflow-x-auto no-scrollbar w-full justify-center px-4">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className={clsx(
                "font-anton text-3xl md:text-5xl uppercase leading-none cursor-pointer tracking-wide transition-all",
                isActive ? "text-black" : "text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-400 stroke-text hover:text-gray-400"
              )}
              style={!isActive ? { WebkitTextStroke: '1px #ccc' } : {}}
            >
              {cat.label}
            </div>
          );
        })}
      </div>

      <div className="flex space-x-6 overflow-x-auto no-scrollbar w-full justify-center mt-6 px-4">
        {currentSubCategories.map((sub) => {
          const isActive = sub.id === activeSubCategory;
          return (
            <div 
              key={sub.id} 
              onClick={() => setActiveSubCategory(sub.id)}
              className={clsx(
                "text-xs cursor-pointer hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap",
                isActive ? "text-black font-bold underline underline-offset-4" : "text-gray-500"
              )}
            >
              {sub.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
