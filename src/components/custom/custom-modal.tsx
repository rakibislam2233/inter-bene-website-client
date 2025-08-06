"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  header?: React.ReactNode; // Optional title for the modal
  children: React.ReactNode; // Content of the modal
  maxWidth?: string; // Optional max width for the modal
  maxHeight?: string; // Optional max height for the modal
  showCloseButton?: boolean; // Option to show/hide the close button
  closeOnBackdropClick?: boolean; // Option to close modal on backdrop click
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  header,
  children,
  className = "",
  maxWidth = "max-w-2xl",
  maxHeight = "max-h-[80vh]",
  closeOnBackdropClick = false,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalScrollY = window.scrollY;
      
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${originalScrollY}px`;
      document.body.style.width = "100%";
      document.body.classList.add("modal-open");

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.classList.remove("modal-open");
        window.scrollTo(0, originalScrollY);
      };
    }
  }, [isOpen]);

  // Stop click event propagation to prevent closing when clicking inside the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/50 flex items-center p-2 justify-center z-50"
          onClick={closeOnBackdropClick ? onClose : undefined}
        >
          <motion.div
            className={`w-full bg-white rounded-xl ${className} shadow-2xl ${maxWidth} relative modal-content`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3,
            }}
            onClick={handleModalClick}
          >
            {/* Header */}
            {header && header}

            {/* Modal Content */}
            <div className={`px-2 py-3 overflow-y-auto rounded-b-xl ${maxHeight}`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;