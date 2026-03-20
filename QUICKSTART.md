# DisasterAlert - Quick Start Guide

Get up and running with DisasterAlert in 5 minutes.

## Installation (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

## Running the App (1 minute)

Choose your platform:

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## First Login (1 minute)

Use these test credentials:

| Field | Value |
|-------|-------|
| Phone | +1-555-0000 |
| OTP | 1234 |
| Name | Test User |
| Emergency Contact | (optional) |

## Quick Feature Tour

### 1. Report an Emergency (Citizen)
1. Home screen → Tap **SOS** button
2. Select emergency type: Flood, Injury, Trapped, Food, Other
3. Pick severity: Low, Medium, Critical
4. Add description
5. Tap "Report Emergency"
6. See your incident appear on the map!

### 2. Respond to Incidents (Responder)
1. Home screen → Bottom right **"Responder"** button
2. View dashboard with all incidents
3. Use filters: All, Critical, Medium, Low
4. Tap an incident for details
5. Update status: Accept → In Progress → Resolved

### 3. Check Alerts
1. Bottom tabs → **Alerts**
2. See live emergency notifications
3. Tap to mark as read

### 4. Find Shelters
1. Bottom tabs → **Map**
2. Toggle to **Shelters** view
3. See nearby hospitals and relief centers

### 5. Manage Profile
1. Bottom tabs → **Profile**
2. View your emergency contact
3. Logout or adjust settings

## Key Features at a Glance

| Feature | Access | Purpose |
|---------|--------|---------|
| Emergency Report | Home → SOS | Report incidents |
| Live Map | Tabs → Map | View incidents/shelters |
| Alerts | Tabs → Alerts | Receive notifications |
| Responder Dashboard | Home → "Responder" | Manage incidents |
| Nearby Help | Map → Shelters | Find resources |
| Profile | Tabs → Profile | Manage account |

## File Your First Emergency

1. **Tap SOS** on home screen
2. **Select Type**: e.g., "flood"
3. **Choose Severity**: e.g., "critical"
4. **Describe**: "Water level rising at corner of 5th and Main"
5. **Submit** (location auto-captured)
6. **Notification**: "Emergency reported! Help is on the way."

## Respond to an Emergency

1. **Tap "Responder"** button (bottom right)
2. **See Dashboard** with sorted incidents
3. **Tap Incident** you want to handle
4. **Tap "Accept & Start Response"**
5. **Tap "Mark as Resolved"** when done

## Data Management

### Where Does Data Go?
- Stored locally in device storage (AsyncStorage)
- Works completely offline
- Data persists between app sessions

### How to Clear Data?
```bash
# In development
npm start -- --clear
```

## Troubleshooting

### App Won't Start?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -c
```

### Location Not Working?
- Open phone Settings
- Find DisasterAlert app
- Ensure Location permission is "Always" or "While Using App"
- Simulator: Set custom location in simulator settings

### Can't See Incidents?
- Make sure you're on Home screen
- Check if there are reported incidents (Report Emergency)
- Try refreshing the Alerts tab

## Architecture Overview

```
User
  ↓
Screens (UI)
  ↓
Contexts (State)
  ↓
AsyncStorage (Data)
```

Simple 3-layer architecture:
1. **Screens** = What user sees
2. **Contexts** = App state & logic
3. **Storage** = Persistent data

## Key Screens

```
Login → OTP → Profile → Home (with tabs)
                         ├─ Home
                         ├─ Report
                         ├─ Map
                         ├─ Alerts
                         └─ Profile
```

## Customization Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#ef4444",      // Red
  secondary: "#f97316",    // Orange
  accent: "#14b8a6",       // Teal
}
```

### Add Mock Incidents
Edit `utils/mockData.ts`:
```typescript
export const MOCK_INCIDENTS = [
  // Add new incident objects here
]
```

### Extend Features
1. Add new screens in `app/(tabs)/`
2. Extend context in `context/`
3. Create components in `components/`
4. Add utilities in `utils/`

## Next Steps

### For Testing
- [ ] Complete auth flow
- [ ] Report 3 different emergency types
- [ ] Test responder dashboard
- [ ] Check all alert conditions

### For Development
- [ ] Read `ARCHITECTURE.md` for system design
- [ ] Review `ACCESSIBILITY.md` for a11y standards
- [ ] Check `README.md` for full documentation

### For Production
- [ ] Implement real backend API
- [ ] Add push notifications
- [ ] Setup analytics
- [ ] Add error tracking
- [ ] Configure CI/CD

## Common Commands

```bash
# Start development
npm start

# Run on specific platform
npm run ios
npm run android
npm run web

# Clear everything and restart
npm start -- --clear

# Install new dependencies
npm install <package-name>
```

## Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **TypeScript**: https://www.typescriptlang.org/

## Support

For issues:
1. Check `TROUBLESHOOTING` section in README.md
2. Review error messages carefully
3. Check device logs for clues
4. Ensure all prerequisites are installed

---

**You're ready! Start the app and save lives.**
