// Service Worker for D7460N Project (SPA-friendly, Minimal, Project-Agnostic)
// Version: v4 (update to invalidate and refresh cache as needed)
const CACHE_NAME = 'cache-v4'

// Service Worker Update Configuration (consolidated here)
const SW_UPDATE_CONFIG = {
  enabled: false, // Disabled since version is now internal constant
  checkOnLoad: false,
  checkInterval: 0,
  forceUpdate: false,
  notifyUser: false
};

// List of assets to cache immediately during installation
const ASSETS = [
  './',
  './index.html',
  './assets/css/themes.css',
  './assets/css/layout.css',
  './assets/css/reset.css',
  './assets/css/loading.css',
  './assets/css/scrollbars.css',
  './assets/css/transitions.css',
  './assets/css/typography.css',
  './assets/css/responsive.css',
  './assets/css/a11y.css',
  './assets/css/forms.css',
  './assets/css/fonts.css',
  './assets/js/app.js',
  './assets/js/config.js',
  './assets/js/env.js',
  './assets/js/forms.js',
  './assets/js/fetch.js',
  './assets/js/inject.js',
  './assets/js/loaders.js',
  './assets/js/utils.js',
  './assets/js/schema.js',
  './assets/js/rules.js',
  './assets/js/errors.js',
  './assets/images/brand/logos/logo.svg'
]

// Install Event: Runs once when SW is first registered or updated
// Purpose: Cache essential static assets immediately
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets:', ASSETS.length, 'files')
        return cache.addAll(ASSETS)
      })
      .catch(err => {
        console.error('Asset caching failed:', err)
        // Try to cache assets individually to identify which ones fail
        return caches.open(CACHE_NAME).then(cache => {
          return Promise.allSettled(
            ASSETS.map(asset =>
              cache.add(asset).catch(error => {
                console.error(`Failed to cache ${asset}:`, error)
                return Promise.reject(error)
              })
            )
          )
        })
      })
  )
})


// Activate Event: Runs once SW is activated and controls the pages
// Purpose: Remove outdated caches to prevent resource/version conflicts
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME) // Select outdated caches
          .map(key => caches.delete(key))    // Delete old caches
      )
    )
  )
})

// Fetch Event: Runs on every network request by the app
// Purpose: Serve cached assets, fallback to network if not cached,
// then fallback to cached index.html for offline SPA experience
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).catch(() => caches.match('./index.html'))
    })
  )
})

// Background Sync Event: Runs automatically when connectivity is restored
// after offline state and pending sync events are registered
// Purpose: Retry API calls or other critical background tasks automatically
self.addEventListener('sync', evt => {
  // Log when sync is triggered
  console.log(`Background sync triggered for tag: ${evt.tag}`)

  evt.waitUntil(
    // Perform fetch to URL specified by evt.tag
    fetch(evt.tag)
      .then(res => res.json())
      .then(data => {
        // Sync succeeded: Notify all open clients/pages with fetched data
        console.log(`Sync successful for tag: ${evt.tag}`, data)
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ tag: evt.tag, data })
          })
        })
      })
      .catch(err => {
        // Sync failed: Log error for debugging
        console.error(`Sync failed for tag: ${evt.tag}`, err)
      })
  )
})
