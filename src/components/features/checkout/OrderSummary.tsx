import React from 'react';
import { Package, Truck, Calculator } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import type { OrderSummary as OrderSummaryType } from '../../../types/checkout';

interface OrderSummaryProps {
  compact?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ compact = false }) => {
  const { items, totalPrice } = useCart();
  
  const shipping = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const summary: OrderSummaryType = {
    subtotal: totalPrice,
    shipping,
    tax,
    total
  };

  if (compact) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${summary.tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Package className="mr-2" size={20} />
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center space-x-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">Qty: {quantity}</p>
            </div>
            <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center">
            <Truck size={16} className="mr-1" />
            <span>Shipping</span>
          </div>
          <span>
            {summary.shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `$${summary.shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center">
            <Calculator size={16} className="mr-1" />
            <span>Tax</span>
          </div>
          <span>${summary.tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>
      </div>

      {summary.shipping === 0 && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800 font-medium">
            🎉 You qualified for free shipping!
          </p>
        </div>
      )}
    </div>
  );
};