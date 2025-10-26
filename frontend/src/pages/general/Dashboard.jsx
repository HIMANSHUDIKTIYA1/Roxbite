import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark, FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaTimes, FaUser } from 'react-icons/fa';
import axios from 'axios';
import{ toast , Toaster }from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [reels, setReels] = useState([]);


  
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [playing, setPlaying] = useState({});
  const [muted, setMuted] = useState(true);
  const [showLikeAnimation, setShowLikeAnimation] = useState({});
  const reelRefs = useRef([]);
  const fullscreenRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch reels data from backend
    const fetchReels = async () => {  
      try {
        const res = await axios.get('http://localhost:3000/api/food/');
      
        setReels(res.data.data);
      } catch (error) {
        console.error('Error fetching reels:', error);
      } 
    };

    fetchReels();
  }, []);
  // Auto-play video in viewport
  useEffect(() => {
    if (activeReelIndex !== null && fullscreenRefs.current[activeReelIndex]) {
      fullscreenRefs.current[activeReelIndex]?.play();
      setPlaying(prev => ({ ...prev, [activeReelIndex]: true }));
    }
  }, [activeReelIndex]);

  const handleDoubleClick = (index) => {
    setLiked(prev => ({ ...prev, [index]: true }));
    setShowLikeAnimation(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setShowLikeAnimation(prev => ({ ...prev, [index]: false }));
    }, 600);
  };

  const handleLike = (index, e) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSave = (index, e) => {
    e.stopPropagation();
    setSaved(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const togglePlayPause = (index, e) => {
    e.stopPropagation();
    const video = fullscreenRefs.current[index];
    if (video) {
      if (playing[index]) {
        video.pause();
      } else {
        video.play();
      }
      setPlaying(prev => ({ ...prev, [index]: !prev[index] }));
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted(!muted);
  };

  const handleScroll = () => {
    if (containerRef.current && activeReelIndex !== null) {
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / windowHeight);
      
      if (newIndex !== activeReelIndex && newIndex >= 0 && newIndex < reels.length) {
        if (fullscreenRefs.current[activeReelIndex]) {
          fullscreenRefs.current[activeReelIndex].pause();
        }
        setActiveReelIndex(newIndex);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (activeReelIndex !== null) {
      if (e.key === 'ArrowDown' && activeReelIndex < reels.length - 1) {
        const newIndex = activeReelIndex + 1;
        setActiveReelIndex(newIndex);
        containerRef.current?.scrollTo({
          top: newIndex * window.innerHeight,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowUp' && activeReelIndex > 0) {
        const newIndex = activeReelIndex - 1;
        setActiveReelIndex(newIndex);
        containerRef.current?.scrollTo({
          top: newIndex * window.innerHeight,
          behavior: 'smooth'
        });
      } else if (e.key === 'Escape') {
        setActiveReelIndex(null);
      }
    }
  };
  useEffect(() => {
    toast.success(`Welcome to RoxBite Dashboard! 🍔`);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {activeReelIndex === null ? (
        <div className="p-4 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-2">
              🍔 RoxBite
            </h1>
            <p className="text-gray-600 dark:text-gray-400"> food content</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {reels.map((reel, index) => (
              <div
                key={reel._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveReelIndex(index)}
              >
                <div className="relative overflow-hidden">
                  <video
                    ref={(el) => (reelRefs.current[index] = el)}
                    src={reel.videoUrl}
                    className="w-full  h-48 md:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                    <FaUser size={10} />
                    @{reel.name}
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                    <FaPlay size={14} />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-red-500 transition-colors duration-300 mb-2">
                    {reel.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {reel.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 bg-black overflow-y-scroll snap-y snap-mandatory"
          onScroll={handleScroll}
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {reels.map((reel, index) => (
            <div
              key={reel._id}
              className="relative w-full h-screen snap-start snap-always flex items-center justify-center"
            >
              <video
                ref={(el) => (fullscreenRefs.current[index] = el)}
                src={reel.videoUrl}
                loop
                muted={muted}
                playsInline
                className="max-w-[700px]  h-[95%] min-w-[415px]  object-cover"
                onDoubleClick={() => handleDoubleClick(index)}
                onClick={(e) => togglePlayPause(index, e)}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

              <button
                onClick={() => setActiveReelIndex(null)}
                className="absolute top-6 right-6 z-50 p-3.5 bg-black/60 backdrop-blur-md rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaTimes size={22} className="text-white" />
              </button>

              <button
                onClick={toggleMute}
                className="absolute top-6 left-6 z-50 p-3.5 bg-black/60 backdrop-blur-md rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                {muted ? <FaVolumeMute size={22} className="text-white" /> : <FaVolumeUp size={22} className="text-white" />}
              </button>

              {!playing[index] && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md p-8 rounded-full animate-pulse shadow-2xl">
                    <FaPause size={50} className="text-white" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-28 left-6 right-24 text-white z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaUser size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold hover:text-red-400 transition-colors duration-300 drop-shadow-lg cursor-pointer">
                    <Link to={`/profile/${reel.name}`}>@{reel.name}</Link>
                    </h3>
                  </div>
                </div>
                <p className="text-base leading-relaxed drop-shadow-md line-clamp-3 bg-black/20 backdrop-blur-sm p-3 rounded-xl">
                  {reel.description}
                </p>
              </div>

              <div className="absolute right-6 bottom-32 flex flex-col items-center gap-6 z-10">
                <button
                  onClick={(e) => handleLike(index, e)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`p-4 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-125 shadow-lg ${
                    liked[index] 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-red-500/50' 
                      : 'bg-black/50 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500'
                  }`}>
                    <FaHeart size={30} className={`${liked[index] ? 'text-white' : 'text-white'}`} />
                  </div>
                  <span className="text-white text-sm font-bold drop-shadow-md">
                    {liked[index] ? '1.2K' : '1.1K'}
                  </span>
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-125 shadow-lg">
                    <FaComment size={30} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-bold drop-shadow-md">248</span>
                </button>

                <button
                  onClick={(e) => handleSave(index, e)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`p-4 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-125 shadow-lg ${
                    saved[index] 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-red-500/50' 
                      : 'bg-black/50 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500'
                  }`}>
                    <FaBookmark size={30} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-bold drop-shadow-md">Save</span>
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-125 shadow-lg">
                    <FaShare size={30} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-bold drop-shadow-md">Share</span>
                </button>
              </div>

              {index < reels.length - 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                  <div className="w-10 h-14 border-3 border-white/60 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-black/20">
                    <div className="w-1.5 h-4 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
              )}

              {showLikeAnimation[index] && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <FaHeart 
                    size={120} 
                    className="text-red-500 animate-ping opacity-90"
                    style={{ animationDuration: '0.6s', animationIterationCount: 1 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .overflow-y-scroll::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes ping {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 0.6s cubic-bezier(0, 0, 0.2, 1);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;