import { BASE_URL, JSON_HEADERS as HEADERS } from './config.js';

function toUrl(endpoint = '') {
	return endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
}

async function handle(res) {
	if (!res.ok) throw new Error(`STATUS ${res.status}`);
	const text = await res.text();
	JSON.parse(text);
	return text;
}

export async function fetchJSON(endpoint = '') {
	const res = await fetch(toUrl(endpoint));
	return handle(res);
}

export async function postJSON(endpoint = '', data = {}) {
	const res = await fetch(toUrl(endpoint), {
		method: 'POST',
		headers: HEADERS,
		body: JSON.stringify(data),
	});
	return handle(res);
}

export async function putJSON(endpoint = '', data = {}) {
	const res = await fetch(toUrl(endpoint), {
		method: 'PUT',
		headers: HEADERS,
		body: JSON.stringify(data),
	});
	return handle(res);
}

export async function deleteJSON(endpoint = '') {
	const res = await fetch(toUrl(endpoint), {
		method: 'DELETE',
		headers: HEADERS,
	});
	if (!res.ok) throw new Error(`STATUS ${res.status}`);
	return '';
}
