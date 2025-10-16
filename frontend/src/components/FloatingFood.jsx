// components/FloatingFood.jsx
"use client";
import { motion } from "framer-motion";


const FloatingFood = ({ src, size = 100, speed = 1, alt }) => {
  return (
    <motion.div
      className="relative"
      initial={{ y: 0, scale: 1 }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 4, -4, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 4 * speed,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.15,
        rotate: 5,
        filter: "drop-shadow(0px 0px 25px rgba(255, 100, 0, 0.6))",
      }}
    >
      <div
        className="rounded-full p-2 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-orange-400/70 transition-all duration-500"
        style={{
          width: size,
          height: size,
          boxShadow:
            "0px 10px 25px rgba(0,0,0,0.25), 0px 0px 25px rgba(255,165,0,0.3)",
        }}
      >
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-contain rounded-full hover:scale-105 transition-transform duration-300"
        ></img>
        
      </div>
    </motion.div>
  );
};

export default FloatingFood;
