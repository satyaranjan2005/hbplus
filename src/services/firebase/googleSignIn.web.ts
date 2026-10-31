import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import Config from 'react-native-config';
import { webAuth } from './config.web';

/**
 * Configure Google Sign-In on Web.
 */
export const configureGoogleSignIn = () => {
  // Web uses Firebase Web Auth popup directly
};

/**
 * Initiate Google Sign-In popup on Web and validate domain.
 */
export const signInWithGoogle = async () => {
  const authorizedDomain = (Config.AUTHORIZED_EMAIL_DOMAIN || 'hbplus.fit')
    .toLowerCase()
    .trim();

  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
      hd: authorizedDomain, // Hint to Google OAuth for institutional domain
    });

    const userCredential = await signInWithPopup(webAuth, provider);
    const user = userCredential.user;

    // Validate authorized email domain from environment configuration
    const email = user?.email?.toLowerCase().trim() || '';
    if (!email.endsWith(`@${authorizedDomain}`)) {
      await signOut(webAuth);
      throw new Error(
        `Access Restricted:\nOnly institutional email accounts ending with @${authorizedDomain} are permitted.\n\nSigned in as: ${email || 'Unknown'}\n\nPlease switch to your @${authorizedDomain} account.`
      );
    }

    return user;
  } catch (error: any) {
    const errorCode = error?.code || '';

    // Graceful handling for user cancellation
    if (
      errorCode === 'auth/popup-closed-by-user' ||
      errorCode === 'auth/cancelled-popup-request'
    ) {
      console.log('[GoogleSignIn Web] Sign-in cancelled by user');
      return null;
    }

    if (errorCode === 'auth/popup-blocked') {
      throw new Error(
        'Popup Blocked:\nYour browser blocked the Google Sign-In popup. Please allow popups for this site and try again.'
      );
    }

    if (errorCode === 'auth/unauthorized-domain') {
      throw new Error(
        'Unauthorized Web Domain:\nThis domain is not whitelisted in Firebase. Please add this domain to Firebase Console > Authentication > Settings > Authorized domains.'
      );
    }

    if (errorCode === 'auth/operation-not-allowed') {
      throw new Error(
        'Provider Disabled:\nGoogle Sign-In is not enabled in Firebase Console. Please enable Google in Authentication > Sign-in method.'
      );
    }

    if (errorCode === 'auth/network-request-failed') {
      throw new Error(
        'Network Connection Failed:\nPlease check your internet connection and try again.'
      );
    }

    throw new Error(
      error?.message || 'An unexpected error occurred during Google Sign-In. Please try again.'
    );
  }
};

/**
 * Sign out Google user on Web.
 */
export const signOutGoogle = async (): Promise<void> => {
  try {
    await signOut(webAuth);
  } catch (error) {
    console.error('[GoogleSignIn Web] Sign-out error:', error);
  }
};
