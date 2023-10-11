export const getResident = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch planets data');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
