import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4 group">
      <button 
        className="flex justify-between items-center w-full text-left cursor-pointer outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs font-bold group-hover:text-gray-500 transition-colors duration-200">{title}</span>
        <span className="group-hover:bg-gray-100 p-1 rounded-full transition-colors duration-200 text-gray-500 group-hover:text-black">
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-xs text-gray-500 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
