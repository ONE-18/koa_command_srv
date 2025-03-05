// Allow all origins
const CORS_SYSTEMAPI_ALLOWED_ORIGINS: Array<string> = [
  '*', 
]
 
// Exclude some endpoints from CORS check
const CORS_SYSTEMAPI_EXCLUDED_ENDPOINTS: Array<string> = [
  '/auth/login',
]

// Port to run the server
const PORT = 3000

export {
  CORS_SYSTEMAPI_ALLOWED_ORIGINS,
  CORS_SYSTEMAPI_EXCLUDED_ENDPOINTS,
  PORT,
}