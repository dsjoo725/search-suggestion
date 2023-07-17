import instance from './instance';

export const search = async (inputText: string) => {
  const text = inputText.trim(); //공백제거
  if (text === '') return [];

  const response = await instance.get(`/sick?q=${text}`);
  console.info('calling api');
  return response.data;
};
