export const isNameValid = (value: string): boolean => value.length >= 1 && value.length <= 255;
export const isEmailValid = (value: string): boolean => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const isPhoneNumberValid = (value: string): boolean => value.length >= 1 && value.length <= 20;
export const isAddressValid = (value: string): boolean => true;

export const isFieldValid = (field: string, value: string): boolean => {
  switch (field) {
    case 'name':
      return isNameValid(value);
    case 'email':
      return isEmailValid(value);
    case 'phone_number':
      return isPhoneNumberValid(value);
    case 'address':
      return isAddressValid(value);
    default:
      return true;
  }
};
