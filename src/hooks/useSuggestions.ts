import { useEffect, useState } from 'react';
import { Suggestion } from '../constants/type';
import { SuggestionService } from '../service/SuggestionService';

export default function useSuggestions(
  debouncedInputText: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const suggestionService = new SuggestionService();
    suggestionService
      .get(debouncedInputText)
      .then((res) => {
        setSuggestions(res);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedInputText, setIsLoading]);

  return suggestions;
}
