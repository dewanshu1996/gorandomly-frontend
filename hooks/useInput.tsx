import { useState } from "react";

const useInput = (inputValues: any, validateFunctions: any) => {
  const [values, setValues] = useState(inputValues);
  const [touched, setTouched] = useState();
  const [errors, setErrors] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const onChange = (name: string, value: any) => {
    setValues((prevState: any) => {
      return { ...prevState, [name]: value };
    });
  };

  const onBlur = (name: string) => {
    validateInput(name, values[name]);
    setTouched((prevState: any) => {
      return { ...prevState, [name]: true };
    });
  };

  const validateInputs = () => {
    for (var name of Object.keys(values)) {
      const { hasError, errorMsg } = validateFunctions(
        name,
        values[name],
        values
      );

      setErrors((prevState: any) => {
        return { ...prevState, [name]: hasError };
      });
      setErrorMsg((prevState: any) => {
        return { ...prevState, [name]: errorMsg };
      });
    }
  };

  const validateInput = (name: string, value: any) => {
    const { hasError, errorMsg } = validateFunctions(name, value, values);

    setErrors((prevState: any) => {
      return { ...prevState, [name]: hasError };
    });
    setErrorMsg((prevState: any) => {
      return { ...prevState, [name]: errorMsg };
    });
  };

  const resetForm = () => {
    for (var name of Object.keys(values)) {
      setErrors((prevState: any) => {
        return { ...prevState, [name]: false };
      });
      setErrorMsg((prevState: any) => {
        return { ...prevState, [name]: "" };
      });
      setTouched((prevState: any) => {
        return { ...prevState, [name]: false };
      });
    }
  };

  return {
    data: {
      values: values,
      touched: touched,
      errors: errors,
      errorMsg: errorMsg,
    },
    functions: {
      onChange: onChange,
      onBlur: onblur,
      validateInputs: validateInputs,
      resetForm: resetForm,
    },
  };
};

export default useInput;
