// configs/api.ts — replace entire file
export const ENDPOINT =
    process.env.NEXT_PUBLIC_API_URL ?? 'https://api.l2global.in/';

export const DEV_ENDPOINT =
    process.env.NEXT_PUBLIC_DEV_API_URL ?? 'http://localhost:3100/';

export const WEB_ENDPOINT = 'https://l2global.in/';
