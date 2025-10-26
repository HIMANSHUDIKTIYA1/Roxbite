import React from "react";

import { Upload, Utensils, FileText, Loader2 ,X } from "lucide-react";
import { useState , useEffect} from "react";
import { Toaster , toast } from "react-hot-toast";
import { motion , AnimatePresence } from 'framer-motion';

import axios from "axios";
const createFood = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
const [showCreateFood, setShowCreateFood] = useState(true);
const [formData, setFormData] = useState({
    name: "",
    description: "",
    videoUrl: null,
  });
  if (!showCreateFood) return ;
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    console.log(name, value, files);
    

    if (name === "videoUrl") {
      const file = files[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, [name]: file }));
      } 
    } else {
        // Handle other input changes
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { name, description, videoUrl } = formData;

  if (!name || !description || !videoUrl) {
    toast.error("Please fill all fields!");
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/api/food", {
      name,
      description,
      videoUrl
    }, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 201) {
      toast.success("Food created successfully!");
      setFormData({ name: "", description: "", videoUrl: "" });
      setPreview(null);
    } else {
      toast.error("Error creating food.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error while creating food.");
  } finally {
    setLoading(false);
  }
};

  

  
  
  return (
<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
           
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex  justify-center p-4  overflow-y-auto"
            onClick={() => setShowCreateFood(false)}
          >
            <Toaster />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-lg my-8 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Utensils className="w-7 h-7 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Create New Food
                  </h2>
                </div>
                <button
                  onClick={() => setShowCreateFood(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Food Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter food name"
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Describe your food..."
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Upload Food Video *
                  </label>
                  <label
                    htmlFor="videoUpload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-red-400 rounded-2xl py-8 hover:bg-red-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
                  >
                    <Upload className="w-10 h-10 text-red-500 mb-2" />
                    <span className="text-red-500 font-semibold">Click to Upload Video</span>
                    <span className="text-gray-500 text-sm mt-1">MP4, MOV up to 50MB</span>
                  </label>
                  <input
                    type="file"
                    id="videoUpload"
                    name="videoUrl"
                    accept="video/*"
                    onChange={handleChange}
                    className="hidden"
                  />

                  {preview && (
                    <motion.video
                      src={preview}
                      controls
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-2xl w-full shadow-lg"
                    />
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> 
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" /> 
                      Create Food
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
  );
};

export default createFood;

