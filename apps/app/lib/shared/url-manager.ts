export const BASE_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'friehub.cloud';

export const URLS = {
    landing: process.env.NEXT_PUBLIC_LANDING_URL || `https://${BASE_DOMAIN}`,
    taas: process.env.NEXT_PUBLIC_TAAS_URL || `https://taas.${BASE_DOMAIN}`,
    admin: process.env.NEXT_PUBLIC_ADMIN_URL || `https://admin.${BASE_DOMAIN}`,
    docs: process.env.NEXT_PUBLIC_DOCS_URL || `https://docs.${BASE_DOMAIN}`,
};

export function getTaasUrl(path = '') {
    return `${URLS.taas}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getAdminUrl(path = '') {
    return `${URLS.admin}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getLandingUrl(path = '') {
    return `${URLS.landing}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getDocsUrl(path = '') {
    return `${URLS.docs}${path.startsWith('/') ? path : `/${path}`}`;
}

// Keeping aliases for backward compatibility if needed, but transitioning to 'taas'
export const getDashboardUrl = getTaasUrl;
