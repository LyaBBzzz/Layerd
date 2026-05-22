import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MessageCircle, Mail, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import clsx from 'clsx';

export const Footer = () => {
  const { language, t, navigateTo, setActiveInfoPage } = useShop();

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError(language === 'ru' ? 'Пожалуйста, введите ваш email' : 'Please enter your email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(language === 'ru' ? 'Пожалуйста, введите корректный адрес электронной почты' : 'Please enter a valid email address');
      return;
    }

    setIsSubscribed(true);
    setEmail('');
    setEmailError('');
  };

  return (
    <footer className="relative z-10 shrink-0 w-full max-w-5xl mx-auto mt-4 pt-8 pb-12 border-t border-gray-200 bg-[#f4f4f4]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Newsletter */}
        <div className="lg:col-span-2">
          <h3 className="font-anton text-4xl uppercase mb-4">{t('newsletter')}</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-md leading-relaxed">{t('newsletterDesc')}</p>
          {isSubscribed ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center text-green-600 font-bold text-sm bg-green-50 px-4 py-3 rounded-xl border border-green-200"
            >
              <Check size={18} className="mr-2" />
              {t('subscribeSuccess') || 'Successfully subscribed!'}
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col relative" noValidate>
              <div className="flex w-full">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="Email address..." 
                  className={clsx(
                    "bg-transparent border-b py-2 outline-none flex-1 font-bold text-sm placeholder-gray-400 transition-colors",
                    emailError ? "border-red-500 text-red-500 focus:border-red-500" : "border-black focus:border-black/50"
                  )}
                />
                <button type="submit" className={clsx("flex items-center justify-center border-b py-2 px-4 hover:bg-black hover:text-white transition-colors", emailError ? "border-red-500" : "border-black")}>
                  <ArrowRight size={16} />
                </button>
              </div>
              <AnimatePresence>
                {emailError && (
                  <motion.span 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-[10px] font-bold mt-2 absolute -bottom-5 left-0 uppercase tracking-widest"
                  >
                    {emailError}
                  </motion.span>
                )}
              </AnimatePresence>
            </form>
          )}
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">{t('customerService')}</h4>
          <ul className="space-y-4 text-xs font-medium text-gray-500">
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('contact'); }} className="hover:text-black transition-colors">{t('contactUs')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('shipping'); }} className="hover:text-black transition-colors">{t('shipping')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('faq'); }} className="hover:text-black transition-colors">{t('faq')}</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">{t('aboutUs')}</h4>
          <ul className="space-y-4 text-xs font-medium text-gray-500">
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('story'); }} className="hover:text-black transition-colors">{t('ourStory')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('careers'); }} className="hover:text-black transition-colors">{t('careers')}</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('legal'); }} className="hover:text-black transition-colors">{t('legal')}</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" title="Instagram">
            <Globe size={18} />
          </a>
          <a href="https://wa.me/18001234567" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" title="WhatsApp">
            <MessageCircle size={18} />
          </a>
          <a href="mailto:support@layered.com" className="text-gray-400 hover:text-black transition-colors" title="Email Us">
            <Mail size={18} />
          </a>
        </div>
        
        <div className="flex space-x-6 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('privacy'); }} className="hover:text-black transition-colors">{t('privacyPolicy')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('info'); setActiveInfoPage('terms'); }} className="hover:text-black transition-colors">{t('termsOfService')}</a>
          <span>&copy; {new Date().getFullYear()} LAYERED</span>
        </div>
      </div>
      
      <div className="mt-8 text-center text-[9px] uppercase tracking-widest text-gray-400 font-bold flex flex-col space-y-2">
        <span>{t('fictionalStore')}</span>
        <span className="text-gray-300 tracking-[0.3em]">DESIGNED AND DEVELOPED BY KLIMANOV</span>
      </div>
    </footer>
  );
};
