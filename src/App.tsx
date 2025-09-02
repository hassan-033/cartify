import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/features/home';
import { ProductListing } from './components/features/products/ProductListing';
import { ProductDetails } from './components/features/products/ProductDetails';
import {CartSidebar} from './components/features/cart/CartSidebar';
import { mockProducts } from './data/products';
import type { Product } from './types';
import { CheckoutPage } from './pages/CheckoutPage';

type AppView = 'home' | 'checkout';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigateToCheckout = () => {
    setCurrentView('checkout');
    setIsCartOpen(false);
  };

  if (currentView === 'checkout') {
    return (
      <CartProvider>
        <CheckoutPage />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <Hero />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductListing 
            products={mockProducts}
            onProductClick={setSelectedProduct}
          />
        </main>
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          onCheckout={navigateToCheckout}
        />
      </div>
    </CartProvider>
  );
};

export default App;

