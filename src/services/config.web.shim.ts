// Web shim for react-native-config
declare const process: {
  env: Record<string, string | undefined>;
};

const Config = {
  APP_NAME: process.env.APP_NAME || 'hbplus',
  APP_ENV: process.env.APP_ENV || 'development',
  GOOGLE_WEB_CLIENT_ID:
    process.env.GOOGLE_WEB_CLIENT_ID ||
    '205971563897-1ph1o46v3f61jtmq77bmah2c91sbpgjq.apps.googleusercontent.com',
  FIREBASE_API_KEY:
    process.env.FIREBASE_API_KEY || 'AIzaSyBIdiMfYciH8cz5P_QnhUt79bzYsnk8DEw',
  FIREBASE_AUTH_DOMAIN:
    process.env.FIREBASE_AUTH_DOMAIN || 'hbplus-1cba7.firebaseapp.com',
  FIREBASE_PROJECT_ID:
    process.env.FIREBASE_PROJECT_ID || 'hbplus-1cba7',
  FIREBASE_STORAGE_BUCKET:
    process.env.FIREBASE_STORAGE_BUCKET || 'hbplus-1cba7.firebasestorage.app',
  FIREBASE_MESSAGING_SENDER_ID:
    process.env.FIREBASE_MESSAGING_SENDER_ID || '205971563897',
  FIREBASE_APP_ID:
    process.env.FIREBASE_APP_ID || '1:205971563897:android:6dce00abeadf75e2d6bba8',
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
};

export default Config;

