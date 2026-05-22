import React from 'react';
import { ShoppingBag, Search, Menu, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MagneticButton } from './MagneticButton';
import clsx from 'clsx';

export const TopNav = () => {
  const { cartItems, wishlistItems, language, toggleLanguage, currency, toggleCurrency, t, navigateTo, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen, activeDepartment, setActiveDepartment, currentPage, isMobileMenuOpen, setIsMobileMenuOpen, setViewMode } = useShop();

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 lg:px-8 py-4 z-50 bg-[#f4f4f4]/80 backdrop-blur-md border-b border-gray-200/50">
      
      {/* Left Side (Mobile Menu only) */}
      <div className="flex items-center flex-1 z-10 pointer-events-none">
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center pointer-events-auto">
          {currentPage === 'blog' ? (
            <button 
              onClick={() => navigateTo('home')}
              className="text-black hover:text-gray-500 transition-colors flex items-center"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-black transition-colors flex items-center"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </div>
      
      {/* Absolute Center Container */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Desktop Left Nav */}
        <nav className="hidden lg:flex flex-1 justify-end items-center space-x-6 mr-8 text-xs font-bold tracking-widest uppercase text-gray-400 pointer-events-auto">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveDepartment('men'); navigateTo('home'); }}
            className={clsx("transition-colors flex items-center", activeDepartment === 'men' && currentPage === 'home' ? "text-black border-b border-black" : "hover:text-black")}
          >
            {t('men')}
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveDepartment('woman'); navigateTo('home'); }}
            className={clsx("transition-colors flex items-center", activeDepartment === 'woman' && currentPage === 'home' ? "text-black border-b border-black" : "hover:text-black")}
          >
            {t('woman')}
          </a>
        </nav>

        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('home'); setViewMode('gallery'); }} 
          className="text-black text-lg tracking-[0.2em] font-black flex items-center pointer-events-auto shrink-0"
        >
          LAYERED
        </a>

        {/* Desktop Right Nav */}
        <nav className="hidden lg:flex flex-1 justify-start items-center space-x-6 ml-8 text-xs font-bold tracking-widest uppercase text-gray-400 pointer-events-auto">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigateTo('blog'); }} 
            className={clsx("transition-colors flex items-center", currentPage === 'blog' ? "text-black border-b border-black" : "hover:text-black")}
          >
            {t('blog')}
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setIsWishlistOpen(true); }} className="relative hover:text-black transition-colors flex items-center">
            {t('wishlist')}
            {wishlistItems.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </a>
        </nav>
      </div>

      {/* Right side icons */}
      <div className="flex-1 flex justify-end items-center space-x-4 lg:space-x-6 z-10 pointer-events-none">
        <MagneticButton className="pointer-events-auto">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-400 hover:text-black transition-colors hidden sm:block p-2"
          >
            <Search size={18} />
          </button>
        </MagneticButton>
        <MagneticButton className="pointer-events-auto">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-gray-400 hover:text-black transition-colors flex items-center p-2"
          >
            <ShoppingBag size={18} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </MagneticButton>
        <div className="flex space-x-3 pointer-events-auto">
          <div 
            onClick={toggleCurrency}
            className="text-xs font-bold text-gray-400 cursor-pointer hover:text-black flex items-center"
          >
            {currency} <span className="text-[10px] ml-1">▼</span>
          </div>
          <div className="w-[1px] h-4 bg-gray-300"></div>
          <div 
            onClick={toggleLanguage}
            className="text-xs font-bold text-gray-400 cursor-pointer hover:text-black flex items-center"
          >
            {language.toUpperCase()} <span className="text-[10px] ml-1">▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};
