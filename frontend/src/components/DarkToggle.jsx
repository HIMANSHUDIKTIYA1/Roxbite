import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  // Load theme from localStorage or system preference
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Update DOM & localStorage when toggled
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark((d) => !d)}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full 
        bg-white/30 dark:bg-black/30 backdrop-blur-md 
        shadow-lg border border-white/20 hover:scale-110 transition-all duration-300 ${className}`}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center"
          >
            <FaSun className="text-yellow-300 text-xl" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center"
          >
            <FaMoon className="text-indigo-500 text-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
