import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { 
  CheckoutSteps, 
  ShippingForm, 
  PaymentForm, 
  OrderReview, 
  OrderConfirmation,
  OrderSummary 
} from '../components/features/checkout';
import { Header } from '../components/layout/Header';
import type { ShippingInfo, CheckoutStep } from '../types';
import type { PaymentInfo } from '../types/checkout';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui';

export const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const { items, totalItems } = useCart();

  const steps: CheckoutStep[] = [
    { id: 1, title: 'Shipping', description: 'Delivery info', completed: false },
    { id: 2, title: 'Payment', description: 'Payment details', completed: false },
    { id: 3, title: 'Review', description: 'Confirm order', completed: false },
    { id: 4, title: 'Complete', description: 'Order placed', completed: false }
  ];

  const handleShippingNext = (info: ShippingInfo) => {
    setShippingInfo(info);
    setCurrentStep(1);
  };

  const handlePaymentNext = (info: PaymentInfo) => {
    setPaymentInfo(info);
    setCurrentStep(2);
  };

  const handleOrderConfirm = () => {
    // Generate order number
    const orderNum = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setCurrentStep(3);
  };

  const handleContinueShopping = () => {
    setCurrentStep(0);
    setShippingInfo(null);
    setPaymentInfo(null);
    setOrderNumber('');
  };

  // Redirect if cart is empty (except on confirmation)
  if (items.length === 0 && currentStep < 3) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => {}} />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to continue with checkout</p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => {}} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentStep < 3 && (
          <>
            <div className="mb-8">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Shopping
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600">{totalItems} items in your cart</p>
            </div>

            <CheckoutSteps steps={steps} currentStep={currentStep} />
          </>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 0 && (
              <ShippingForm 
                onNext={handleShippingNext}
                initialData={shippingInfo || undefined}
              />
            )}

            {currentStep === 1 && (
              <PaymentForm
                onNext={handlePaymentNext}
                onBack={() => setCurrentStep(0)}
                initialData={paymentInfo || undefined}
              />
            )}

            {currentStep === 2 && shippingInfo && paymentInfo && (
              <OrderReview
                shippingInfo={shippingInfo}
                paymentInfo={paymentInfo}
                onBack={() => setCurrentStep(1)}
                onConfirm={handleOrderConfirm}
              />
            )}

            {currentStep === 3 && (
              <OrderConfirmation
                orderNumber={orderNumber}
                onContinueShopping={handleContinueShopping}
              />
            )}
          </div>

          {currentStep < 3 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};