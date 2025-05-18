import React from 'react';
import { createPortal } from 'react-dom';

class Toast {
  constructor() {
    this.toastContainer = null;
    this.timeout = null;
  }

  createToastContainer() {
    if (!this.toastContainer) {
      this.toastContainer = document.createElement('div');
      this.toastContainer.id = 'toast-container';
      this.toastContainer.className = 'fixed top-4 right-4 z-50';
      document.body.appendChild(this.toastContainer);
    }
  }

  show(message, type = 'success') {
    this.createToastContainer();

    // Clear any existing timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Create toast element
    const toast = (
      <div
        className={`${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out`}
      >
        {message}
      </div>
    );

    // Render toast
    createPortal(toast, this.toastContainer);

    // Auto remove after 3 seconds
    this.timeout = setTimeout(() => {
      if (this.toastContainer) {
        document.body.removeChild(this.toastContainer);
        this.toastContainer = null;
      }
    }, 3000);
  }

  success(message) {
    this.show(message, 'success');
  }

  error(message) {
    this.show(message, 'error');
  }
}

const toast = new Toast();
export default toast;
