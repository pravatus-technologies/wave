import Constants from 'expo-constants';

// Safely access `extra` from Constants
const extra = Constants.expoConfig?.extra;

if (!extra) {
  throw new Error(
    '❌ `extra` config is missing from Constants.expoConfig. Check your app.config.js.'
  );
}

const { apiBaseUrl, env } = extra;

if (!apiBaseUrl) {
  throw new Error(
    '❌ API_BASE_URL is not defined. Check your app.config.js or environment variables.'
  );
}

const apiEndpoints = {
  baseUrl: apiBaseUrl,
  endpoints: {
    newRegistration: `${apiBaseUrl}/user/`,
    getPosts: `${apiBaseUrl}/posts/`,
    getFriends: `${apiBaseUrl}/friends`,
  },
};

export const API = apiEndpoints;

// Export environment config
export const ENV = env;
export const API_BASE_URL = apiBaseUrl;

export { THEME as light } from './light';
export { THEME as dark } from './dark';
