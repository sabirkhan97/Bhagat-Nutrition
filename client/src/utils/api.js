import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const getProducts = (params = {}) => api.get('/products', { params }).then(r => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then(r => r.data);
export const getCategories = () => api.get('/categories').then(r => r.data);
export const getBrands = () => api.get('/brands').then(r => r.data);
export const getGoals = () => api.get('/goals').then(r => r.data);
export const createOrder = (data) => api.post('/orders', data).then(r => r.data);
export const trackOrder = (id) => api.get(`/orders/track/${id}`).then(r => r.data);
export const submitContact = (data) => api.post('/contact', data).then(r => r.data);

export default api;
