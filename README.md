# HB+ Enterprise Workspace

A minimal, high-performance employee workspace and task management application designed for **HB+**. Built with a unified React Native codebase that runs seamlessly across both **Mobile (Android/iOS)** and **Web (Desktop/Browsers)**.

🌐 **Live Web App (Netlify)**: [https://hbplus.netlify.app](https://hbplus.netlify.app)

---

## Key Features

- **Cross-Platform Compatibility**: A single shared codebase powering both the Android mobile application and the desktop web application.
- **Minimalist Design System**: Clean white surfaces, high-contrast typography, and a modern blue accent palette inspired by [hbplus.fit](https://hbplus.fit).
- **Responsive Layout**: Dynamically adapts from compact mobile viewports to multi-column desktop dashboards.
- **Enterprise Task Tracking**: Real-time daily task velocity tracking, priority categorizations, and interactive status workflows.
- **Zero Emojis**: 100% vector-drawn lightweight UI icons.
- **Docker & Cloud Ready**: Production-ready `Dockerfile`, `docker-compose.yml`, and `netlify.toml` included.

---

## Setup Instructions

### 1. Prerequisites
- **Node.js**: `v22.11.0` or higher
- **npm**: `v10` or higher
- **Android Studio & SDK**: (Required only for running on Android devices/emulators)
- **Docker Desktop**: (Optional, for containerized deployments)

---

### 2. Installation
Clone the repository and install the project dependencies:
```bash
git clone <repository-url>
cd hbplus
npm install --legacy-peer-deps
```

---

### 3. Environment Configuration
Copy the template file to create your local `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your Firebase and Google OAuth credentials:
```env
APP_NAME=hbplus
APP_ENV=development

# Authorized Email Domain Restriction
AUTHORIZED_EMAIL_DOMAIN=hbplus.fit

# Google OAuth Web Client ID (from Firebase console)
GOOGLE_WEB_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com

# Firebase Web Configuration
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id

# Backend API
API_BASE_URL=https://api.example.com
```

---

### 4. Running the Application

#### A. Web Browser (Desktop / Local)
Starts the Webpack development server with hot module replacement:
```bash
npm run web
```
Open **`http://localhost:3000`** in your browser.

#### B. Android Device / Emulator
1. Start the Metro bundler:
   ```bash
   npm run start
   ```
2. In a separate terminal, compile and launch the Android APK:
   ```bash
   npm run android
   ```

#### C. Docker (Production Nginx)
To build and run the web app in an isolated Nginx container:
```bash
docker compose up --build
```
Access the application at **`http://localhost:3000`**.

#### D. Production Web Build (for Netlify / Static Hosting)
```bash
npm run build:web
```
Generates the optimized static production bundle in the `dist/` directory.

- **Netlify Link**: [https://hbplusappp.netlify.app](https://hbplusappp.netlify.app)

---

## Authentication Flow

The application uses **Google Sign-In with Firebase Authentication** tailored specifically for each platform without code duplication:

```
                  ┌────────────────────────┐
                  │   User Clicks Login    │
                  └───────────┬────────────┘
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
      📱 Android Mobile                 🌐 Web Browser
   Google Play Services Dialog       Firebase Popup Window
             │                                 │
             └────────────────┬────────────────┘
                              │
                              ▼
                 Receive Google ID Token
                              │
                              ▼
           Authenticate with Firebase Backend
                              │
                              ▼
             Verify Authorized Email Domain
            (ends with @AUTHORIZED_EMAIL_DOMAIN)
                    /                   \
            [Authorized]             [Unauthorized]
                 │                          │
                 ▼                          ▼
         Route to Dashboard         1. Invalidate Session
                                    2. Auto-Sign Out
                                    3. Display Access Notice
```

1. **Mobile Platform (`googleSignIn.ts`)**:
   - Triggers the native Android Google Play Services account picker via `@react-native-google-signin/google-signin`.
   - Obtains the Google `idToken` and creates a Firebase credential with `auth.GoogleAuthProvider.credential(idToken)`.
   - Authenticates the user with Firebase native SDK (`@react-native-firebase/auth`).

2. **Web Platform (`googleSignIn.web.ts`)**:
   - Automatically aliased by Webpack when running on the web.
   - Launches a standard browser popup using Firebase Web SDK's `signInWithPopup(webAuth, provider)`.
   - Passes the `hd` parameter to hint Google OAuth toward institutional accounts.

3. **Session Persistence**:
   - Handled automatically via `subscribeToAuthChanges` (`onAuthStateChanged`). Returning users with valid sessions bypass the login screen and are directed straight to the dashboard.

---

## How Domain Restriction Works

The application implements a strict **multi-layer domain gate** ensuring that only users with authorized institutional email addresses (`@hbplus.fit`) can access the workspace:

### Layer 1: OAuth Domain Hinting (Web)
When the Google Sign-In popup opens on the web, the parameter `hd: Config.AUTHORIZED_EMAIL_DOMAIN` is passed to the Google OAuth provider. This prioritizes institutional accounts in the Google account selection list.

### Layer 2: Post-Authentication Validation
Immediately upon receiving credentials from Google, the user's email is evaluated:
```typescript
const authorizedDomain = (Config.AUTHORIZED_EMAIL_DOMAIN || 'hbplus.fit').toLowerCase().trim();
const email = user?.email?.toLowerCase().trim() || '';

if (!email.endsWith(`@${authorizedDomain}`)) {
  // Immediately invalidate the session
  await signOutGoogle();
  throw new Error(
    `Access Restricted:\nOnly institutional email accounts ending with @${authorizedDomain} are permitted.`
  );
}
```
If an unauthorized email (e.g. `@gmail.com`) is selected, the application:
1. Immediately triggers an automatic sign-out.
2. Clears local and backend auth state.
3. Throws a user-friendly error instructing the user to switch to their authorized account.

### Layer 3: App Launch & Session Guard (`StackNavigation.tsx`)
On cold start or when resuming from background, the navigation stack evaluates the persisted session:
```typescript
const unsubscribe = subscribeToAuthChanges(async (currentUser) => {
  if (currentUser) {
    const email = currentUser.email?.toLowerCase().trim() || '';
    if (!email.endsWith(`@${authorizedDomain}`)) {
      await signOutGoogle();
      setUser(null);
      return;
    }
  }
  setUser(currentUser);
});
```
Even if a token is manually forged or cached from an unauthorized account, the session guard instantly revokes the token and locks the route to the Login screen.

---

## Project Structure

```
hbplus/
├── android/                  # Native Android configuration & Gradle build
├── public/                   # Web template (index.html, favicon.png)
├── src/
│   ├── assets/images/        # Official HB+ logos and wordmark assets
│   ├── components/           # Reusable components (Icons, ErrorBoundary)
│   ├── navigation/           # Stack & Tab navigators
│   ├── screens/              # UI screens
│   │   ├── LoginScreen.tsx   # Google Sign-In & Auth entry
│   │   └── dashboard/        # Workspace Overview, Analytics, Profile, Settings
│   ├── services/
│   │   ├── firebase/         # Firebase auth & Google Sign-In (Mobile + Web)
│   │   └── config.web.shim.ts# Environment shim for Webpack builds
│   ├── theme/                # Central responsive design tokens & scaling utilities
│   └── types/                # TypeScript navigation & state types
├── App.tsx                   # Application root with ErrorBoundary & SafeAreas
├── Dockerfile                # Multi-stage Docker build (Node.js + Nginx)
├── docker-compose.yml        # Docker Compose service definition
├── netlify.toml              # Netlify continuous deployment & SPA redirects
├── webpack.config.js         # Webpack 5 bundler configuration for React Native Web
└── package.json              # Project dependencies & run scripts
```

---

## License

Private and confidential. Developed for **HB+**. All rights reserved.
