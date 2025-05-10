/**
 * Utility file for all API calls
 */

// Determine the base API URL based on environment
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // In production, use relative paths
  : 'http://localhost:3000'; // In development, use absolute URL with port

/**
 * Get the full API URL with proper base URL
 */
export function getApiUrl(path: string): string {
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${formattedPath}`;
}

/**
 * Generic API request function
 */
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(path);
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle response
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || `API error: ${response.status} ${response.statusText}`
    );
    throw Object.assign(error, { status: response.status, data: errorData });
  }

  // Return JSON response or empty object if no content
  return response.status === 204 ? {} as T : await response.json();
}

/**
 * API request methods
 */
export const api = {
  get: <T>(path: string, options?: RequestInit) => 
    apiRequest<T>(path, { method: 'GET', ...options }),
  
  post: <T>(path: string, data?: unknown, options?: RequestInit) => 
    apiRequest<T>(path, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  put: <T>(path: string, data?: unknown, options?: RequestInit) => 
    apiRequest<T>(path, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  patch: <T>(path: string, data?: unknown, options?: RequestInit) => 
    apiRequest<T>(path, { 
      method: 'PATCH', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  delete: <T>(path: string, options?: RequestInit) => 
    apiRequest<T>(path, { method: 'DELETE', ...options }),
};