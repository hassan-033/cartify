import React, { useState } from 'react';
import { CheckCircle, CreditCard, MapPin } from 'lucide-react';
import type { ShippingInfo, PaymentInfo } from '../../../types/checkout';
import { Button } from '../../ui/Button';
import { OrderSummary } from './OrderSummary';
import { useCart } from '../../../hooks/useCart';

interface OrderReviewProps {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  onBack: () => void;
  onConfirm: () => void;
}

export const OrderReview: React.FC<OrderReviewProps> = ({ 
  shippingInfo, 
  paymentInfo, 
  onBack, 
  onConfirm 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { totalItems } = useCart();

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    onConfirm();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <CheckCircle className="mr-2 text-green-600" size={24} />
          Review Your Order
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Shipping Address
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p className="text-gray-600">{shippingInfo.address}</p>
              <p className="text-gray-600">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </p>
              <p className="text-gray-600">{shippingInfo.email}</p>
              <p className="text-gray-600">{shippingInfo.phone}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="mr-2" size={20} />
              Payment Method
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-medium">{paymentInfo.cardholderName}</p>
              <p className="text-gray-600">
                **** **** **** {paymentInfo.cardNumber?.slice(-4)}
              </p>
              <p className="text-gray-600">Expires {paymentInfo.expiryDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-900">Order Summary</p>
              <p className="text-sm text-blue-700">{totalItems} items in your cart</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-700">Estimated delivery</p>
              <p className="font-medium text-blue-900">3-5 business days</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Back to Payment
          </Button>
          <Button 
            onClick={handleConfirm} 
            size="lg" 
            disabled={isProcessing}
            className="min-w-40"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Order...
              </div>
            ) : (
              'Confirm Order'
            )}
          </Button>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <OrderSummary />
    </div>
  );
};