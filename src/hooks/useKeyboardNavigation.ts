import { useState, useEffect } from 'react';
import useKeyDown from './useKeyDown';

export const useKeyboardNavigation = (
  elementRefs: React.MutableRefObject<HTMLElement[]>,
  initDependency: string,
  onEnter: () => void
) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useKeyDown({
    onArrowDown: () => setFocusedIndex((prevIndex) => prevIndex + 1),
    onArrowUp: () => setFocusedIndex((prevIndex) => prevIndex - 1),
    onEnter: onEnter,
  });

  useEffect(() => {
    if (elementRefs.current[focusedIndex]) {
      elementRefs.current[focusedIndex].focus();
    } else if (focusedIndex < 0)
      setFocusedIndex(elementRefs.current.length - 1);
    else if (focusedIndex > elementRefs.current.length - 1) setFocusedIndex(0);
  }, [elementRefs, focusedIndex]);

  useEffect(() => {
    elementRefs.current = [];
    setFocusedIndex(-1);
  }, [elementRefs, initDependency]);

  return focusedIndex;
};
