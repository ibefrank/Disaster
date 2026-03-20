# DisasterAlert

DisasterAlert is a React Native Expo app for coordinating emergency reporting and response. It focuses on a fast, low-friction flow for citizens to report incidents and for responders to review, filter, and update those incidents.

**Key Features**
- Citizen flow for reporting emergencies with type, severity, and description
- Location capture via expo-location with a fallback test location
- Alerts feed with unread state and pull-to-refresh
- Responder dashboard with filters and status updates
- Profile setup with emergency contact details
- Local persistence for user profile, incidents, alerts, and messages

**Responder Capabilities**
- View all incidents in a single dashboard
- Filter by severity and auto-sort by severity and time
- Update status from pending to in-progress to resolved

**Platform Notes**
- Data is stored locally in AsyncStorage and initialized with mock alerts and shelters
- Map screen shows incident and shelter lists (no map widget yet)
- OTP is mocked for development

**Tech Stack**
- React Native + Expo
- Expo Router (file-based navigation)
- TypeScript
- NativeWind (Tailwind for React Native)
- AsyncStorage for local persistence
- Context API for state management

**Project Structure**
```
app/
  (auth)/            Auth screens (login, otp, profile-setup)
  (tabs)/            Main app screens (home, report, map, alerts, profile)
  _layout.tsx        Root providers and navigation
components/          Reusable UI for the app
context/             Auth, incident, and location state
types/               Core TypeScript models
utils/               Small shared helpers
```

**Getting Started**
1. Install dependencies
```
npm install
```
2. Start the Expo dev server
```
npm start
```
3. Run on a platform
```
npm run android
npm run ios
npm run web
```

**Auth Test Flow**
1. Enter a phone number
2. Use the test OTP `1234`
3. Finish profile setup and land on the home screen

**Scripts**
- `npm start` starts the Expo dev server
- `npm run android` runs on Android
- `npm run ios` runs on iOS
- `npm run web` runs on web

**Environment Variables**
See `.env.example` for optional Expo public variables:
- `EXPO_PUBLIC_API_URL`
- `EXPO_PUBLIC_API_KEY`
- `EXPO_PUBLIC_MAPBOX_TOKEN`
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_ENABLE_OFFLINE_MODE`
- `EXPO_PUBLIC_ENABLE_CHAT`
- `EXPO_PUBLIC_ENABLE_IMAGE_UPLOAD`

**Data and Persistence**
- Incidents, alerts, and messages are stored in AsyncStorage
- Alerts and shelters are seeded with mock data on first load
- No backend integration yet

**Notes and Limitations**
- The "Map" tab currently lists incidents and shelters rather than rendering a map view
- OTP validation is mocked (`1234`)
- Chat APIs exist in state but there is no UI yet

**License**
MIT
