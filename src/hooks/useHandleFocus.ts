import { useCallback } from 'react';

const KEY_NAME = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  enter: 'Enter',
};

function useHandleFocus(
  focusableElements: React.MutableRefObject<HTMLElement[]>
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const currentFocusedIndex = focusableElements.current.findIndex(
        (element) => element === document.activeElement
      );

      if (event.key === KEY_NAME.arrowDown) {
        event.preventDefault();
        if (currentFocusedIndex < focusableElements.current.length - 1) {
          const nextElement = focusableElements.current[
            currentFocusedIndex + 1
          ] as HTMLElement;
          nextElement.focus();
          event.preventDefault();
        }
        return;
      }

      if (event.key === KEY_NAME.arrowUp) {
        event.preventDefault();
        if (currentFocusedIndex > 0) {
          const prevElement = focusableElements.current[
            currentFocusedIndex - 1
          ] as HTMLElement;
          prevElement.focus();
          event.preventDefault();
        }
        return;
      }

      if (event.key === KEY_NAME.enter) {
      }
    },
    [focusableElements]
  );
  return { handleKeyDown };
}

export default useHandleFocus;
