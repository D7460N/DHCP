// MARK: SW-REGISTRATION.JS
// Environment-based service worker registration

import { SW_CONFIG, isDev, isProd } from './env.js';

// Initialize service worker registration based on environment
export function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  if (SW_CONFIG.unregisterInDev && isDev) {
    // Development: Unregister any existing service workers
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
        console.log('Service Worker unregistered for development');
      });
    });
  } else if (SW_CONFIG.enabled && isProd) {
    // Production: Register service worker
    navigator.serviceWorker.register(SW_CONFIG.path, { scope: SW_CONFIG.scope })
      .then(() => navigator.serviceWorker.ready)
      .then(reg => console.log('Service Worker registered:', reg))
      .catch(err => console.error('SW registration failed:', err));
  }
}
