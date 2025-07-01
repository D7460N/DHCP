import { NAV_ITEMS_ENDPOINT } from './config.js';
import { fetchJSON } from './fetch.js';
import { normalizeRecord, normalizeItems } from './schema.js';
import { inferFieldRules } from './rules.js';
import { injectNavItems, injectPageContent } from './inject.js';

const RULES_CACHE = new Map();
let ACTIVE_RULES = {};

export function getFieldRules() {
  return ACTIVE_RULES;
}

export async function loadNavItems() {
  const text = await fetchJSON(NAV_ITEMS_ENDPOINT);
  const [data] = JSON.parse(text);
  injectNavItems(data);
}

export async function loadPageContent(endpoint = '') {
  const text = await fetchJSON(endpoint);
  const [raw] = JSON.parse(text);
  const data = normalizeRecord('', raw);
  data.items = normalizeItems(endpoint, raw.items || []);

  let rules = RULES_CACHE.get(endpoint);
  if (!rules) {
    rules = inferFieldRules(data.items);
    RULES_CACHE.set(endpoint, rules);
  }
  ACTIVE_RULES = rules;

  injectPageContent(endpoint, data);
}

