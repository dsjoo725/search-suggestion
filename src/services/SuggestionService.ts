import { Suggestion } from '../constants/type';
import { CacheRepository } from '../repositories/CacheRepository';
import apiClient from '../utils/apiClient';

export class SuggestionService {
  async get(textInput: string): Promise<Suggestion[]> {
    const text = textInput.trim();

    if (text === '') return [];

    const cacheRepository = new CacheRepository();
    const cacheResponse = await cacheRepository.get(text);
    if (cacheResponse) {
      return cacheResponse;
    }

    console.info('calling api');
    const response = await apiClient.get(`/sick?q=${text}`);
    const data = response.data.slice(0, 7);
    await cacheRepository.save(text, data);

    return data;
  }
}
