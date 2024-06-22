// src/services/pocketbase.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

const pocketBaseUrl = process.env.REACT_APP_POCKETBASE_URL;

if (!pocketBaseUrl) {
  throw new Error('REACT_APP_POCKETBASE_URL is not defined in the environment variables');
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: pocketBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // Add other user fields as needed
  };
}

export interface Record {
  id: string;
  name: string;
  // Add other record fields as needed
}

export interface RecordsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Record[];
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/api/collections/users/auth-with-password', {
      identity: email,
      password: password,
    });
    const { token, user } = response.data;
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('pocketbase_token', token);
    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('pocketbase_token');
  delete apiClient.defaults.headers.common['Authorization'];
};

export const getRecords = async (
  collection: string,
  page = 1,
  perPage = 50,
  filter = ''
): Promise<RecordsResponse> => {
  try {
    const response = await apiClient.get<RecordsResponse>(`/api/collections/${collection}/records`, {
      params: {
        page,
        perPage,
        filter,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch records');
    }
    throw error;
  }
};

export const createRecord = async (collection: string, data: any): Promise<Record> => {
  try {
    const response = await apiClient.post<Record>(`/api/collections/${collection}/records`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Failed to create record');
    }
    throw error;
  }
};

export const updateRecord = async (collection: string, id: string, data: any): Promise<Record> => {
  try {
    const response = await apiClient.patch<Record>(`/api/collections/${collection}/records/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Failed to update record');
    }
    throw error;
  }
};

export const deleteRecord = async (collection: string, id: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/collections/${collection}/records/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || 'Failed to delete record');
    }
    throw error;
  }
};

// Function to initialize the API client with a stored token
export const initializeApiClient = (): void => {
  const token = localStorage.getItem('pocketbase_token');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};