import { default as instance } from 'axios';

const axios = instance.create();

axios.interceptors.request.use((config) => {
  config.headers['X-RIOT-TOKEN'] = process.env.RIOT_API_KEY;
  return config;
});

export default axios;
