import React from 'react';
import { Search } from 'lucide-react';
import { CustomSelect } from '../CustomSelect';
import { ProductCard } from './ProductCard';

export const HomeList = ({ 
  displayedProducts, language, t, filterSize, setFilterSize, 
  allAvailableSizes, filterColor, setFilterColor, allAvailableColors, 
  sortOrder, setSortOrder, searchQuery, setSearchQuery 
}) => {
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
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

        <div className="grid grid-cols-3 md:flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <CustomSelect 
            value={filterSize}
            onChange={(val) => setFilterSize(val)}
            options={[
              { value: '', label: t('allSizes') },
              ...allAvailableSizes.map(s => ({ value: s, label: s }))
            ]}
            placeholder={t('allSizes')}
            className="w-full bg-transparent border border-gray-300 rounded-full px-2 md:px-4 py-2 text-[10px] sm:text-xs font-bold outline-none cursor-pointer hover:border-black transition-colors flex justify-center"
          />

          <CustomSelect 
            value={filterColor}
            onChange={(val) => setFilterColor(val)}
            options={[
              { value: '', label: t('allColors') },
              ...allAvailableColors.map(c => ({ value: c, label: c }))
            ]}
            placeholder={t('allColors')}
            className="w-full bg-transparent border border-gray-300 rounded-full px-2 md:px-4 py-2 text-[10px] sm:text-xs font-bold outline-none cursor-pointer hover:border-black transition-colors flex justify-center"
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
            className="w-full bg-transparent border border-gray-300 rounded-full px-2 md:px-4 py-2 text-[10px] sm:text-xs font-bold outline-none cursor-pointer hover:border-black transition-colors flex justify-center"
          />
        </div>
      </div>

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
            <ProductCard key={product.id} product={product} initialColor={filterColor} />
          ))}
        </div>
      )}
    </>
  );
};
