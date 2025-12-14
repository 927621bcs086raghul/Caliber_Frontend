/**
 * Centralized Frontend Configuration
 * 
 * All environment variables are loaded and validated here.
 * Import this file instead of directly accessing import.meta.env
 * 
 * Note: Vite exposes env variables prefixed with VITE_ to the client
 */

const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    serverURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },

  // Socket.IO Configuration
  socket: {
    url: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
  },

  // Application Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Caliber',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    debug: import.meta.env.VITE_DEBUG === 'true',
  },

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
};

// Log configuration in development
if (config.isDevelopment && config.app.debug) {
  console.log('🔧 Frontend Configuration:', {
    apiBaseURL: config.api.baseURL,
    serverURL: config.api.serverURL,
    socketURL: config.socket.url,
    mode: config.mode,
  });
}

export default config;