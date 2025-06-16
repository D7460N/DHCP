export const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

export async function fetchJSON(endpoint) {
	try {
		const text = await fetch(`${BASE_URL}${endpoint}`).then(r => r.text());
		JSON.parse(text);
		return text;
	} catch (err) {
		console.error('fetchJSON error:', err);
		return '';
	}
}
