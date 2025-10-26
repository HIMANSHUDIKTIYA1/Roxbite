import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Phone, Mail, Star, Package, 
  Award, Clock, ArrowLeft, Heart, MessageCircle, 
  Share2, Play, Loader2, X, Check, TrendingUp,
  Users, ChefHat, Sparkles
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [partnerData, setPartnerData] = useState(null);
  const [reels, setReels] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchPartnerData();
  }, [name]);

  const fetchPartnerData = async () => {
    try {
      setLoading(true);
      
      // Fetch food reels
      const reelsResponse = await axios.get('http://localhost:3000/api/food/');
      const allReels = reelsResponse.data.data || [];
      
      // Filter reels by partner name
      const partnerReels = allReels.filter(reel => 
        reel.name?.toLowerCase() === name?.toLowerCase()
      );
      
      setReels(partnerReels);
      
      // Get partnerId from first reel or localStorage
      const partnerId = partnerReels[0]?.partnerId || localStorage.getItem('partnerId');
      
      if (partnerId) {
        // Fetch complete partner profile
        const profileResponse = await axios.get(
          `http://localhost:3000/api/auth/foodPartner/${partnerId}`,
          { withCredentials: true }
        );
        
        const userData = profileResponse.data.data || profileResponse.data;
        
        // Merge partner data with stats
        setPartnerData({
          ...userData,
          totalProducts: partnerReels.length,
          totalOrders: Math.floor(Math.random() * 500) + 100,
          followers: Math.floor(Math.random() * 5000) + 500,
          rating: 4.8,
          successRate: 98
        });
      } else if (partnerReels.length > 0) {
        // Fallback to reel data
        setPartnerData({
          fullname: partnerReels[0].name,
          bio: partnerReels[0].bio || 'Passionate food creator',
          location: partnerReels[0].location || 'India',
          phone: partnerReels[0].phone || 'Not available',
          email: partnerReels[0].email || 'Not available',
          specialty: partnerReels[0].specialty || 'Food Specialist',
          dpImage: partnerReels[0].profileImage || null,
          totalProducts: partnerReels.length,
          totalOrders: Math.floor(Math.random() * 500) + 100,
          followers: Math.floor(Math.random() * 5000) + 500,
          rating: 4.8,
          successRate: 98
        });
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const copyProfileLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShareMenu(false);
    }, 2000);
  };

  const shareToSocial = (platform) => {
    const link = window.location.href;
    const text = `Check out ${partnerData?.fullname || name}'s amazing food creations!`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`
    };
    
    window.open(urls[platform], '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">Loading profile...</p>
        </motion.div>
      </div>
    );
  }

  if (!partnerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl"
        >
          <User className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <p className="text-2xl text-gray-800 dark:text-white font-bold mb-2">Partner not found</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">This profile doesn't exist or has been removed</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Go Back Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back</span>
        </motion.button>
      </div>

      {/* Cover & Profile Section */}
      <div className="relative mt-4">
        {/* Animated Cover */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 relative overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative mx-auto md:mx-0"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-700 overflow-hidden">
                    {partnerData.dpImage ? (
                      <img 
                        src={partnerData.dpImage} 
                        alt={partnerData.fullname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                        <User className="w-16 h-16 text-orange-500" />
                      </div>
                    )}
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded-full shadow-lg"
                >
                  <Sparkles size={20} />
                </motion.div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 justify-center md:justify-start mb-2"
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    {partnerData.fullname}
                  </h1>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="bg-blue-500 text-white p-1 rounded-full"
                  >
                    <Check size={16} />
                  </motion.div>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 dark:text-gray-300 text-lg mb-4 max-w-2xl"
                >
                  {partnerData.bio || 'Passionate food creator sharing delicious recipes'}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 dark:text-gray-400 mb-6"
                >
                  {partnerData.location && (
                    <div className="flex items-center gap-2 bg-red-50 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                      <MapPin size={16} className="text-red-500" />
                      <span className="font-medium">{partnerData.location}</span>
                    </div>
                  )}
                  {partnerData.specialty && (
                    <div className="flex items-center gap-2 bg-orange-50 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                      <ChefHat size={16} className="text-orange-500" />
                      <span className="font-medium">{partnerData.specialty}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="font-medium">{partnerData.followers || 0}+ Followers</span>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 justify-center md:justify-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowContact(!showContact)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Contact Now
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`${
                      isFollowing 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white dark:bg-gray-700 border-2 border-red-500 text-red-500'
                    } px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2`}
                  >
                    <Heart size={18} className={isFollowing ? 'fill-white' : ''} />
                    {isFollowing ? 'Following' : 'Follow'}
                  </motion.button>

                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Share2 size={18} />
                      Share
                    </motion.button>

                    {/* Share Menu */}
                    <AnimatePresence>
                      {showShareMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 z-50 w-48"
                        >
                          <button
                            onClick={copyProfileLink}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            {copied ? (
                              <>
                                <Check size={18} className="text-green-500" />
                                <span className="text-sm font-medium text-green-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Share2 size={18} className="text-gray-600 dark:text-gray-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Copy Link</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => shareToSocial('whatsapp')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            <MessageCircle size={18} className="text-green-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp</span>
                          </button>
                          <button
                            onClick={() => shareToSocial('facebook')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            <Users size={18} className="text-blue-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
                          </button>
                          <button
                            onClick={() => shareToSocial('twitter')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                          >
                            <TrendingUp size={18} className="text-sky-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Contact Info Expandable */}
            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="text-red-500" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {partnerData.phone && (
                      <motion.a
                        href={`tel:${partnerData.phone}`}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="bg-orange-500 text-white p-2 rounded-full">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                          <p className="font-bold text-gray-800 dark:text-white">{partnerData.phone}</p>
                        </div>
                      </motion.a>
                    )}
                    
                    {partnerData.email && (
                      <motion.a
                        href={`mailto:${partnerData.email}`}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="bg-red-500 text-white p-2 rounded-full">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                          <p className="font-bold text-gray-800 dark:text-white break-all">{partnerData.email}</p>
                        </div>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
              >
                <Package className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{partnerData.totalProducts}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Products</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
              >
                <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{partnerData.totalOrders}+</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Orders</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
              >
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-yellow-500" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{partnerData.rating}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Rating</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
              >
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{partnerData.successRate}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Success</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Food Products Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <Package className="text-red-500" />
              Food Products
              <span className="text-red-500">({reels.length})</span>
            </h2>
          </div>

          {reels.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center"
            >
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">No products yet</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Check back later for delicious creations!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {reels.map((reel, index) => (
                <motion.div
                  key={reel._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedReel(reel)}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group relative"
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <video
                      src={reel.videoUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-red-500 p-4 rounded-full shadow-2xl">
                        <Play size={28} className="text-white fill-white" />
                      </div>
                    </motion.div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-sm drop-shadow-lg line-clamp-2 mb-2">
                        {reel.description || 'Delicious food creation'}
                      </p>
                      <div className="flex items-center gap-2 text-white/90 text-xs">
                        <Heart size={14} />
                        <span>{Math.floor(Math.random() * 1000)}+</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <video
                src={selectedReel.videoUrl}
                controls
                autoPlay
                className="w-full rounded-2xl shadow-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedReel(null)}
                className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-full shadow-xl"
              >
                <X size={24} />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 bg-white dark:bg-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {selectedReel.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedReel.description || 'Delicious food creation'}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 text-red-500 font-semibold"
                  >
                    <Heart size={20} />
                    <span>Like</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-semibold"
                  >
                    <Share2 size={20} />
                    <span>Share</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Profile;