import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [inputValues, setInputValues] = useState(initialState);

  const resetForm = () => {
    setInputValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setInputValues({
      ...inputValues,
      [target.name]: target.value,
    });
  };

  const setForm = (newValues) => {
    setInputValues(newValues);
  };

  const handleImageChange = ({ target }) => {
    const file = target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputValues({
          ...inputValues,
          [target.name]: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return {
    inputValues,
    handleInputChange,
    handleImageChange,
    resetForm,
    setForm,
  };
};
