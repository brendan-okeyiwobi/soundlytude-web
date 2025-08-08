// utils/fetchWithState.ts

export interface FetchResult<T> {
    loading: boolean;
    success: boolean;
    error: string | null;
    data: T | null;
  }
  
  export async  function fetchWithState<T>(url: string, options?: RequestInit): Promise<FetchResult<T>> {
    try {
      const res = await fetch(url, options);
  
      if (!res.ok) {
        let errorMessage = `Fetch failed. Status: ${res.status}`;
        try {
          const errorBody = await res.json();
          if (typeof errorBody === 'object') {
            errorMessage += `\nDetails: ${JSON.stringify(errorBody, null, 2)}`;
          }
        } catch {
          const textBody = await res.text();
          if (textBody) {
            errorMessage += `\nDetails: ${textBody}`;
          }
        }
  
        return {
          loading: false,
          success: false,
          error: errorMessage,
          data: null,
        };
      }
  
      const data: T = await res.json();
  
      return {
        loading: false,
        success: true,
        error: null,
        data,
      };
    } catch (err: unknown) {
      let errorMessage = 'Unknown error occurred';
      if (err instanceof Error) {
        // now we know `err.message` exists
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      return {
        loading: false,
        success: false,
        error: errorMessage,
        data: null,
      };
    }
  }
  