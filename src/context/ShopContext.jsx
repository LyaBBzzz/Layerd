import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { products } from '../data/mockData';
import { translations } from '../data/translations';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [currency, setCurrency] = useState('RUB');
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

  const handleSetActiveDepartment = useCallback((dept) => {
    setActiveDepartment(dept);
    setActiveCategory('shoes');
    setActiveSubCategory('sneakers');
  }, []);

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
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor?.name === color.name
      );
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: (newItems[existingItemIndex].quantity || 1) + 1
        };
        return newItems;
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, cartId: Date.now(), quantity: 1 }];
    });
    showToast(language === 'en' ? 'Added to Cart' : 'Добавлено в корзину', `${product.brand} ${product.name[language]}`, color.image);
  }, [language, showToast]);

  const updateQuantity = useCallback((cartId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = (item.quantity || 1) + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  }, []);

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
    currentPage, setCurrentPage, selectedProduct, setSelectedProduct, products,
    cartItems, setCartItems, wishlistItems, setWishlistItems,
    navigateTo, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist,
    isCartOpen, setIsCartOpen, isWishlistOpen, setIsWishlistOpen,
    language, toggleLanguage, currency, toggleCurrency, t,
    viewMode, setViewMode, activeCategory, setActiveCategory,
    activeSubCategory, setActiveSubCategory, activeDepartment, setActiveDepartment: handleSetActiveDepartment,
    activeInfoPage, setActiveInfoPage, isSearchOpen, setIsSearchOpen,
    isMobileMenuOpen, setIsMobileMenuOpen, formatPrice, toast
  }), [
    currentPage, selectedProduct, cartItems, wishlistItems, 
    navigateTo, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist,
    isCartOpen, isWishlistOpen, language, toggleLanguage, currency, toggleCurrency, t,
    viewMode, activeCategory, activeSubCategory, activeDepartment, handleSetActiveDepartment,
    activeInfoPage, isSearchOpen, isMobileMenuOpen, formatPrice, toast
  ]);

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};
