import { useCallback, useEffect } from 'react';

const useKeyDown = ({
  onArrowDown = () => {},
  onArrowUp = () => {},
  onEnter = () => {},
}: {
  onArrowDown?: () => void;
  onArrowUp?: () => void;
  onEnter?: () => void;
}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onArrowDown();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        onArrowUp();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        onEnter();
      }
    },
    [onArrowDown, onArrowUp, onEnter]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyDown;
