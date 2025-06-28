export function inferFieldRules(items = []) {
	if (!items.length) return {};

	const rules = {};
	const valueMap = {};

	for (const item of items) {
		for (const [key, value] of Object.entries(item)) {
			if (!valueMap[key]) valueMap[key] = new Set();
			if (typeof value === 'string') valueMap[key].add(value);
		}
	}

	for (const key of Object.keys(items[0])) {
		const sampleValue = items[0][key];
		const values = [...(valueMap[key] ?? [])];

		if (typeof sampleValue === 'boolean') {
			rules[key] = { type: 'toggle' };
		} else if (typeof sampleValue === 'string') {
			if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(sampleValue)) {
				rules[key] = { type: 'datetime', readOnly: true };
			} else if (key === 'id' || /^[a-f0-9\-]{36}$/.test(sampleValue)) {
				rules[key] = { type: 'text', readOnly: true };
			} else if (values.length <= 10 && values.every(v => v.length < 20)) {
				rules[key] = { type: 'select', options: values };
			} else if (sampleValue.length > 100) {
				rules[key] = { type: 'textarea' };
			} else {
				rules[key] = { type: 'text' };
			}
		} else {
			rules[key] = { type: 'text' };
		}
	}

	return rules;
}
