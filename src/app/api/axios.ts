import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-clientes-three.vercel.app', // substitua pela URL da sua API
  headers: {
    'Access-Control-Allow-Origin': '*', // ou defina a origem permitida
  },
});

export default instance;