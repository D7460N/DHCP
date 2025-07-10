// MARK: VERSION-DISPLAY.JS
// Dynamic version display management

import { SW_UPDATE_CONFIG } from './env.js';

// Update the app version display
export async function updateVersionDisplay() {
  try {
    const response = await fetch(SW_UPDATE_CONFIG.versionEndpoint, { cache: 'no-cache' });
    if (!response.ok) {
      console.warn('Could not fetch version info');
      return;
    }

    const versionData = await response.json();
    const appVersionElement = document.querySelector('app-version');

    if (appVersionElement) {
      appVersionElement.textContent = `v${versionData.version}`;
      appVersionElement.title = `Version ${versionData.version} - Build ${versionData.build}`;
    }

    console.log('Version display updated:', versionData.version);
  } catch (error) {
    console.error('Failed to update version display:', error);
  }
}

// Initialize version display on page load
export function initVersionDisplay() {
  // Update immediately
  updateVersionDisplay();

  // Listen for version updates from service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'VERSION_UPDATE_AVAILABLE') {
        updateVersionDisplay();
      }
    });
  }
}
