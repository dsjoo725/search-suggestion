import { Suggestion } from '../constants/type';

export class CacheRepository {
  #NAME = 'suggestions';
  #EXPIRATION_TIME = 60 * 1000;

  isExpired(response: Response) {
    const currentDate = new Date().getTime();

    const cachedDate = response.headers.get('Date');
    if (!cachedDate) return;
    const fetchDate = new Date(cachedDate).getTime();

    const cacheControl = response.headers.get('Cache-Control');
    const matches = cacheControl?.match(/max-age=(\d+)/);
    if (!matches) return;
    const maxAge = parseInt(matches[1], 10);

    return currentDate - fetchDate > maxAge;
  }

  async save(text: string, suggestions: Suggestion[]) {
    const cache = await caches.open(this.#NAME);
    const response = new Response(JSON.stringify(suggestions), {
      headers: {
        'Cache-Control': `max-age=${this.#EXPIRATION_TIME}`,
        Date: new Date().toISOString(),
      },
    });
    await cache.put(text, response);
  }

  async get(text: string) {
    const cache = await caches.open(this.#NAME);
    const response = await cache.match(text);

    if (response && this.isExpired(response)) {
      this.delete(text);
      return null;
    }

    return response ? await response.json() : null;
  }

  async delete(text: string) {
    const cache = await caches.open(this.#NAME);
    await cache.delete(text);
  }
}
