import React from "react";
import { createPortal } from "react-dom";
import { IoCloseCircleOutline } from "react-icons/io5";


const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  className
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
      <div className={`bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 border border-white/30 ${className}`}>
        <div className="flex justify-end cursor-pointer"><IoCloseCircleOutline className="text-xl" onClick={onClose}/></div>
        <div className="text-white mb-4">{children}</div>

      </div>
    </div>,
    document.body
  );
};

export default Modal;
