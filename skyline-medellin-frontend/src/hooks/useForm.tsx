import { useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
}

const useForm = <T extends Record<string, any>>({ initialValues }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const setForm = (field: { [K in keyof T]?: T[K] } | ((prevState: T) => T)) => {
    if (typeof field === 'function') {
      setValues((prevState) => field(prevState));
    } else {
      setValues((prevState) => ({
        ...prevState,
        ...field,
      }));
    }
  };

  return {
    form: values,
    setForm,
  };
};

export default useForm;