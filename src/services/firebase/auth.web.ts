import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { webAuth } from './config.web';

/**
 * Register a new user with email and password on Web.
 */
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  const credential = await createUserWithEmailAndPassword(
    webAuth,
    email.trim(),
    password
  );
  return credential.user;
};

/**
 * Sign in existing user with email and password on Web.
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  const credential = await signInWithEmailAndPassword(
    webAuth,
    email.trim(),
    password
  );
  return credential.user;
};

/**
 * Sign out user on Web.
 */
export const signOutUser = async (): Promise<void> => {
  await signOut(webAuth);
};

/**
 * Send password reset email on Web.
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(webAuth, email.trim());
};

/**
 * Retrieve current authenticated user on Web.
 */
export const getCurrentUser = (): FirebaseUser | null => {
  return webAuth.currentUser;
};

/**
 * Subscribe to authentication state changes on Web.
 */
export const subscribeToAuthChanges = (
  onUserChanged: (user: FirebaseUser | null) => void
) => {
  return onAuthStateChanged(webAuth, onUserChanged);
};

/**
 * Helper to translate Firebase Auth error codes into human-readable messages.
 */
export const getAuthErrorMessage = (error: any): string => {
  if (!error || !error.code) {
    return error?.message || 'An unexpected error occurred. Please try again.';
  }

  switch (error.code) {
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect password or credentials. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email address is already in use by another account.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completing.';
    default:
      return error.message || 'Authentication error. Please try again.';
  }
};

