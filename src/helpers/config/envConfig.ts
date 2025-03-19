export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://ku-server-eta.vercel.app/api/v1';
 // return process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api/v1';
}; 