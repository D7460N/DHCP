export const ENV = (() => {
  const host = location.hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return 'dev';
  if (/test|qa|staging/.test(host)) return 'test';
  return 'prod';
})();

export const isDev = ENV === 'dev';
export const isTest = ENV === 'test';
export const isProd = ENV === 'prod';

// Service Worker Configuration
export const SW_CONFIG = {
  enabled: isProd, // Only enable in production
  unregisterInDev: isDev, // Unregister existing SW in development
  path: './sw.js',
  scope: './'
};

// Environment-specific feature flags
export const FEATURES = {
  serviceWorker: SW_CONFIG.enabled,
  liveReload: isDev,
  caching: isProd,
  debugging: isDev || isTest
};
