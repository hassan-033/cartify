import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useCart } from '../../../hooks/useCart';

interface OrderConfirmationProps {
  orderNumber: string;
  onContinueShopping: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ 
  orderNumber, 
  onContinueShopping 
}) => {
  const { clearCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Clear cart after successful order
    clearCart();
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);
  }, [clearCart]);

  return (
    <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="bg-white rounded-3xl shadow-lg p-12">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-25"></div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed! 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">Order Number</p>
              <p className="text-sm text-gray-600">{orderNumber}</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <p className="font-semibold text-gray-900">Estimated Delivery</p>
              <p className="text-sm text-gray-600">3-5 business days</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-semibold text-gray-900">Confirmation Sent</p>
              <p className="text-sm text-gray-600">Check your email</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• We'll send you tracking information once your order ships</li>
            <li>• You can track your order status in your account</li>
            <li>• Questions? Contact our support team 24/7</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Button onClick={onContinueShopping} size="lg" className="w-full">
            Continue Shopping
          </Button>
          <Button variant="outline" className="w-full">
            Track Your Order
          </Button>
        </div>
      </div>
    </div>
  );
};