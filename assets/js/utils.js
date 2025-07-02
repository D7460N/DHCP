export function formatDateForInput(str = '') {
	const d = new Date(str);
	return Number.isNaN(d) ? '' : d.toISOString().slice(0, 16);
}

export function normalizeKey(str = '') {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/_/g, '-')
		.toLowerCase();
}

export function snapshotForm(elements = []) {
	const data = {};
	elements.forEach(el => {
		data[el.name] = el.value;
	});
	return data;
}

export function hasUnsavedChanges(elements = [], original = {}) {
	return Array.from(elements).some(el => el.value !== original[el.name]);
}
