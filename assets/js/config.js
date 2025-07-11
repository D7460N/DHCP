import { isDev, isTest, isProd, FEATURES } from './env.js';

export const API_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

// App version information
export const VERSION = {
        version: '0.1.0-alpha',
        timestamp: '2025-07-10T12:00:00Z',
        build: '20250710120000',
        description: 'Pre-beta development version with modular architecture'
};

export const OPTIONS = {
        showBanner: true,
        warnOnBlur: !isDev, // Don't warn on blur in development
        debugging: FEATURES.debugging,
        liveReload: FEATURES.liveReload,
        caching: FEATURES.caching,
};

// API endpoint paths
export const NAV_ENDPOINT = 'navItems';
export const BANNER_ENDPOINT = 'app-banner';

// Valid data endpoints referenced in scripts
export const ENDPOINTS = [
        'manage',
        'api-registration',
        'audit',
        'credentials',
        'faqs',
        'option-set',
        'option-types',
        'scope-type',
        'server-types',
        'servers',
        'variables',
        'settings',
];

// Confirmation flags for unsaved change prompts
export const CONFIRM_FLAGS = {
        save: { value: false },
        delete: { value: false },
        reset: { value: false },
        close: { value: false },
};

// Standard JSON request headers
export const JSON_HEADERS = { 'Content-Type': 'application/json' };

// DHCP type options used for dropdowns (matches actual data casing)
export const DHCP_TYPES = ['Host', 'IP', 'URL', 'File', 'Service'];
