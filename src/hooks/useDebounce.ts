import { useEffect, useState } from 'react';

export default function useDebounce(
  value: string,
  delay: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay, setIsLoading]);

  return debouncedValue;
}
