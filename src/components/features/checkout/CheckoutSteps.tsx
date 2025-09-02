import React from 'react';
import { Check } from 'lucide-react';
import type { CheckoutStep } from '../../../types/checkout';

interface CheckoutStepsProps {
  steps: CheckoutStep[];
  currentStep: number;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ steps, currentStep }) => {
  const cn = (...classes: (string | undefined | false)[]): string => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Checkout Progress</h2>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                )}
              >
                {index < currentStep ? (
                  <Check size={20} />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={cn(
                  'text-sm font-medium',
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 max-w-20">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 transition-all duration-300',
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};