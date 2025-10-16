import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FloatingFood from '../components/FloatingFood';
import DarkToggle from '../components/DarkToggle';
import { FaApple, FaGooglePlay, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Replace with your generated hero image path or SVG
const HERO_IMG = '/hero.jpg'; // ensure this exists in public/

  

const MainPage = () => {
    const dishes = [
  {
    id: 1,
    name: "Creamy Italian Pasta",
    description:
      "Rich Alfredo sauce blended with parmesan and herbs — served hot with garlic bread.",
    img: "/food-card-1.jpg",
    bg: "from-rose-100 to-orange-50 dark:from-gray-800 dark:to-gray-900",
  },
  {
    id: 2,
    name: "Classic Hot Dog",
    description:
      "Juicy grilled sausage wrapped in a soft bun, topped with mustard and crunchy onions.",
    img: "/food-card-2.jpg",
    bg: "from-yellow-100 to-amber-50 dark:from-gray-800 dark:to-gray-900",
  },
  {
    id: 3,
    name: "Spicy Tasty Chowmein",
    description:
      "Street-style noodles tossed with fresh veggies, soy sauce, and a spicy kick.",
    img: "/food-card-3.jpg",
    bg: "from-blue-100 to-teal-50 dark:from-gray-800 dark:to-gray-900",
  },
];
    const loginRef = useRef();

  const scrollToAuth = () => {
    loginRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
const loginClassRef = useRef();

  
  
  useEffect(() => {
    const elem = loginClassRef.current;

    const handleMouseEnter = () => {
     elem.innerText = "Login / Signup";
    };
    const handleMouseLeave = () => {
     elem.innerText = "Login";
    };

    elem.addEventListener("mouseenter", handleMouseEnter);
    elem.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup when component unmounts
    return () => {
      elem.removeEventListener("mouseenter", handleMouseEnter);
      elem.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
     <div className="relative min-h-screen bg-gradient-to-b from-pink-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">
      {/* decorative bg shapes */}
      <div className="absolute left-[-10%] top-10 w-[420px] h-[420px] bg-pink-400/30 rounded-full bg-shape"></div>
      <div className="absolute right-[-10%] top-52 w-[520px] h-[520px] bg-violet-500/20 rounded-full bg-shape"></div>

      {/* Dark toggle top-right */}
      <div className="fixed top-6 right-6 z-50">
        <DarkToggle />
      </div>

      {/* Hero */}
      <section className="relative z-20 pt-24 pb-12 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              RoxBite — <span className="text-pink-500">Food</span> that moves you.
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
              Discover top restaurants, watch quick food reels, and order instantly — all in one smooth experience.
              Scroll down to see how foods float, move and invite action. Designed for youth, built for speed.
            </p>

            <div className="flex flex-wrap gap-4 items-center mt-4">
              <button className="px-6 py-3 rounded-full btn-glow bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-lg transform hover:scale-105 transition">
                Order Now
              </button>

              <button className="px-5 py-3 rounded-full glass border border-white/10 hover:backdrop-brightness-110 transition">
                Explore Services
              </button>

              <div className="flex items-center gap-3 ml-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">App available on</span>
                <a href="#" className="flex items-center gap-2 px-3 py-1 glass rounded-full">
                  <FaApple /> <span className="text-sm">App Store</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-3 py-1 glass rounded-full">
                  <FaGooglePlay /> <span className="text-sm">Google Play</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right hero visual block */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-[320px] h-[360px] md:w-[420px] md:h-[480px]">
              {/* glass panel behind */}
              <motion.div
                initial={{ rotate: -6, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0 glass  rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center"
              >
                <img src={HERO_IMG} alt="RoxBite hero" className=" pointer-events-none" />
              </motion.div>

              {/* Floating small foods around hero */}
              // Inside your Hero.jsx
<div className="absolute -left-10 -top-16 sm:-left-6 sm:-top-12 z-10">
  <FloatingFood src="/fry.png" size={100} speed={0.8} alt="fries" />
</div>

<div className="absolute right-[-36px] top-0 sm:right-[-48px]  sm:top-4 z-20">
  <FloatingFood src="/coca.png" className="bg-cover" size={90} speed={0.6} alt="coca" />
</div>

<div className="absolute right-6 bottom-[-4rem] sm:right-8 sm:bottom-[-2rem] z-10">
  <FloatingFood src="/burger.png" size={110} speed={1} alt="burger" />
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Animated scroll-section: foods flying across as we scroll */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto relative overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Experience the Movement</h3>

          <div className="space-y-8">
               <div className="flex flex-col gap-10 py-12">
      {dishes.map((dish, index) => (
        <motion.div
          key={dish.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
          className={`glass bg-gradient-to-br ${dish.bg} p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-xl`}
        >
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-start"
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <img
              src={dish.img}
              alt={dish.name}
              className="w-56 md:w-72 rounded-2xl drop-shadow-2xl"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="flex-1 text-center md:text-left"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {dish.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
              {dish.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Order Now 🍴
            </motion.button>
          </motion.div>
        </motion.div>
      ))}
    </div>
          </div>
        </div>
      </section>

      {/* Services / Features */}
     <section className="py-16 px-6 md:px-24">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {[
  {
    title: "Fast Delivery",
    desc: "Hot and fresh food under 30 minutes — guaranteed.",
    icon: "🚀",
    color: "from-red-400/30 to-orange-300/20",
  },
  {
    title: "Top Restaurants",
    desc: "Only the best and highest-rated kitchens handpicked for you.",
    icon: "⭐",
    color: "from-yellow-400/30 to-amber-300/20",
  },
  {
    title: "Easy Payment",
    desc: "All major cards, wallets & UPI supported securely.",
    icon: "💳",
    color: "from-blue-400/30 to-indigo-300/20",
  },
].map((f, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.07,
              boxShadow: "0 0 25px rgba(255,255,255,0.2)",
            }}
            className={`relative glass p-8 rounded-2xl text-center backdrop-blur-md border border-white/20 bg-gradient-to-br ${f.color} hover:bg-opacity-50 transition`}
          >
            {/* Glow background aura */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-white/5 pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Icon */}
            <motion.div
              className="text-5xl mb-4 drop-shadow-lg"
              whileHover={{
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.6 },
              }}
            >
              {f.icon}
            </motion.div>

            {/* Text */}
            <h5 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
              {f.title}
            </h5>
            <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>

      {/* App & CTA strip */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 glass p-6 rounded-3xl">
          <div>
            <h4 className="text-2xl text-gray-600 dark:text-gray-100 font-bold">Get the app — Order on the go</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Install RoxBite for a seamless ordering experience and exclusive offers.</p>
          </div>

          <div className="flex items-center gap-3">
            <a className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full" href="#">
              <FaApple /> App Store
            </a>
            <a className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full" href="#">
              <FaGooglePlay /> Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Auth anchor — arrow CTA */}
      <div ref={loginRef} className="relative">
      <div className="max-w-6xl mx-auto flex justify-center py-10"> {/* py-6 से py-10 किया */}
        
       
        <motion.button
          onClick={scrollToAuth}
          whileHover={{ scale: 1.05 }} 
          className="flex flex-col items-center gap-3 group focus:outline-none" 
          aria-label="Go to login"
        >
          
         
          <div 
         
            className="
              p-4 rounded-full shadow-2xl transition-all duration-300 ease-in-out 
              
              bg-gradient-to-br from-indigo-500 to-purple-600 
           
              dark:from-indigo-600 dark:to-purple-700
         
              group-hover:from-pink-500 group-hover:to-red-500
              group-hover:shadow-indigo-500/50 
            "
          >

        <Link to="/register">
          <FaSignInAlt
            className="
              text-2xl text-white transition-transform duration-300 ease-in-out
              group-hover:-translate-y-1 
            "
          />
        </Link>
          
          </div>
          
          <span 
           ref={loginClassRef}
            className="
              text-lg font-semibold transition-colors duration-300
              text-gray-800 dark:text-gray-200 
             
              group-hover:text-purple-600 dark:group-hover:text-pink-400
            "
          >
          Login
          </span>
          
        </motion.button>
      </div>
    </div>
      {/* Footer */}
      <footer className="py-10 px-6 mt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h5 className="font-bold text-xl">RoxBite</h5>
            <p className="text-gray-600 dark:text-gray-300">Delicious food, delivered fast. Built with love and motion.</p>
          </div>

          <div className="flex gap-8">
            <div>
              <h6 className="font-semibold">Company</h6>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold">Support</h6>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>

          <div className="text-right">
            <h6 className="font-semibold">Contact</h6>
            <p className="mt-3 text-gray-600">support@roxbite.example</p>
            <p className="mt-3 text-gray-600">© {new Date().getFullYear()} RoxBite</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default MainPage;