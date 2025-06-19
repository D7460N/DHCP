export const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

export async function fetchJSON(endpoint = '') {
	try {
		const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
		const res = await fetch(url);
		const text = await res.text();
		const data = JSON.parse(text);
		return data;
	} catch (err) {
		console.error('Invalid JSON:', err);
		return { error: err.message };
	}
}
