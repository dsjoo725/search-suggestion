import { search } from '../apis/search';
import { Suggestion } from '../constants/type';

export const cacheSearch = async (
  url: string,
  inputText: string
): Promise<Suggestion[]> => {
  const cacheStorage = await caches.open(url);

  let response = await cacheStorage.match(inputText);

  if (response) {
    const data = (await response.json()) as Suggestion[];
    return data;
  }

  await search(inputText)
    .then(async (res: Suggestion[]) => {
      const data = res.slice(0, 10);
      await cacheStorage.put(inputText, new Response(JSON.stringify(data)));
      return data;
    })
    .catch((err) => {
      throw err;
    });

  return [];
};
