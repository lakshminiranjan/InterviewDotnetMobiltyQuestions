# RupeeTrack (Expo + React Native)

Production-ready starter for a personal finance app focused on EMI and subscription tracking for Indian users.

## Stack
- Expo + React Native + TypeScript
- Clerk authentication
- Firebase Firestore
- React Navigation (tabs + stack)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example`.
3. Run app:
   ```bash
   npm run start
   ```


> Note: PNG binary assets are intentionally not committed in this repository to satisfy no-binary PR restrictions.
> Add your own app icons/splash files locally if needed.

## Folder structure
```
src/
  components/
  constants/
  hooks/
  navigation/
  screens/
    public/
    tabs/
    stack/
  services/
  types/
  utils/
```

## Firestore collections
- users
- emis
- subscriptions

## Troubleshooting blank screen
- Ensure dependencies are installed: `npm install`.
- Ensure `.env` exists with `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` (copy from `.env.example`).
- Restart the Expo dev server after updating env vars.
- If you use path aliases (`@/...`), make sure `babel-plugin-module-resolver` is installed.
