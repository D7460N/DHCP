import { loadNavItems, loadPageContent } from './loaders.js';
import { setupNavHandlers } from './scripts.js';

export async function initApp() {
	await loadNavItems();
	setupNavHandlers();
	const selected = document.querySelector('nav input[name="nav"]:checked');
	if (selected) {
		await loadPageContent(selected.value);
	}
}

initApp();
