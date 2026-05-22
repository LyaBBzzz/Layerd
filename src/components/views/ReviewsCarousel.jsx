import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { ReviewItem } from './ReviewItem';

export const REVIEWS_DATA = [
  {
    name: "Alexander M.",
    rating: 5,
    date: { en: "Oct 24, 2026", ru: "24 Окт, 2026" },
    text: {
      en: "Absolutely stunning quality. The leather is incredibly soft, and the fit is perfect straight out of the box. Worth every penny.",
      ru: "Потрясающее качество. Кожа невероятно мягкая, и они сели идеально прямо из коробки. Стоят каждого потраченного цента."
    }
  },
  {
    name: "Sophie T.",
    rating: 5,
    date: { en: "Sep 12, 2026", ru: "12 Сен, 2026" },
    text: {
      en: "A beautiful minimalist design that pairs well with almost anything. The craftsmanship is highly commendable.",
      ru: "Прекрасный минималистичный дизайн, который сочетается почти со всем. Мастерство заслуживает самой высокой похвалы."
    }
  },
  {
    name: "James L.",
    rating: 4,
    date: { en: "Aug 05, 2026", ru: "05 Авг, 2026" },
    text: {
      en: "Great shoes overall, but they run slightly narrow. I'd recommend sizing up if you have wider feet. Otherwise, exceptional.",
      ru: "В целом отличная обувь, но немного узковата. Рекомендую брать на размер больше, если у вас широкая стопа. В остальном - превосходно."
    }
  }
];

export const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = () => setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);

  return (
    <div className="mt-2 relative">
      <div className="min-h-[110px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ReviewItem review={REVIEWS_DATA[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="flex space-x-1.5 items-center">
          {REVIEWS_DATA.map((_, idx) => (
            <div 
              key={idx} 
              className={clsx("h-1 rounded-full transition-all duration-300", idx === currentIndex ? "w-4 bg-black" : "w-1 bg-gray-300")} 
            />
          ))}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={prev} 
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 hover:text-black"
          >
            <ChevronLeft size={14} />
          </button>
          <button 
            onClick={next} 
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 hover:text-black"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
