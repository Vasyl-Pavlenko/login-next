import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  updateData } from '@/redux/actions';
import { isNameValid, isEmailValid, isPhoneNumberValid, isAddressValid } from './Validation'; 

export const useTableHelpers = () => {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [editedData, setEditedData] = useState<{ [key: number]: { [key: string]: string } }>({});
  const [errorMessages, setErrorMessages] = useState([]);

  const handleEdit = (id: number, field: string, value: string) => {
    setShowError(false);
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [id]: {
        ...prevEditedData[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const updates = [];
    const validationErrors = [];

    for (const key in editedData) {
      for (const field in editedData[key]) {
        const value = editedData[key][field];
        const id = parseInt(key);

        let isValid = true;
        switch (field) {
          case 'name':
            isValid = isNameValid(value);
            break;
          case 'email':
            isValid = isEmailValid(value);
            break;          
          case 'phone_number':
            isValid = isPhoneNumberValid(value);
            break;
          case 'address':
            isValid = isAddressValid(value);
            break;
          default:
            isValid = true;
        }

        if (!isValid) {
          validationErrors.push(`Field "${field}" not accepted: ${value}`);
        } else {
          updates.push({ id, field, value });
        }
      }
    }

    if (validationErrors.length > 0) {
      // @ts-ignore
      setErrorMessages(validationErrors);
      setShowError(true);
    } else if (updates.length > 0) {
      // @ts-ignore
      await dispatch(updateData(updates));
      setEditedData({});
      // @ts-ignore
      fetchDataAndSetState();
    }
  };

  return {
    handleEdit,
    handleSave,
    showError,
    editedData,
  };
};