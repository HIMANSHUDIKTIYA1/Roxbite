import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Truck, Mail, Lock, Eye, EyeOff } from "lucide-react";
 const ChooseRegister =()=> {
  const [mode, setMode] = useState("customer"); 
  const [isLoginView, setIsLoginView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    shopName: "",
    address: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // basic client validation
    if (!form.name || !form.email || !form.password) {
      alert("Please fill required fields (name, email, password).");
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      role: mode === "customer" ? "customer" : "foodpartner",
    };

    try {
      const user = mode === "customer" ? "user" : "foodPartner";
      const url = isLoginView ? `http://localhost:3000/api/auth/${user}/login` : `http://localhost:3000/api/auth/${user}/register`;
      const res = await axios.post(url, payload, { withCredentials: true });

     
      if (res?.data?.success) {
        alert(res.data.message || (isLoginView ? "Logged in" : "Registered"));
       
      } else {
        alert(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err?.response || err);
      alert(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  }

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left - animated intro + toggle */}
          <div className="flex flex-col gap-6">
            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight"
            >
              Join TasteHub — <span className="text-red-500">Order</span> or <span className="text-amber-500">Partner</span>
            </motion.h1>

            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 max-w-xl"
            >
              Choose how you want to continue. Customers can order in seconds. Food Partners can manage their menu, edit items, and receive orders through APIs — all controlled from their account.
            </motion.p>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => { setMode("customer"); setIsLoginView(false); }}
                className={`px-4 py-2 rounded-full font-semibold transition shadow-sm ${mode === "customer" ? "bg-red-500 text-white" : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200"}`}
              >
                Customer
              </button>

              <button
                onClick={() => { setMode("partner"); setIsLoginView(false); }}
                className={`px-4 py-2 rounded-full font-semibold transition shadow-sm ${mode === "partner" ? "bg-amber-400 text-white" : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200"}`}
              >
                Food Partner
              </button>

              <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">Already have an account?</div>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => setIsLoginView(false)}
                className={`px-3 py-2 rounded-md ${!isLoginView ? "bg-white dark:bg-slate-800 font-medium" : "bg-transparent text-gray-600"}`}
              >
                Register
              </button>
              <button
                onClick={() => setIsLoginView(true)}
                className={`px-3 py-2 rounded-md ${isLoginView ? "bg-white dark:bg-slate-800 font-medium" : "bg-transparent text-gray-600"}`}
              >
                Login
              </button>
            </div>

            {/* small animated food SVG */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 h-48 bg-gradient-to-br from-white/80 to-red-50 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <svg width="140" height="140" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <ellipse cx="32" cy="40" rx="22" ry="6" fill="#FDE68A" />
                  <path d="M12 36c0-7.732 9.924-14 20-14s20 6.268 20 14" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 30c2-2 5-3 12-3s10 1 12 3" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="26" cy="28" r="1.8" fill="#B91C1C" />
                  <circle cx="36" cy="26" r="1.6" fill="#B91C1C" />
                </g>
              </svg>
            </motion.div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Note: backend handles authentication, JWT and cookies. This UI sends form data to your API endpoints with `axios`.
            </div>
          </div>

          {/* Right - form card */}
          <motion.div
            className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-slate-800"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${mode === "customer" ? "bg-red-50" : "bg-amber-50"}`}>
                  {mode === "customer" ? <User size={20} /> : <Truck size={20} />}
                </div>
                <div>
                  <div className="text-sm text-gray-500">You are</div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">{mode === "customer" ? "Customer" : "Food Partner"}</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                <motion.div variants={item}>
                  <label className="text-xs text-gray-500">Full name</label>
                  <div className="mt-1 relative">
                    <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800" placeholder="Your name" />
                    <div className="absolute right-3 top-2 text-gray-400"><User size={16} /></div>
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <label className="text-xs text-gray-500">Email</label>
                  <div className="mt-1 relative">
                    <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800" placeholder="you@mail.com" />
                    <div className="absolute right-3 top-2 text-gray-400"><Mail size={16} /></div>
                  </div>
                </motion.div>

                <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800" placeholder="+91 98765 43210" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Password</label>
                    <div className="mt-1 relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        placeholder="Choose a strong password"
                      />
                      <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-2 text-gray-500">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Partner only fields */}
                {mode === "partner" && (
                  <>
                    <motion.div variants={item}>
                      <label className="text-xs text-gray-500">Shop / Restaurant Name</label>
                      <input name="shopName" value={form.shopName} onChange={handleChange} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800" placeholder="eg. Nilesh's Tasty Corner" />
                    </motion.div>

                    <motion.div variants={item}>
                      <label className="text-xs text-gray-500">Address</label>
                      <input name="address" value={form.address} onChange={handleChange} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800" placeholder="Shop address / city" />
                    </motion.div>

                    <motion.div variants={item}>
                      <label className="text-xs text-gray-500">Upload Logo (optional)</label>
                      <div className="mt-2 flex items-center gap-3">
                        <input type="file" accept="image/*" className="text-sm text-gray-500" />
                        <div className="text-xs text-gray-400">You can upload later from dashboard.</div>
                      </div>
                    </motion.div>
                  </>
                )}

                <motion.div variants={item} className="pt-2">
                  <button disabled={loading} type="submit" className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-red-500 to-amber-400 text-white font-semibold shadow-lg hover:scale-[1.01] transition">
                    {loading ? "Processing..." : isLoginView ? "Login" : "Create account"}
                  </button>
                </motion.div>

                <motion.div variants={item} className="text-center text-sm text-gray-500">
                  {isLoginView ? (
                    <>
                      Don't have an account? <button onClick={() => setIsLoginView(false)} className="text-red-500 font-medium">Register</button>
                    </>
                  ) : (
                    <>
                      Already registered? <button onClick={() => setIsLoginView(true)} className="text-red-500 font-medium">Login</button>
                    </>
                  )}
                </motion.div>

                <motion.div variants={item} className="text-xs text-gray-400 text-center pt-2">
                  By continuing you agree to our Terms & Privacy. For Food Partners — once registered you will get access to partner APIs to create, edit, and delete menu items.
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
export default ChooseRegister;