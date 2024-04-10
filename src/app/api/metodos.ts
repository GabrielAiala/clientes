import axios from './axios';

// Método para fazer uma requisição GET
export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Método para fazer uma requisição UPDATE
export const createData = async (endpoint: string, newData: any) => {
  try {
    const response = await axios.post(`/${endpoint}`, newData);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Método para fazer uma requisição DELETE
export const deleteData = async (endpoint: string) => {
  try {
    const response = await axios.delete(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};