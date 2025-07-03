
import { authKey } from "@/constants/authkey";
import { removeUser } from "@/services/auth.services";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/common";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

// Define interface for API error response
interface ApiErrorResponse {
  message?: string;
  errorMessages?: Array<{ path: string; message: string }>;
  statusCode?: number;
}

// Create axios instance with default configuration
const axiosInstance = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add authentication token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Return the response data structure as expected
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const errorData = error.response?.data;

    // Handle different error status codes
    if (status === 401) {
      // Unauthorized - clear user data and redirect to login
      await removeUser();
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    if (status === 403) {
      // Forbidden - user doesn't have permission
      console.error('Access forbidden');
    }

    // For server errors (500)
    if (status && status >= 500) {
      console.error('Server error:', errorData?.message || 'Internal server error');
    }

    // Create standardized error response
    const errorResponse: IGenericErrorResponse = {
      statusCode: status || 500,
      message: errorData?.message || error.message || "Something went wrong!",
      errorMessages: errorData?.errorMessages || [{
        path: '',
        message: errorData?.message || error.message || "Something went wrong!"
      }],
    };

    // Reject with the standardized error format
    return Promise.reject(errorResponse);
  }
);

export { axiosInstance };