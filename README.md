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
