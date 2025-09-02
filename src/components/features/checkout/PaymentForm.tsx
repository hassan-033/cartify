import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import type { PaymentInfo } from '../../../types/checkout';
import type { ValidationError } from '../../../types';
import { Button } from '../../ui/Button';
import { FormField } from '../../ui/FormField';
import { validateCardNumber, validateExpiryDate, validateCVV } from '../../../utils/validation';

interface PaymentFormProps {
  onNext: (paymentInfo: PaymentInfo) => void;
  onBack: () => void;
  initialData?: Partial<PaymentInfo>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState<Partial<PaymentInfo>>(initialData || {});
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getError = (field: string) => errors.find(e => e.field === field)?.message;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (!formData.cardholderName?.trim()) {
      errors.push({ field: 'cardholderName', message: 'Cardholder name is required' });
    }
    
    if (!formData.cardNumber?.trim()) {
      errors.push({ field: 'cardNumber', message: 'Card number is required' });
    } else if (!validateCardNumber(formData.cardNumber)) {
      errors.push({ field: 'cardNumber', message: 'Invalid card number' });
    }
    
    if (!formData.expiryDate?.trim()) {
      errors.push({ field: 'expiryDate', message: 'Expiry date is required' });
    } else if (!validateExpiryDate(formData.expiryDate)) {
      errors.push({ field: 'expiryDate', message: 'Invalid or expired date' });
    }
    
    if (!formData.cvv?.trim()) {
      errors.push({ field: 'cvv', message: 'CVV is required' });
    } else if (!validateCVV(formData.cvv)) {
      errors.push({ field: 'cvv', message: 'Invalid CVV' });
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onNext(formData as PaymentInfo);
    }
    
    setIsSubmitting(false);
  };

  const updateField = (field: keyof PaymentInfo | string, value: string) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors.find(e => e.field === field)) {
      setErrors(prev => prev.filter(e => e.field !== field));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Lock className="mr-2 text-green-600" size={24} />
          Payment Information
        </h2>
        <p className="text-gray-600">Your payment information is secure and encrypted</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Cardholder Name" required error={getError('cardholderName')}>
          <input
            type="text"
            value={formData.cardholderName || ''}
            onChange={(e) => updateField('cardholderName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="John Doe"
          />
        </FormField>

        <FormField label="Card Number" required error={getError('cardNumber')}>
          <div className="relative">
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => updateField('cardNumber', e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </FormField>

        <div className="grid grid-cols-2 gap-6">
          <FormField label="Expiry Date" required error={getError('expiryDate')}>
            <input
              type="text"
              value={formData.expiryDate || ''}
              onChange={(e) => updateField('expiryDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="MM/YY"
              maxLength={5}
            />
          </FormField>

          <FormField label="CVV" required error={getError('cvv')}>
            <input
              type="text"
              value={formData.cvv || ''}
              onChange={(e) => updateField('cvv', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="123"
              maxLength={4}
            />
          </FormField>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center text-sm text-gray-600">
            <Lock size={16} className="mr-2 text-green-600" />
            Your payment information is encrypted and secure
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Back to Shipping
          </Button>
          <Button 
            size="lg" 
            disabled={isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              'Review Order'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};