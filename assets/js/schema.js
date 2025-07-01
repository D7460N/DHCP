export const BASE_MAP = {
	intro: 'description',
};

export const ENDPOINT_SCHEMAS = {
	manage: {
		itemName: 'name',
		itemCreated: 'created',
		itemUpdated: 'updated',
		itemAuthor: 'author',
		itemModified: 'modified',
		itemType: 'type',
	},
	'api-registration': {
		itemName: 'name',
		itemCreated: 'created',
		itemUpdated: 'updated',
		itemAuthor: 'author',
		itemModifiedBy: 'modified',
		itemType: 'type',
	},
	audit: {
		type: 'type',
		timestamp: 'timestamp',
		user: 'user',
		action: 'action',
		target: 'target',
		details: 'details',
	},
	credentials: {
		subtype: 'subtype',
		type: 'type',
		name: 'name',
		description: 'description',
		schedule: 'schedule',
		status: 'status',
		enabled: 'enabled',
	},
	faqs: {
		question: 'question',
		answer: 'answer',
	},
	'option-set': {
		type: 'type',
		name: 'name',
		description: 'description',
		options: 'options',
	},
	'option-types': {
		type: 'type',
		name: 'name',
		description: 'description',
		enabled: 'enabled',
	},
	'scope-type': {
		type: 'type',
		name: 'name',
		description: 'description',
		enabled: 'enabled',
	},
	servers: {
		itemName: 'name',
		itemCreated: 'created',
		itemUpdated: 'updated',
		itemAuthor: 'author',
		itemModified: 'modified',
		itemType: 'type',
		itemOS: 'os',
		itemStatus: 'status',
	},
	'server-types': {
		itemName: 'name',
		itemCreated: 'created',
		itemUpdated: 'updated',
		itemAuthor: 'author',
		itemModified: 'modified',
		itemType: 'type',
		itemOS: 'os',
		itemStatus: 'status',
	},
	variables: {
		name: 'name',
		value: 'value',
		description: 'description',
		type: 'type',
	},
	settings: {},
};

const invert = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

export const REVERSE_SCHEMAS = Object.fromEntries(
	Object.entries(ENDPOINT_SCHEMAS).map(([ep, map]) => [ep, invert(map)]),
);

export const BASE_REVERSE = invert(BASE_MAP);

export function normalizeRecord(endpoint = '', record = {}) {
	const schema = { ...BASE_MAP, ...(ENDPOINT_SCHEMAS[endpoint] || {}) };
	const out = {};
	for (const [key, val] of Object.entries(record)) {
		out[schema[key] || key] = val;
	}
	return out;
}

export function denormalizeRecord(endpoint = '', record = {}) {
	const schema = { ...BASE_REVERSE, ...(REVERSE_SCHEMAS[endpoint] || {}) };
	const out = {};
	for (const [key, val] of Object.entries(record)) {
		out[schema[key] || key] = val;
	}
	return out;
}

export const normalizeItems = (endpoint = '', items = []) =>
	items.map(item => normalizeRecord(endpoint, item));

export const denormalizeItems = (endpoint = '', items = []) =>
	items.map(item => denormalizeRecord(endpoint, item));
