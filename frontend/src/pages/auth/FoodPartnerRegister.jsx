import React from 'react'
import axios from "axios";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock , FiEye, FiEyeOff} from "react-icons/fi";
import { toast , Toaster } from "react-hot-toast";
import { Link , useNavigate } from "react-router-dom";
const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 🔹 handle input
     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData((prev) => ({
         ...prev,
         [name]: value,
       }));
     };
   
     // 🔹 handle submit
     const handleSubmit = async (e) => {
       e.preventDefault();
       const { fullname, email, password } = formData;

       if (!fullname || !email || !password) {
         toast.error("Please fill all fields!");
         return;
       }
   
       try {
         setLoading(true);
         const res = await axios.post(
           "http://localhost:3000/api/auth/foodPartner/register/",
           { fullname, email, password } , { withCredentials: true }
         );
         toast.success("Food Partner Registered Successfully!");
         console.log("Response:", res.data);
         setFormData({ fullname: "", email: "", password: "" });
          navigate("/createFood");
       } catch (error) {
         console.error("Error:", error);
         toast.error(error.response?.data?.message || "Registration failed!");
       } finally {
         setLoading(false);
       }
     };
   
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, type: "spring" }}
           className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border dark:border-gray-700"
         >
           <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
             Create an Account
           </h1>
   
           <form onSubmit={handleSubmit} className="space-y-5">
             {/* Username */}
             <div className="relative">
               <FiUser className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
               <input
                 type="text"
                 name="fullname"
                 value={formData.fullname}
                 onChange={handleChange}
                 placeholder="Full Name"
                 className="w-full pl-10 pr-4 py-2 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
               />
             </div>
   
             {/* Email */}
             <div className="relative">
               <FiMail className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
               <input
                 type="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="Email"
                 className="w-full pl-10 pr-4 py-2 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
               />
             </div>
   
             {/* Password */}
             <div className="relative">
               <FiLock className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
               <input
                  type={showPassword ? "text" : "password"}
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 placeholder="Password"
                 className="w-full pl-10 pr-4 py-2 border rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
               />
               <div
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500 cursor-pointer"
               >
                 {showPassword ? <FiEyeOff /> : <FiEye />}
               </div>
             </div>
   
             {/* Submit Button */}
             <motion.button
               type="submit"
               disabled={loading}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-xl shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200"
             >
               {loading ? "Registering..." : "Register"}
             </motion.button>
           </form>
   <Toaster
     position="bottom-center"
     reverseOrder={true}
   />
           {/* Bottom Text */}
           <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-5">
             Already have an account?{" "}
             <Link
               to="/food-partner/login"
               className="text-blue-600 dark:text-blue-400 hover:underline"
           
              >               Login
            </Link>
           </p>
         </motion.div>
       </div>
     );
   };
   
 

export default FoodPartnerRegister
