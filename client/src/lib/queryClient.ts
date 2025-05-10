import { QueryClient, QueryFunction } from '@tanstack/react-query';

// Nếu chưa tạo file api.ts, chúng ta có thể định nghĩa hàm getApiUrl tạm thời
function getApiUrl(path: string): string {
  const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${formattedPath}`;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const error: any = new Error(data.message || res.statusText);
    error.status = res.status;
    error.data = data;
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";

// Sửa lại định nghĩa kiểu cho hàm này
export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T | null> => {
  return async ({ queryKey }) => {
    const [path] = queryKey as [string];
    const url = getApiUrl(path);
    
    const res = await fetch(url);
    
    if (res.status === 401) {
      if (options.on401 === "throw") {
        throw new Error("Unauthorized");
      }
      return null;
    }
    
    await throwIfResNotOk(res);
    return await res.json() as T;
  };
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = getApiUrl(path);
  const res = await fetch(url, options);
  await throwIfResNotOk(res);
  if (res.status === 204) {
    return null;
  }
  return await res.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn<unknown>({ on401: "returnNull" }),
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});