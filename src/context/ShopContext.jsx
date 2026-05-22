import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { products } from '../data/mockData';
import { translations } from '../data/translations';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [viewMode, setViewMode] = useState('gallery');
  const [activeCategory, setActiveCategory] = useState('shoes');
  const [activeSubCategory, setActiveSubCategory] = useState('sneakers');
  const [activeDepartment, setActiveDepartment] = useState('men');
  const [activeInfoPage, setActiveInfoPage] = useState('contact');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((title, subtitle, image) => {
    const id = Date.now();
    setToast({ title, subtitle, image, id });
    setTimeout(() => {
      setToast(prev => (prev && prev.id === id ? null : prev));
    }, 3000);
  }, []);

  const navigateTo = useCallback((page, product = null) => {
    setCurrentPage(page);
    if (product) setSelectedProduct(product);
  }, []);

  const addToCart = useCallback((product, size, color) => {
    setCartItems(prev => [...prev, { ...product, selectedSize: size, selectedColor: color, cartId: Date.now() }]);
    showToast(language === 'en' ? 'Added to Cart' : 'Добавлено в корзину', `${product.brand} ${product.name[language]}`, color.image);
  }, [language, showToast]);

  const removeFromCart = useCallback((cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleWishlist = useCallback((product, color) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id && item.selectedColor.name === color.name);
      if (exists) {
        showToast(language === 'en' ? 'Removed from Wishlist' : 'Удалено из избранного', `${product.brand} ${product.name[language]}`, color.image);
        return prev.filter(item => !(item.id === product.id && item.selectedColor.name === color.name));
      } else {
        showToast(language === 'en' ? 'Added to Wishlist' : 'Добавлено в избранное', `${product.brand} ${product.name[language]}`, color.image);
        return [...prev, { ...product, selectedColor: color, wishlistId: Date.now() }];
      }
    });
  }, [language, showToast]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrency(prev => prev === 'USD' ? 'RUB' : 'USD');
  }, []);

  const t = useCallback((key) => translations[language][key] || key, [language]);

  const formatPrice = useCallback((priceInUSD) => {
    if (currency === 'RUB') {
      return `${(priceInUSD * 100).toLocaleString('ru-RU')} ₽`;
    }
    return `$${priceInUSD.toLocaleString('en-US')}`;
  }, [currency]);

  const contextValue = useMemo(() => ({
    currentPage, selectedProduct, cartItems, wishlistItems, products,
    navigateTo, addToCart, removeFromCart, clearCart, toggleWishlist,
    isCartOpen, setIsCartOpen, isWishlistOpen, setIsWishlistOpen,
    language, toggleLanguage, currency, toggleCurrency, t,
    viewMode, setViewMode, activeCategory, setActiveCategory,
    activeSubCategory, setActiveSubCategory, activeDepartment, setActiveDepartment,
    activeInfoPage, setActiveInfoPage, isSearchOpen, setIsSearchOpen,
    isMobileMenuOpen, setIsMobileMenuOpen, formatPrice, toast
  }), [
    currentPage, selectedProduct, cartItems, wishlistItems, 
    navigateTo, addToCart, removeFromCart, clearCart, toggleWishlist,
    isCartOpen, isWishlistOpen, language, toggleLanguage, currency, toggleCurrency, t,
    viewMode, activeCategory, activeSubCategory, activeDepartment,
    activeInfoPage, isSearchOpen, isMobileMenuOpen, formatPrice, toast
  ]);

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};
