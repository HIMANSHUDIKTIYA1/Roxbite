import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Camera, MapPin, Phone, Mail, 
  Star, Package, Plus, Settings, Utensils 
} from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import CreateFood from "./createfood";

const FoodPartnerProfile = () => {
  const [showCreateFood, setShowCreateFood] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const [profileData, setProfileData] = useState({
    fullname: "",
    specialty: "",
    location: "",
    phone: "",
    email: "",
    bio: "",
    dpImage:null,
  });


  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    rating: 4.8,
  });


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 500 * 1024) {
      toast.error("Image size should be less than 500KB");
      return;
    }
    
    if (file) {
      setPreview(URL.createObjectURL(file));
      setProfileImage(file);
    }
    
    

      const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfileData(prev => ({ ...prev, dpImage: base64String }));
      toast.success("Image ready to save!");
    };
    reader.readAsDataURL(file);
  };
  

  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };


  const fetchProfileData = async () => {
    const partnerId = localStorage.getItem('partnerId');
    
    if (!partnerId) {
      toast.error("Partner ID not found. Please login again.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/auth/foodPartner/${partnerId}`,
        { withCredentials: true }
      );
      
      
      const userData = res.data.data || res.data;
      if (userData.dpImage) {
        setPreview(userData.dpImage);
      }
      setProfileData(userData);
      console.log("Fetched profile data:", userData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Failed to load profile data");
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const partnerId = localStorage.getItem('partnerId');
    
    if (!partnerId) {
      toast.error("Partner ID not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const { fullname, specialty, location, phone, email, bio , dpImage} = profileData;
     
      const res = await axios.put(
        `http://localhost:3000/api/auth/foodPartner/${partnerId}`,
        { fullname, specialty, location, phone, email, bio, dpImage },
        {
          withCredentials: true,
           headers: { "Content-Type": "application/json" }
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Profile updated successfully!");
    
        await fetchProfileData();
      } else {
        toast.error("Failed to update profile!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      

      if (error.response) {
        toast.error(error.response.data.message || "Server error while updating profile!");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred while updating profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pb-10">
      <Toaster />

      <div className="relative">
   
        <div className="h-40 md:h-48 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />

    
        <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
           
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-1 shadow-xl"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-700 overflow-hidden">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                        <User className="w-12 h-12 text-orange-500" />
                      </div>
                    )}
                  </div>
                </motion.div>

                <label htmlFor="profileImg" className="absolute bottom-0 right-0 cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded-full shadow-lg"
                  >
                    <Camera size={16} />
                  </motion.div>
                  <input
                    type="file"
                    id="profileImg"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"

                  />
                </label>
              </div>


              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {profileData.fullname || "Food Partner"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {profileData.specialty || "Food Specialist"}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-red-500" />
                    <span>{profileData.location || "Location"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={14} className="text-red-500" />
                    <span>{profileData.phone || "Phone"}</span>
                  </div>
                </div>

       
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 p-3 rounded-xl text-center"
                  >
                    <Package className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{stats.totalProducts}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Products</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600 p-3 rounded-xl text-center"
                  >
                    <Utensils className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{stats.totalOrders}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Orders</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-700 dark:to-gray-600 p-3 rounded-xl text-center"
                  >
                    <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{stats.rating}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Rating</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateFood((prev) => !prev)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Create Food
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
              >
                <Settings size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <User className="text-red-500" />
            Profile Details
          </h2>

          <form onSubmit={handleProfileSubmit} className="grid md:grid-cols-2 gap-5">
            {["fullname", "specialty", "location", "phone", "email"].map((field) => (
              <div key={field}>
                <label className={`block text-black dark:text-gray-300 font-semibold mb-2 capitalize`}>
                  {field.replace(/([A-Z])/g, " $1")} *
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profileData[field]}
                  onChange={handleProfileChange}
                  required
                  disabled={field === "email" ? true : false}
                  placeholder={`Enter ${field}`}
                  className={`w-full border-2 ${field === "email" ? " text-gray-200" : "text-black"}  rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Profile"}
            </motion.button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showCreateFood && <CreateFood />}
      </AnimatePresence>
    </div>
  );
};

export default FoodPartnerProfile;