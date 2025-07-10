import { loadNavItems, loadPageContent, loadBannerContent, loadVersionInfo } from './loaders.js';
import { OPTIONS } from './config.js';
import { SW_CONFIG, isDev, isProd } from './env.js';

export async function initApp() {
  if (OPTIONS.showBanner) {
    await loadBannerContent();
  }
  await loadNavItems();
  loadVersionInfo();
  const selected = document.querySelector('nav input[name="nav"]:checked');
  if (selected) {
    await loadPageContent(selected.value);
  }

  // Initialize service worker based on environment
  if ('serviceWorker' in navigator) {
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
}

initApp();
