import React from 'react';
import { Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ReviewItem = ({ review }) => {
  const { language } = useShop();

  return (
    <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-[11px] uppercase tracking-widest text-black">{review.name}</span>
        <div className="flex text-black space-x-1">
          {[...Array(5)].map((_, j) => (
            <Star 
              key={j} 
              size={10} 
              fill={j < review.rating ? "currentColor" : "none"} 
              className={j < review.rating ? "text-black" : "text-gray-200"} 
            />
          ))}
        </div>
      </div>
      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-3 block">
        {review.date[language]}
      </span>
      <p className="text-gray-500 text-xs leading-relaxed font-medium">
        {review.text[language]}
      </p>
    </div>
  );
};
