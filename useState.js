import { useState } from 'react';

const useCounter = () => {
  const [item, setItem] = useState(1);

  const increment = () => setItem(item + 1);
  const decrement = () => setItem(item - 1);

  return { item, increment, decrement };
}

export default useCounter;