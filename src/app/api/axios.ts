import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://simple-api-test-pied.vercel.app/', // substitua pela URL da sua API
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  },
});

export default instance;