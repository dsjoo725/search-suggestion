import { CacheRepository } from '../repository/CacheRepository';
import apiClient from '../utils/apiClient';

export class SuggestionService {
  async get(textInput: string) {
    const text = textInput.trim();

    if (text === '') return [];

    const cacheRepository = new CacheRepository();
    const cacheResponse = await cacheRepository.get(text);
    if (cacheResponse) {
      return cacheResponse;
    }

    console.info('calling api');
    const response = await apiClient.get(`/sick?q=${text}`);

    await cacheRepository.save(text, response.data);

    return response.data;
  }
}
