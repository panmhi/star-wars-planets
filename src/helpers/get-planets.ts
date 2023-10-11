import { wait } from '@/lib/utils';
import { PaginationResponse, Planet } from '@/models/planet-models';

export const getPlanetsWithPagination = async (
  page: string
): Promise<PaginationResponse<Planet>> => {
  try {
    const url = `https://swapi.dev/api/planets/?page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch planets data');
    }
    await wait(1000);
    return response.json();
  } catch (error) {
    throw error;
  }
};
