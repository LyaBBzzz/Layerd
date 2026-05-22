import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import clsx from 'clsx';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, clearCart, language, t, formatPrice } = useShop();
  const [checkoutStep, setCheckoutStep] = React.useState('cart'); // 'cart', 'form', 'success'
  
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = React.useState({});

  const closeCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setFormData({ name: '', email: '', phone: '', address: '' });
      setErrors({});
    }, 300);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = language === 'ru' ? 'Введите ваше имя' : 'Please enter your name';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = language === 'ru' ? 'Введите ваш email' : 'Please enter your email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = language === 'ru' ? 'Введите корректный email' : 'Please enter a valid email';
    }

    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'ru' ? 'Введите телефон' : 'Please enter your phone';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = language === 'ru' ? 'Введите корректный номер телефона' : 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) newErrors.address = language === 'ru' ? 'Введите адрес' : 'Please enter your address';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCheckoutStep('processing');
      setTimeout(() => {
        clearCart();
        setCheckoutStep('success');
      }, 2000); // Simulate network request for 2 seconds
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-[110] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-anton text-3xl uppercase">{t('cart') || 'CART'}</h2>
              <button 
                onClick={closeCart}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="wait">
                {checkoutStep === 'cart' && (
                  <motion.div 
                    key="cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p className="font-bold text-sm uppercase tracking-widest">{t('emptyCart') || 'YOUR CART IS EMPTY'}</p>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.cartId} className="flex space-x-4 bg-[#f4f4f4] p-4 rounded-2xl relative">
                          <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2">
                            <img src={item.selectedColor ? item.selectedColor.image : item.colors[0].image} alt={item.name[language]} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start">
                              <h3 className="font-anton text-xl uppercase leading-none mb-1">{item.brand}</h3>
                            </div>
                            <p className="text-gray-500 text-xs font-bold mb-2 pr-6">{item.name[language]}</p>
                            <div className="flex items-center space-x-3 text-xs font-bold text-gray-400">
                              <span>{t('size') || 'SIZE'}: {item.selectedSize}</span>
                              {item.selectedColor && (
                                <span className="flex items-center">
                                  <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.selectedColor.colorCode, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}></span>
                                  {item.selectedColor.name}
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="font-anton text-lg">{formatPrice(item.price * (item.quantity || 1))}</div>
                              <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm border border-gray-100">
                                <button onClick={() => updateQuantity(item.cartId, -1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors">-</button>
                                <span className="text-xs font-bold w-6 text-center">{item.quantity || 1}</span>
                                <button onClick={() => updateQuantity(item.cartId, 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors">+</button>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}

                {checkoutStep === 'form' && (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="mb-6 flex justify-between items-center">
                      <h3 className="font-bold text-sm uppercase tracking-widest">{language === 'en' ? 'Delivery Details' : 'Данные для доставки'}</h3>
                      <button onClick={() => setCheckoutStep('cart')} className="text-xs font-bold text-gray-400 hover:text-black uppercase">
                        {language === 'en' ? 'Back' : 'Назад'}
                      </button>
                    </div>
                    <form onSubmit={handleCheckoutSubmit} className="space-y-6" noValidate>
                      <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 mb-1">{language === 'en' ? 'Full Name' : 'ФИО'}</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => { setFormData({...formData, name: e.target.value}); if(errors.name) setErrors({...errors, name: null}); }}
                          className={clsx("w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors", errors.name ? "border-red-500 text-red-500 focus:border-red-500" : "border-gray-200 focus:border-black")} 
                        />
                        <AnimatePresence>
                          {errors.name && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-red-500 text-[10px] font-bold absolute -bottom-4 left-0 uppercase tracking-widest">{errors.name}</motion.span>}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 mb-1">{language === 'en' ? 'Email' : 'Email'}</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => { setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: null}); }}
                          className={clsx("w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors", errors.email ? "border-red-500 text-red-500 focus:border-red-500" : "border-gray-200 focus:border-black")} 
                        />
                        <AnimatePresence>
                          {errors.email && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-red-500 text-[10px] font-bold absolute -bottom-4 left-0 uppercase tracking-widest">{errors.email}</motion.span>}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 mb-1">{language === 'en' ? 'Phone' : 'Телефон'}</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => { setFormData({...formData, phone: e.target.value}); if(errors.phone) setErrors({...errors, phone: null}); }}
                          className={clsx("w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors", errors.phone ? "border-red-500 text-red-500 focus:border-red-500" : "border-gray-200 focus:border-black")} 
                        />
                        <AnimatePresence>
                          {errors.phone && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-red-500 text-[10px] font-bold absolute -bottom-4 left-0 uppercase tracking-widest">{errors.phone}</motion.span>}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 mb-1">{language === 'en' ? 'Address' : 'Адрес доставки'}</label>
                        <textarea 
                          rows={3} 
                          value={formData.address}
                          onChange={(e) => { setFormData({...formData, address: e.target.value}); if(errors.address) setErrors({...errors, address: null}); }}
                          className={clsx("w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none", errors.address ? "border-red-500 text-red-500 focus:border-red-500" : "border-gray-200 focus:border-black")}
                        ></textarea>
                        <AnimatePresence>
                          {errors.address && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-red-500 text-[10px] font-bold absolute -bottom-4 left-0 uppercase tracking-widest">{errors.address}</motion.span>}
                        </AnimatePresence>
                      </div>
                      <button type="submit" className="w-full mt-6 py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors">
                        {language === 'en' ? 'Confirm Order' : 'Подтвердить заказ'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {checkoutStep === 'processing' && (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>
                    <h3 className="font-anton text-2xl uppercase mb-2 tracking-widest">
                      {language === 'en' ? 'Processing Payment...' : 'Обработка платежа...'}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {language === 'en' ? 'Please do not close this window.' : 'Пожалуйста, не закрывайте окно.'}
                    </p>
                  </motion.div>
                )}

                {checkoutStep === 'success' && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                      className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <motion.polyline 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          points="20 6 9 17 4 12"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="font-anton text-3xl uppercase mb-2">
                      {language === 'en' ? 'Order Placed!' : 'Заказ оформлен!'}
                    </h3>
                    <p className="text-gray-500 text-sm mb-8">
                      {language === 'en' ? 'Thank you for your purchase. We will contact you soon.' : 'Спасибо за покупку. Мы скоро свяжемся с вами.'}
                    </p>
                    <button 
                      onClick={closeCart}
                      className="px-8 py-3 bg-[#f4f4f4] text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                      {language === 'en' ? 'Continue Shopping' : 'Продолжить покупки'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white">
              {checkoutStep === 'cart' && (
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('total') || 'TOTAL'}</span>
                    <span className="font-anton text-3xl">{formatPrice(totalPrice)}</span>
                  </div>
                  <button 
                    disabled={cartItems.length === 0}
                    onClick={() => setCheckoutStep('form')}
                    className="w-full py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('checkout') || 'CHECKOUT'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
