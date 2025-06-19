export const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

export async function fetchJSON(endpoint = '') {
	try {
		const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
		const res = await fetch(url);
		const text = await res.text();
		JSON.parse(text); // validate JSON
		return text;
	} catch (err) {
		console.error('Invalid JSON:', err);
		return `Error: ${err.message}`;
	}
}
