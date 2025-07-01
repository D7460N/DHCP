export const BASE_URL = 'https://67d944ca00348dd3e2aa65f4.mockapi.io/';

export const OPTIONS = {
        showBanner: true,
        warnOnBlur: true,
};

// API endpoint paths
export const NAV_ITEMS_ENDPOINT = 'navItems';
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

// DHCP type options used for dropdowns
export const DHCP_TYPES = ['host', 'ip', 'url', 'file', 'service'];
