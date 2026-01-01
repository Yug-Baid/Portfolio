import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HoverExpand = ({ 
  images, 
  initialSelectedIndex = 0, 
  thumbnailHeight = 400, 
  modalImageSize = 400,
  maxThumbnails = 11 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full px-4 py-12">
      {/* Thumbnails Row - Now the main display */}
      <div className="flex items-center justify-center gap-3 overflow-x-hidden pb-4 ">
        {images.slice(0, maxThumbnails).map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-2xl border-2 border-black/10 shadow-lg"
            style={{ 
              height: `${thumbnailHeight}px`,
              minWidth: hoveredIndex === index ? '600px' : '150px',
              width: hoveredIndex === index ? '800px' : '150px',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(0)}
            onClick={() => setSelectedImage(image)}
            animate={{
              width: hoveredIndex === index ? '990px' : '150px',
              minWidth: hoveredIndex === index ? '990px' : '150px',
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
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl backdrop-blur-sm transition-all "
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
