import { NAV_ENDPOINT, BANNER_ENDPOINT, OPTIONS, VERSION } from './config.js';
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

    // // Load ManageScope rules only for scope-type tab
    // if (endpoint === 'scope-type') {
    //   try {
    //     const manageScopeText = await fetchJSON('ManageScope');
    //     const [manageScopeData] = JSON.parse(manageScopeText);
    //     if (manageScopeData?.rules) {
    //       // Merge ManageScope rules with inferred rules
    //       rules = { ...rules, ...manageScopeData.rules };
    //     }
    //   } catch (err) {
    //     // Continue with inferred rules if ManageScope fetch fails
    //     console.warn('ManageScope rules not available:', err.message);
    //   }
    // }

    RULES_CACHE.set(endpoint, rules);
  }
  ACTIVE_RULES = rules;

  injectPageContent(endpoint, data);
}

export function loadVersionInfo() {
  try {
    const appVersionElement = document.querySelector('app-version');
    if (appVersionElement) {
      appVersionElement.textContent = `v${VERSION.version}`;
    }
  } catch (err) {
    console.warn('Could not load version info:', err);
  }
}
