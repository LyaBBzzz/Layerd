import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

export const ToastNotification = () => {
  const { toast } = useShop();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="bg-black/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl flex items-center shadow-2xl pointer-events-auto"
          >
            {toast.image && (
              <div className="w-12 h-12 bg-white/10 rounded-xl mr-4 overflow-hidden flex items-center justify-center p-1 shrink-0">
                <img src={toast.image} alt="" className="w-full h-full object-contain drop-shadow-md" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">{toast.title}</span>
              <span className="font-anton text-sm tracking-wide leading-tight">{toast.subtitle}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
