import React from "react";
import { createPortal } from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  className
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
      <div className={`bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 border border-white/30 ${className}`}>
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <div className="text-white mb-4">{children}</div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-white/30 text-white hover:bg-white/40 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
