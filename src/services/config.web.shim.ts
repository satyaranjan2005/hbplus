// Web shim for react-native-config
declare const process: {
  env: Record<string, string | undefined>;
};

const Config = {
  APP_NAME: process.env.APP_NAME || 'hbplus',
  APP_ENV: process.env.APP_ENV || 'development',
  AUTHORIZED_EMAIL_DOMAIN: process.env.AUTHORIZED_EMAIL_DOMAIN || 'hbplus.fit',
  GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID || '',
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || '',
  API_BASE_URL: process.env.API_BASE_URL || '',
};

export default Config;
