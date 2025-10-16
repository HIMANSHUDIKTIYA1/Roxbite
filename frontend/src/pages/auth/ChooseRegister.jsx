import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAlt, FaUtensils } from "react-icons/fa";


const ChooseRegister = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 via-white to-yellow-100 dark:from-gray-900 dark:to-gray-800 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating food animation */}
      <motion.img
        src="/fry.png"
        alt="Food Art"
        className="absolute top-16 right-16 w-32 opacity-70 hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-md text-center border border-gray-200 dark:border-gray-700"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-orange-600 dark:text-orange-400 mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join the Foodverse 🍽️
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Choose your role to get started with us.
        </p>

        <div className="flex flex-col gap-4">
          {/* User Register */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/user/register"
              className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-200"
              style={{ textDecoration: "none" }}
            >
              <FaUserAlt className="text-lg" />
              Register as User
            </Link>
          </motion.div>

          {/* Food Partner Register */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/food-partner/register"
              className="flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl shadow-lg transition duration-200"
              style={{ textDecoration: "none" }}
            >
              <FaUtensils className="text-lg" />
              Register as Food Partner
            </Link>
          </motion.div>
        </div>

        <div className="mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            Sign in
          </Link>
        </div>
      </motion.div>

      {/* Bottom floating food icon */}
      <motion.img
        src="/burger.png"
        alt="Burger"
        className="absolute bottom-10 left-10 w-20 opacity-60 hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ChooseRegister;
