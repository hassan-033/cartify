
import React from 'react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      {/* Cart items and actions go here */}
      <div className="flex-1 p-4">CartSidebar</div>
    </aside>
  );
};

export default CartSidebar;
