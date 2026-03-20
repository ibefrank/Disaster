# DisasterAlert Architecture

## System Overview

DisasterAlert follows a modern React Native architecture with separation of concerns, making the codebase maintainable, testable, and scalable.

## Core Layers

### 1. Presentation Layer (app/ & components/)

**Screens (app/)**
- Authentication flow: login → otp → profile-setup
- Main app: home, report, map, alerts, profile tabs
- Responder dashboard modal overlay

**Components (components/)**
- Button: Reusable with variants (primary, secondary, danger, success)
- Card: Container with consistent styling
- SeverityBadge: Visual severity indicator
- LoadingOverlay: Loading state UI
- ResponderAccess: Responder dashboard modal
- ResponderButton: Dashboard toggle button

### 2. State Management Layer (context/)

**AuthContext**
- User authentication state
- Login, OTP verification, profile setup
- Session persistence with AsyncStorage

**IncidentContext**
- Emergency incident management
- CRUD operations for reports
- Alert management
- Chat message handling

**LocationContext**
- GPS location management
- Shelter/resource location data
- Distance calculations
- Geolocation permissions

### 3. Data Layer (types/, utils/)

**Types (types/index.ts)**
- TypeScript interfaces for all entities
- EmergencyReport, User, Location, Shelter, Alert
- Type-safe prop passing throughout

**Utils (utils/)**
- Validation: Input sanitization and checks
- Location: Distance calculations, geocoding
- Date: Time formatting, relative time
- MockData: Sample data for development

### 4. Navigation Layer

**Expo Router (File-based)**
- (auth) group: Authentication stack
- (tabs) group: Main app with bottom tabs
- Automatic deep linking
- Type-safe routes

## Data Flow

```
User Interaction (UI)
    ↓
Screen Component
    ↓
Context Dispatch
    ↓
State Update + AsyncStorage
    ↓
Context Subscribers Rerender
    ↓
Updated UI
```

## Key Design Patterns

### Context API for State
- Simpler than Redux for this app size
- Built-in React feature
- Easy to test and debug
- Sufficient for current complexity

### Container/Presentational Components
- Smart containers manage state (screens)
- Dumb components display UI (Card, Button)
- Improves reusability and testability

### Custom Hooks
- useAuth(): Access authentication
- useIncidents(): Access incident data
- useLocation(): Access location services
- useAsync(): Generic async handler
- useDebounce(): Debounce values

### Service Layer
- Context = service layer
- Centralizes business logic
- Easier to replace with API calls

## AsyncStorage Persistence

```typescript
// User Profile
localStorage['user'] → User object

// Incidents
localStorage['incidents'] → EmergencyReport[]

// Alerts
localStorage['alerts'] → Alert[]

// Messages
localStorage['messages'] → ChatMessage[]
```

## API Integration Strategy

### Current: Mock Data
- Rapid development
- Works offline
- Good for prototyping

### Future: Real Backend
```typescript
// In AuthContext
const login = async (phone: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone })
  });
  // Handle response
};

// In IncidentContext
const reportIncident = async (data) => {
  const response = await fetch('/api/incidents', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  // Handle response
};
```

## Performance Considerations

### Rendering
- FlatList for efficient list rendering
- useCallback for stable function references
- useMemo for expensive computations

### Storage
- AsyncStorage for persistent data
- Cache shelters in LocationContext
- Batch updates where possible

### Network (Future)
- Implement request debouncing
- Offline queue for sync
- Background sync with WorkManager

## Security Considerations

### Current Implementation
- Local-only data storage
- No sensitive data in AsyncStorage
- Input validation on all forms

### Production Recommendations
1. **Authentication**
   - Implement real OTP/SMS service
   - JWT token management
   - Secure token storage

2. **Data Transmission**
   - HTTPS only
   - Certificate pinning
   - End-to-end encryption for sensitive data

3. **Local Storage**
   - Encrypt sensitive data
   - Use secure enclave (iOS Keychain, Android Keystore)
   - Regular data cleanup

4. **Permissions**
   - Request minimal permissions
   - Runtime permission checking
   - Clear permission explanations

## Testing Strategy

### Unit Tests (Future)
```typescript
// utils/validation.test.ts
test('isValidPhone validates phone numbers', () => {
  expect(isValidPhone('555-0000')).toBe(false);
  expect(isValidPhone('1-555-000-0000')).toBe(true);
});
```

### Integration Tests (Future)
```typescript
// context/AuthContext.test.tsx
test('complete auth flow', async () => {
  // Login → OTP → Profile
});
```

### E2E Tests (Future)
```typescript
// Use Detox for automated testing
// Test complete user journeys
```

## Scalability

### Horizontal Scaling
- Stateless components
- Context providers are replaceable
- Easy to add new screens and features

### Vertical Scaling
- Add features by extending contexts
- New data types easily integrated
- Modular component structure

### Future Improvements
1. Redux or Zustand for complex state
2. GraphQL for efficient queries
3. WebSocket for real-time updates
4. Push notifications service
5. Image storage and caching
6. Analytics and logging

## Deployment

### Development
```bash
npm start
```

### Build
```bash
expo build:ios
expo build:android
```

### Distribution
- Apple App Store (TestFlight for beta)
- Google Play Store (Play Console for beta)
- Direct APK distribution for Android

## Monitoring & Debugging

### Development
- React DevTools
- Flipper for network inspection
- Console logging with prefixes

### Production
- Error tracking (Sentry, Bugsnag)
- Analytics (Firebase, Mixpanel)
- Crash reporting
- Performance monitoring

---

This architecture balances simplicity with scalability, making it ideal for a disaster response application that needs rapid iteration and high reliability.
