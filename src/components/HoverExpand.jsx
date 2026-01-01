import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const HoverExpand = ({ 
  images, 
  initialSelectedIndex = 0, 
  thumbnailHeight = 400, 
  modalImageSize = 400,
  maxThumbnails = 11 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  // Responsive dimensions
  const getExpandedWidth = () => {
    if (isMobile) return '300px';
    if (isTablet) return '500px';
    return '990px';
  };

  const getCollapsedWidth = () => {
    if (isMobile) return '60px'; // Much smaller on mobile
    if (isTablet) return '100px';
    return '150px';
  };

  const currentHeight = isMobile ? thumbnailHeight * 0.6 : thumbnailHeight;

  return (
    <div className="w-full px-4 py-12">
      {/* Thumbnails Row - Now the main display */}
      <div className="flex items-center justify-center gap-2 md:gap-3 overflow-x-auto md:overflow-hidden pb-4 no-scrollbar">
        {images.slice(0, maxThumbnails).map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl border-2 border-black/10 shadow-lg shrink-0"
            style={{ 
              height: `${currentHeight}px`,
            }}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(0)}
            onClick={() => {
              if(isMobile) {
                if(hoveredIndex !== index) {
                   setHoveredIndex(index);
                } else {
                   setSelectedImage(image);
                }
              } else {
                setSelectedImage(image);
              }
            }}
            animate={{
              width: hoveredIndex === index ? getExpandedWidth() : getCollapsedWidth(),
              minWidth: hoveredIndex === index ? getExpandedWidth() : getCollapsedWidth(),
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="h-full w-full object-cover"
            />
            
            {/* Overlay on hover */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center"
                >
                  <span className="text-white text-sm font-light bg-black/50 px-4 py-2 rounded-full">
                    Click to view full image
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size preview"
                className="w-full h-full object-contain rounded-2xl"
              />
              
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-black/100 hover:bg-gold/100 rounded-full flex items-center justify-center text-white text-2xl backdrop-blur-sm transition-all "
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HoverExpand;
