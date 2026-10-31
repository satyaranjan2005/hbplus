import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

/**
 * Register a new user with email and password.
 */
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.User> => {
  const credential = await auth().createUserWithEmailAndPassword(
    email.trim(),
    password
  );
  return credential.user;
};

/**
 * Sign in existing user with email and password.
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.User> => {
  const credential = await auth().signInWithEmailAndPassword(
    email.trim(),
    password
  );
  return credential.user;
};

/**
 * Sign out the currently logged-in user.
 */
export const signOutUser = async (): Promise<void> => {
  await auth().signOut();
};

/**
 * Send password reset email.
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  await auth().sendPasswordResetEmail(email.trim());
};

/**
 * Retrieve current authenticated user.
 */
export const getCurrentUser = (): FirebaseAuthTypes.User | null => {
  return auth().currentUser;
};

/**
 * Subscribe to authentication state changes.
 */
export const subscribeToAuthChanges = (
  onUserChanged: (user: FirebaseAuthTypes.User | null) => void
) => {
  return auth().onAuthStateChanged(onUserChanged);
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
      return 'The password must be at least 6 characters long.';
    case 'auth/network-request-failed':
      return 'Network connection failed. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return error.message || 'Authentication failed.';
  }
};
