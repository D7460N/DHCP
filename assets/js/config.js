// config.js

// A mapping of human-readable tab names (from the UI) to their backend API endpoints.
// These keys must match the text content of the <label> elements used in the navigation.
// The values are the names of corresponding mockAPI.io endpoints.
export const API_MAP = {
  "manage": "manage",
  "faqs": "faqs",
  "option-types": "option-types",
  "api-registration": "api-registration",
  "audit": "audit",
  "option-set": "option-set",
  "scope-type": "scope-type",
  "server-types": "server-types",
  "servers": "servers",
  "credentials-and-background-jobs": "credentials-and-background-jobs",
  "variables": "variables",
  "settings": "settings"
};

// Base URL for your mock API. All endpoint calls append to this root.
export const API_ROOT = "https://67d944ca00348dd3e2aa65f4.mockapi.io";

// Author tag used to track modifications and attributions.
export const AUTHOR = "D7460N";

// Hardcoded version of the web UI for reference or logging.
export const VERSION = "0.0.1";

// Timestamp representing when the app or session was initialized.
export const DATE = new Date().toISOString();

// Descriptive application metadata — useful for display or footer content.
export const APP_NAME = "D7460N DHCP Web UI";
export const APP_DESC = "A web interface for managing DHCP entries";

// Dynamic copyright string, evaluated once per session.
export const APP_COPYRIGHT = `© ${new Date().getFullYear()} ${AUTHOR}. All rights reserved.`;
