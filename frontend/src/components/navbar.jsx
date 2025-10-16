import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme toggle logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navItems = ["Home", "Reels", "Menu", "About", "Login"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 text-gray-800 dark:text-gray-100">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaUtensils className="text-red-500 text-2xl drop-shadow-lg" />
          <span className="font-extrabold text-xl tracking-wide">
           Rox<span className="text-red-500">Bite</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={`/${item.toLowerCase()}`}
              whileHover={{
                scale: 1.1,
                color: "#ef4444",
                textShadow: "0px 0px 8px rgba(239,68,68,0.7)",
              }}
              className="font-medium transition-all duration-300"
            >
              {item}
            </motion.a>
          ))}

          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.8, rotate: 90 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg shadow-lg"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-lg" />
            ) : (
              <FaMoon className="text-gray-700 text-lg" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Icon */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden flex flex-col items-center gap-4 py-4 bg-white/50 dark:bg-black/60 backdrop-blur-xl text-gray-800 dark:text-gray-100"
        >
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={`/${item.toLowerCase()}`}
              whileHover={{ scale: 1.1, color: "#ef4444" }}
              onClick={() => setMenuOpen(false)}
              className="font-semibold tracking-wide text-lg"
            >
              {item}
            </motion.a>
          ))}

          <motion.button
            whileTap={{ scale: 0.8, rotate: 90 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white/30 dark:bg-gray-700/50 backdrop-blur-md shadow-md"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-lg" />
            ) : (
              <FaMoon className="text-gray-700 text-lg" />
            )}
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;