// Configuration for API endpoints
export const config = {
  // Use environment variable for API URL, fallback to relative path for local development
  apiUrl: import.meta.env.VITE_API_URL || '',
  
  // Helper function to get full API URL
  getApiUrl: (endpoint: string) => {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    if (baseUrl) {
      // Remove trailing slash from base URL and leading slash from endpoint
      const cleanBaseUrl = baseUrl.replace(/\/$/, '');
      const cleanEndpoint = endpoint.replace(/^\//, '');
      return `${cleanBaseUrl}/${cleanEndpoint}`;
    }
    // Fallback to relative path for local development
    return endpoint;
  }
};
