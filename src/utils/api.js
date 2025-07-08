import http from './http';

export const getQuery = (endpoint) => http.get(endpoint);
export const postQuery = (endpoint, data) => http.post(endpoint, data);