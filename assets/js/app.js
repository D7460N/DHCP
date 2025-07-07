import { loadNavItems, loadPageContent, loadBannerContent } from './loaders.js';
import { OPTIONS } from './config.js';

export async function initApp() {
  if (OPTIONS.showBanner) {
    await loadBannerContent();
  }
  await loadNavItems();
  const selected = document.querySelector('nav input[name="nav"]:checked');
  if (selected) {
    await loadPageContent(selected.value);
  }
}

initApp();
