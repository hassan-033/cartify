import type { ShippingInfo } from "../types";

export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
};

export const validateExpiryDate = (expiry: string): boolean => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) return false;
  
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const cardYear = parseInt(year);
  const cardMonth = parseInt(month);
  
  if (cardYear < currentYear) return false;
  if (cardYear === currentYear && cardMonth < currentMonth) return false;
  
  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateShippingInfo = (info: Partial<ShippingInfo>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!info.firstName?.trim()) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }
  
  if (!info.lastName?.trim()) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }
  
  if (!info.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(info.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }
  
  if (!info.phone?.trim()) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!validatePhone(info.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone number' });
  }
  
  if (!info.address?.trim()) {
    errors.push({ field: 'address', message: 'Address is required' });
  }
  
  if (!info.city?.trim()) {
    errors.push({ field: 'city', message: 'City is required' });
  }
  
  if (!info.state?.trim()) {
    errors.push({ field: 'state', message: 'State is required' });
  }
  
  if (!info.zipCode?.trim()) {
    errors.push({ field: 'zipCode', message: 'ZIP code is required' });
  }
  
  return errors;
};