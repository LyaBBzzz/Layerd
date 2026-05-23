import React from 'react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const Landing = () => {
  const { navigateTo, language, setActiveDepartment } = useShop();

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-black scroll-smooth">
      
      {/* SECTION 1: MAIN BRAND HERO */}
      <section className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden shrink-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          viewport={{ once: true }}
          src="/images/hero_banner.png" 
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-60"
          alt="Hero"
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.3, once: false }}
          >
            <h1 className="font-anton text-[15vw] xl:text-[200px] uppercase text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              LAYERED
            </h1>
            <p className="text-white/90 font-bold text-xs md:text-sm tracking-[0.3em] uppercase max-w-2xl mx-auto mb-16 drop-shadow-lg">
              {language === 'en' 
                ? 'The pinnacle of avant-garde curation. Discover the new collection.' 
                : 'Вершина авангардной моды. Откройте для себя новую коллекцию.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ amount: 0.3, once: false }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8"
          >
            <button 
              onClick={() => { setActiveDepartment('men'); navigateTo('home'); }}
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center shadow-2xl min-w-[200px] justify-center"
            >
              {language === 'en' ? 'Shop Men' : 'Мужская Коллекция'}
            </button>
            
            <button 
              onClick={() => { setActiveDepartment('woman'); navigateTo('home'); }}
              className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 flex items-center shadow-2xl min-w-[200px] justify-center"
            >
              {language === 'en' ? 'Shop Women' : 'Женская Коллекция'}
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce pointer-events-none">
          <span className="text-white text-[10px] tracking-[0.3em] uppercase mb-2">
            {language === 'en' ? 'Scroll to Explore' : 'Листайте вниз'}
          </span>
          <div className="w-[1px] h-8 bg-white" />
        </div>
      </section>

      {/* SECTION 2: MEN COLLECTION */}
      <section className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden shrink-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          viewport={{ once: true }}
          src="/images/men_hero_banner.png" 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
          alt="Men Collection"
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.3, once: false }}
          >
            <h1 className="font-anton text-[12vw] xl:text-[180px] uppercase text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              NEW MEN
            </h1>
            <p className="text-white/90 font-bold text-xs md:text-sm tracking-[0.3em] uppercase max-w-2xl mx-auto mb-12 drop-shadow-lg">
              {language === 'en' ? 'The pinnacle of avant-garde menswear.' : 'Вершина авангардной мужской моды.'}
            </p>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ amount: 0.3, once: false }}
            onClick={() => { setActiveDepartment('men'); navigateTo('home'); }}
            className="bg-white text-black px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center shadow-2xl min-w-[250px] justify-center group"
          >
            {language === 'en' ? 'Shop Men' : 'Мужская Коллекция'}
            <ArrowRight className="ml-4 transform group-hover:translate-x-2 transition-transform" size={16} />
          </motion.button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce pointer-events-none">
          <span className="text-white text-[10px] tracking-[0.3em] uppercase mb-2">
            {language === 'en' ? 'Scroll to Women' : 'Женская коллекция'}
          </span>
          <div className="w-[1px] h-8 bg-white" />
        </div>
      </section>

      {/* SECTION 3: WOMEN COLLECTION */}
      <section className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden shrink-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          viewport={{ once: true }}
          src="/images/women_hero_banner.png" 
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-60"
          alt="Women Collection"
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.3, once: false }}
          >
            <h1 className="font-anton text-[12vw] xl:text-[180px] uppercase text-white tracking-widest leading-none mb-6 drop-shadow-2xl">
              NEW WOMEN
            </h1>
            <p className="text-white/90 font-bold text-xs md:text-sm tracking-[0.3em] uppercase max-w-2xl mx-auto mb-12 drop-shadow-lg">
              {language === 'en' ? 'Elegance redefined for the modern era.' : 'Элегантность, переосмысленная для новой эры.'}
            </p>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ amount: 0.3, once: false }}
            onClick={() => { setActiveDepartment('woman'); navigateTo('home'); }}
            className="bg-transparent border border-white text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 flex items-center shadow-2xl min-w-[250px] justify-center group"
          >
            {language === 'en' ? 'Shop Women' : 'Женская Коллекция'}
            <ArrowRight className="ml-4 transform group-hover:translate-x-2 transition-transform" size={16} />
          </motion.button>
        </div>
      </section>

    </div>
  );
};
