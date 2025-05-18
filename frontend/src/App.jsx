import { useState } from "react";

import "./App.css";
import Modal from "./components/global/Modal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Delete Item?"
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default App;

