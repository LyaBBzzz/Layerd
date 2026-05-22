import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 800); // give time for exit animation
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f4f4f4]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.h1 
            className="font-anton text-4xl md:text-6xl tracking-[0.3em] uppercase text-black"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            LAYERED
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
