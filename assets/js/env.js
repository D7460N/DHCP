export const ENV = (() => {
  const host = location.hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return 'dev';
  if (/test|qa|staging/.test(host)) return 'test';
  return 'prod';
})();

export const isDev = ENV === 'dev';
export const isTest = ENV === 'test';
export const isProd = ENV === 'prod';

// Environment-specific feature flags
export const FEATURES = {
  liveReload: isDev,
  debugging: isDev || isTest,
  verboseLogging: !isProd
};
