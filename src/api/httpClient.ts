import type { ApiError, RequestConfig } from '@/lib/types';

type RequestInterceptor = (config: RequestConfig) => Promise<RequestConfig> | RequestConfig;
type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

class HttpClient {
  private baseURL: string;
  private interceptors: {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
  };

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.interceptors.response.push(interceptor);
  }

  private async request<T>(endpoint: string, options: RequestConfig = {}): Promise<T> {
    let config: RequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Apply request interceptors
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config);
    }

    // Build URL with query params
    const url = this.buildUrl(endpoint, config.params);

    try {
      let response = await fetch(url, config);

      // Apply response interceptors
      for (const interceptor of this.interceptors.response) {
        response = await interceptor(response);
      }

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return await this.parseResponse<T>(response);
    } catch (error) {
      throw this.normalizeError(error);
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    const url = `${this.baseURL}${endpoint}`;
    
    if (!params) return url;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) {
      return null as T;
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return response.json();
    }

    return response.text() as T;
  }

  private async handleError(response: Response): Promise<ApiError> {
    let errorData: any;
    
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    return {
      status: response.status,
      message: errorData.message || 'Une erreur est survenue',
      errors: errorData.errors,
      data: errorData,
    };
  }

  private normalizeError(error: unknown): ApiError {
    if (this.isApiError(error)) {
      return error;
    }

    if (error instanceof Error) {
      return {
        status: 0,
        message: error.message || 'Erreur réseau',
        data: null,
      };
    }

    return {
      status: 0,
      message: 'Erreur inconnue',
      data: null,
    };
  }

  private isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'message' in error
    );
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...config });
  }

  async post<T, D = unknown>(endpoint: string, data?: D, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async put<T, D = unknown>(endpoint: string, data: D, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
  }

  async patch<T, D = unknown>(endpoint: string, data: D, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config,
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...config });
  }
}

// Instance singleton
export const httpClient = new HttpClient(import.meta.env.VITE_API_URL);

// Auth interceptor
httpClient.addRequestInterceptor((config) => {
  const token = localStorage.getItem('access_token');
  
  if (token && config.headers) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Retry on 401 interceptor
httpClient.addResponseInterceptor(async (response) => {
  if (response.status === 401) {
    // Refresh token logic here
    const refreshed = await refreshAccessToken();
    
    if (refreshed) {
      return fetch(response.url, {
        ...response,
        headers: {
          ...response.headers,
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    }
  }
  
  return response;
});

async function refreshAccessToken(): Promise<boolean> {
  // Implementation du refresh token
  return false;
}