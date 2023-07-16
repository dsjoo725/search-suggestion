import instance from './instance';

export const search = async (name: string) => {
  if (name === '') return [];

  const response = await instance.get(`/sick?q=${name}`);
  return response.data;
};
