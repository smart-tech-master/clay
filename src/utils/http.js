import axios from 'axios';

const rootElement = document.getElementById('root');
const baseURL = rootElement?.getAttribute('data-assetsurl') || '';

const options = {
	//baseURL: "https://clay.powdev.lt/en/module/revisualizer/"
	baseURL
}

const instance = axios.create(options);

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log('[AXIOS]', 'RESPONSE', JSON.stringify({ error }));
	    if (error.response.status !== 401) {
	      	return Promise.reject(error);
	    }
	}
);

instance.interceptors.request.use(
  (config) => {
    try {
      	return config;
    } catch (error) {
       	console.log('[AXIOS]', 'REQUEST', JSON.stringify({ error }));
      	return config;
    }
  },
  (error) => Promise.reject(error),
);

export default instance;