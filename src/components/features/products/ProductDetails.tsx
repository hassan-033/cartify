import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Plus, Minus, X } from 'lucide-react';
import type { Product } from '../../../types';
import { Button } from '../../ui/Button';
import { useCart } from '../../../hooks/useCart';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl transform animate-in">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg"
            >
              <X size={20} />
            </button>
            
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <img 
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                </div>
                
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                      }`}
                    >
                      <img 
                        src={image}
                        alt=""
                        className="w-20 h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline">
                    <Heart size={20} />
                  </Button>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Stock:</span>
                    <span className={product.stock > 10 ? 'text-green-600' : 'text-orange-600'}>
                      {product.stock} available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};