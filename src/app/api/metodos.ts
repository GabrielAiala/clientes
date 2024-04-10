import axios from 'axios';

const API_BASE_URL = 'https://api-clientes-three.vercel.app';

// Método para fazer uma requisição GET
export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Método para fazer uma requisição UPDATE
export const createData = async (endpoint: string, newData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, newData);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Método para fazer uma requisição DELETE
export const deleteData = async (endpoint: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};