import React, { useState, useEffect } from "react";
import { useToast } from "./Toast";


const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  // Remove toast after duration
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // Add new toast
  const addToast = (message, type) => {
    const newToast = {
      id: Date.now(),
      message,
      type,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  // Remove specific toast
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 p-4 space-y-4 z-50">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="transform transition-all duration-500 ease-in-out"
          style={{
            opacity: 1,
            transform: `translateY(${index * 100}%)`,
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

// Export both the component and the methods
export const useToast = () => {
  const [toastInstance] = useState(() => {
    let toastContainer = null;

    return {
      success: (message) => {
        if (toastContainer) {
          toastContainer.addToast(message, "success");
        }
      },
      error: (message) => {
        if (toastContainer) {
          toastContainer.addToast(message, "error");
        }
      },
      setContainer: (container) => {
        toastContainer = container;
      },
    };
  });

  return toastInstance;
};

export default ToastContainer;