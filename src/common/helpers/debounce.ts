import * as React from 'react';

export default function useDebounceValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const [debounceLoading, setDebounceLoading] = React.useState(false);
  React.useEffect(() => {
    setDebounceLoading(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebounceLoading(false);
    }, delay);
    return () => {
      clearTimeout(handler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { debouncedValue, debounceLoading };
}
