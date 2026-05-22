import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export const CustomSelect = ({ value, onChange, options, placeholder, className, dropdownClassName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options.find(opt => opt.value === String(value)) || options.find(opt => opt.value === Number(value));
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div 
      className={clsx("relative cursor-pointer select-none", className)} 
      ref={containerRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="w-full h-full flex items-center justify-between">
        <span>{displayLabel}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="ml-3">
          <ChevronDown size={14} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "absolute top-full left-0 mt-2 w-full min-w-max bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden",
              dropdownClassName
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-60 overflow-y-auto no-scrollbar py-2">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "px-5 py-3 text-xs font-bold cursor-pointer transition-all",
                    (value === opt.value || value === String(opt.value) || value === Number(opt.value))
                      ? "bg-black text-white" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-black"
                  )}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
