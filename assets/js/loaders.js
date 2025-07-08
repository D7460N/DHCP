import { NAV_ENDPOINT, BANNER_ENDPOINT } from './config.js';
import { fetchJSON } from './fetch.js';
import { normalizeRecord, normalizeItems } from './schema.js';
import { inferFieldRules } from './rules.js';
import { injectNavItems, injectPageContent } from './inject.js';

const RULES_CACHE = new Map();
let ACTIVE_RULES = {};

export function getFieldRules() {
  return ACTIVE_RULES;
}

export async function loadBannerContent() {
  try {
    const bannerText = await fetchJSON(BANNER_ENDPOINT);
    const [first] = JSON.parse(bannerText);
    const message = first?.banner?.trim();
    const fallback = message || 'ℹ️ No banner message configured.';
    document.querySelectorAll('app-banner > p').forEach(p => {
      p.textContent = fallback;
    });
  } catch (err) {
    const msg = err.message.startsWith('STATUS')
      ? `⚠️ Server responded with code ${err.message.slice(7)}`
      : `⚠️ Network error: Could not load banner`;
    document.querySelectorAll('app-banner > p').forEach(p => {
      p.textContent = msg;
    });
  }
}

export async function loadNavItems() {
  const text = await fetchJSON(NAV_ENDPOINT);
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

