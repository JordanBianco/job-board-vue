import axios from 'axios'
import store from '@/store'

const api = axios.create({
	baseURL: 'https://protected-retreat-96525.herokuapp.com/api',
	withCredentials: true
	// baseURL: 'http://localhost:8000/api'
})

api.interceptors.request.use(function(config) {
	const token = store.getters['auth/token'];
	if(token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, function(err) {
	return Promise.reject(err);
});

export default api