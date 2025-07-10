import { loadNavItems, loadPageContent, loadBannerContent, loadVersionInfo } from './loaders.js';
import { OPTIONS } from './config.js';

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
}

initApp();
