import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children, pageKey }) => {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
