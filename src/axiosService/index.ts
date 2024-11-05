import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BACKEND_URL } from '@src/setting';

class AxiosService {
	instance: AxiosInstance;

	constructor() {
		this.instance = axios.create({
			baseURL: BACKEND_URL,
		});
		this.instance.interceptors.response.use(this.handleSuccess, this.handleError);
	}

	handleSuccess = (res: AxiosResponse) => {
		return Promise.resolve(res);
	};

	handleError = (err: AxiosError) => {
		return Promise.reject(err.response.data);
	};

	getConfig() {
		const jwt = localStorage.getItem('jwt');
		return {
			headers: {
				authorization: jwt && `Bearer ${jwt}`,
			},
		};
	}

	post(url: string, data: any) {
		const config = this.getConfig();
		return this.instance.post(url, data, config);
	}

	get(url: string, isConfig = true) {
		const config = this.getConfig();

		if (isConfig) {
			return this.instance.get(url, config);
		}
		return this.instance.get(url);
	}

	patch(url: string) {
		const config = this.getConfig();
		return this.instance.patch(url, null, config);
	}
}

export default new AxiosService();