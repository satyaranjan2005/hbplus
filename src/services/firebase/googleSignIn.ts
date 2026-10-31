import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';

/**
 * Configure Google Sign-In SDK with the OAuth Web Client ID.
 */
export const configureGoogleSignIn = () => {
  try {
    const webClientId = Config.GOOGLE_WEB_CLIENT_ID || '';

    if (!webClientId) {
      console.warn('[GoogleSignin] Warning: GOOGLE_WEB_CLIENT_ID is not defined in environment');
    }

    GoogleSignin.configure({
      webClientId,
      scopes: ['profile', 'email'],
      offlineAccess: false,
    });
  } catch (error) {
    console.error('[GoogleSignin] Configuration error:', error);
  }
};

/**
 * Initiate Google Sign-In flow and authenticate with Firebase.
 */
export const signInWithGoogle = async () => {
  try {
    // Ensure Google Play Services are available (Android)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Trigger Google Sign-In UI prompt
    const response = await GoogleSignin.signIn();

    // In @react-native-google-signin/google-signin v17+, response may have data.idToken
    let idToken: string | null | undefined = null;
    if (response && 'data' in response && response.data && response.data.idToken) {
      idToken = response.data.idToken;
    } else if (response && 'idToken' in response) {
      idToken = (response as any).idToken;
    }

    if (!idToken) {
      throw new Error('Google Sign-In completed but no ID token was returned.');
    }

    // Create Firebase credential with Google ID token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in to Firebase with credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    const user = userCredential.user;

    // Validate authorized email domain from environment configuration
    const authorizedDomain = (Config.AUTHORIZED_EMAIL_DOMAIN || 'hbplus.fit').toLowerCase().trim();
    const email = user?.email?.toLowerCase().trim() || '';
    if (!email.endsWith(`@${authorizedDomain}`)) {
      // Invalidate session immediately
      await signOutGoogle();
      throw new Error(
        `Access Restricted:\nOnly institutional email accounts ending with @${authorizedDomain} are permitted.\n\nSigned in as: ${email || 'Unknown'}\n\nPlease switch to your @${authorizedDomain} account.`
      );
    }

    return user;
  } catch (error: any) {
    const errorCode = error?.code?.toString() || '';
    const errorMsg = error?.message?.toString() || '';

    if (errorCode === statusCodes.SIGN_IN_CANCELLED || errorCode === '12501') {
      console.log('[GoogleSignin] Sign-In cancelled by user');
      return null;
    }

    if (errorCode === statusCodes.IN_PROGRESS) {
      console.log('[GoogleSignin] Sign-In is already in progress');
      return null;
    }

    if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services is not available or needs updating on this device.');
    }

    if (errorCode === '7' || errorCode.includes('NETWORK_ERROR')) {
      throw new Error('Network Connection Failed:\nPlease check your internet connection and try again.');
    }

    if (errorCode === '10' || errorCode === 'DEVELOPER_ERROR' || errorMsg.includes('DEVELOPER_ERROR')) {
      throw new Error(
        'Google Sign-In Configuration Error (Code 10):\n' +
        '1. Add the debug keystore SHA-1 fingerprint to Firebase Console > Project Settings > Your Android App.\n' +
        '2. Verify that GOOGLE_WEB_CLIENT_ID matches the Web Client ID from your Firebase project.'
      );
    }

    if (errorCode === '12500' || errorMsg.includes('12500')) {
      throw new Error(
        'Google Sign-In Provider Error (Code 12500):\n' +
        'Please ensure Google Sign-In is enabled in Firebase Console (Authentication > Sign-in method) and a project support email is selected.'
      );
    }

    throw new Error(error?.message || `Google Sign-In failed (${errorCode || 'unknown error'}). Please try again.`);
  }
};

/**
 * Sign out from Google Sign-In and Firebase Auth.
 */
export const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (e) {
    console.warn('[GoogleSignin] Google sign-out warning:', e);
  }

  try {
    await auth().signOut();
  } catch (e) {
    console.warn('[GoogleSignin] Firebase sign-out warning:', e);
  }
};
