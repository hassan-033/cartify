import React, { useState } from 'react';
import type { ShippingInfo, ValidationError } from '../../../types';
import { Button } from '../../ui/Button';
import { FormField } from '../../ui/FormField';
import { validateShippingInfo } from '../../../utils/validation';

interface ShippingFormProps {
  onNext: (shippingInfo: ShippingInfo) => void;
  initialData?: Partial<ShippingInfo>;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState<Partial<ShippingInfo>>(initialData || {});
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getError = (field: string) => errors.find(e => e.field === field)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateShippingInfo(formData);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNext(formData as ShippingInfo);
    }
    
    setIsSubmitting(false);
  };

  const updateField = (field: keyof ShippingInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors.find(e => e.field === field)) {
      setErrors(prev => prev.filter(e => e.field !== field));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Information</h2>
        <p className="text-gray-600">Where should we send your order?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="First Name" required error={getError('firstName')}>
            <input
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => updateField('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="John"
            />
          </FormField>

          <FormField label="Last Name" required error={getError('lastName')}>
            <input
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => updateField('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Doe"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Email" required error={getError('email')}>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="john@example.com"
            />
          </FormField>

          <FormField label="Phone" required error={getError('phone')}>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="+1 (555) 123-4567"
            />
          </FormField>
        </div>

        <FormField label="Address" required error={getError('address')}>
          <input
            type="text"
            value={formData.address || ''}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="123 Main Street, Apt 4B"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField label="City" required error={getError('city')}>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => updateField('city', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="New York"
            />
          </FormField>

          <FormField label="State" required error={getError('state')}>
            <select
              value={formData.state || ''}
              onChange={(e) => updateField('state', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              {/* Add more states */}
            </select>
          </FormField>

          <FormField label="ZIP Code" required error={getError('zipCode')}>
            <input
              type="text"
              value={formData.zipCode || ''}
              onChange={(e) => updateField('zipCode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="10001"
            />
          </FormField>
        </div>

        <div className="flex justify-end pt-6">
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
              'Continue to Payment'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};