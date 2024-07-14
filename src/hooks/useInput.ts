import { useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handleChange] as const;
};

export default useInput;
