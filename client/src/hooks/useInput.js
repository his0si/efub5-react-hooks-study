import { useState } from 'react';

const useInput = (initialValue, validator = (value) => value.length <= 10) => {
  const [value, setValue] = useState(initialValue);
  
  const onChange = (event) => {
    const { value } = event.target;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

export default useInput;
