# DisasterAlert - Emergency Response System

A React Native Expo mobile application for disaster management and emergency response coordination. DisasterAlert enables affected communities to report emergencies in real-time while allowing emergency responders to coordinate rescue operations efficiently.

## Features

### For Citizens
- **One-Tap Emergency Reporting**: Large SOS button for immediate help requests
- **Real-Time Location Sharing**: Automatic GPS integration for precise incident location
- **Emergency Type & Severity**: Report specific emergency types (flood, injury, trapped, food, other) with severity levels
- **Live Map View**: See nearby incidents and emergency resources in real-time
- **Alert Management**: Receive critical alerts and safety notifications
- **Nearby Help**: Find nearby shelters, hospitals, and relief centers with distance information
- **Incident Tracking**: Monitor status of reported emergencies

### For Emergency Responders
- **Responder Dashboard**: Access all reported incidents in one place
- **Priority Filtering**: Filter by severity level to focus on critical cases
- **Automatic Sorting**: Incidents sorted by severity and timestamp
- **Incident Details**: Full context including location, description, and images
- **Status Management**: Update incident status (pending → in-progress → resolved)
- **Real-Time Updates**: See new incidents as they're reported

### Universal Features
- **Dark Mode**: Optimized for low-light emergency situations
- **Offline Support**: Report emergencies and store data locally
- **Fast & Simple UI**: Stress-optimized design for crisis situations
- **Profile Management**: Store emergency contact information

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Location**: expo-location
- **Storage**: AsyncStorage for local persistence
- **State Management**: React Context API

## Project Structure

```
├── app/
│   ├── (auth)/                 # Authentication screens
│   │   ├── login.tsx          # Phone login
│   │   ├── otp.tsx            # OTP verification
│   │   └── profile-setup.tsx   # Profile configuration
│   ├── (tabs)/                # Main app screens
│   │   ├── index.tsx          # Home screen
│   │   ├── report.tsx         # Emergency reporting
│   │   ├── map.tsx            # Live map & resources
│   │   ├── alerts.tsx         # Alert management
│   │   └── profile.tsx        # User profile
│   ├── _layout.tsx            # Root layout
│
├── components/
│   ├── Button.tsx             # Reusable button component
│   ├── Card.tsx               # Card wrapper
│   ├── SeverityBadge.tsx      # Severity indicator
│   ├── LoadingOverlay.tsx     # Loading state
│   ├── ResponderAccess.tsx    # Responder dashboard modal
│   └── ResponderButton.tsx    # Responder toggle button
│
├── context/
│   ├── AuthContext.tsx        # Authentication state
│   ├── IncidentContext.tsx    # Incident management
│   └── LocationContext.tsx    # Location services
│
├── types/
│   └── index.ts               # TypeScript definitions
│
├── utils/
│   ├── location.ts            # Geolocation helpers
│   ├── date.ts                # Date formatting
│   └── validation.ts          # Input validation
│
├── app.json                   # Expo configuration
├── babel.config.js            # Babel configuration
└── tailwind.config.js         # Tailwind configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator or Android Emulator (optional)

### Installation

```bash
# Install dependencies
npm install

# or with pnpm
pnpm install

# or with yarn
yarn install
```

### Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Authentication Flow

1. **Phone Login**: Enter phone number to request verification code
2. **OTP Verification**: Enter 4-digit code (test: 1234)
3. **Profile Setup**: Create profile with name and emergency contact
4. **Home Screen**: Access full app functionality

### Test Credentials
- Phone: +1-555-0000
- OTP: 1234

## Using the Responder Dashboard

1. Look for the teal "Responder" button in the bottom right corner of the home screen
2. Access the responder dashboard to view all incidents
3. Filter by severity or view all
4. Tap an incident for full details
5. Update incident status as you respond:
   - **Pending** → Accept and start response
   - **In Progress** → Mark as resolved
   - **Resolved** → Case closed

## Color Scheme

- **Red (#ef4444)**: Critical alerts and emergency actions
- **Orange (#f97316)**: High priority and warnings
- **Teal (#14b8a6)**: Accent color and positive actions
- **Green (#22c55e)**: Success and safe status
- **Slate (#0f172a - #94a3b8)**: Background and text colors

## Data Storage

All data is stored locally using AsyncStorage:
- User profile information
- Reported incidents
- Alerts and notifications
- Chat messages

## Offline Capabilities

- Report emergencies offline (syncs when connection restored)
- View previously reported incidents
- Access cached alert information
- Store emergency contacts

## API Integration (Future)

The app is currently using mock data. To integrate with a real backend:

1. Update `context/AuthContext.tsx` to call your auth API
2. Update `context/IncidentContext.tsx` to fetch/submit incidents
3. Update `context/LocationContext.tsx` to fetch real shelter data
4. Implement WebSocket for real-time updates

## Security Considerations

- Sensitive data (user profiles, locations) stored securely
- OTP-based authentication (enhance with real SMS service)
- Location permissions requested at runtime
- Input validation for all user data

## Performance Optimizations

- Efficient list rendering with FlatList
- Image caching for offline access
- Debounced location updates
- Optimized bundle size with tree-shaking
- NativeWind for performance-efficient styling

## Contributing

To extend this application:

1. Add new screens in `app/(tabs)/` for citizen features
2. Extend `ResponderAccess` for additional responder capabilities
3. Add new context providers for additional state management
4. Create reusable components in `components/`

## Troubleshooting

### Location Not Working
- Check iOS/Android permissions in phone settings
- Ensure location services are enabled
- On simulator, set a custom location

### AsyncStorage Issues
- Clear app cache: `npm run start -- --clear`
- Reinstall app on device
- Check device storage space

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start -c`
- Ensure compatible Node version

## License

MIT License - Feel free to use this project for disaster response applications.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Expo documentation: https://docs.expo.dev/
4. Community support: Expo forums and GitHub issues

---

**Stay Safe. Save Lives. Coordinate Better.**
