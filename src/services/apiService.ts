import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  }

  get<T>(url: string): Promise<T> {
    return this.axiosInstance.get(url).then((response) => response.data);
  }

  // Add other methods (post, put, delete) if needed
}

export const apiService = new ApiService();