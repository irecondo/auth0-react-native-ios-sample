# Auth0 React Native Sample - iOS Login

This is a React Native application demonstrating Auth0 integration with iOS, featuring:

- **Web-based Auth0 login** with Universal Login
- **Ephemeral session** to avoid iOS consent popup
- **User profile screen** displaying all claims from the ID token
- **iOS device support** with proper code signing

## Prerequisites

- Node.js >= 18
- React Native development environment set up
- Xcode (for iOS development)
- CocoaPods
- An Auth0 account

## Setup

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Install iOS dependencies:**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Configure Auth0:**
   - Copy `auth0-configuration.js.example` to `auth0-configuration.js`
   - Update with your Auth0 credentials:
     ```javascript
     const config = {
       clientId: "YOUR_CLIENT_ID",
       domain: "YOUR_DOMAIN"
     };
     export default config;
     ```

4. **Update iOS configuration:**
   - Open `ios/Auth0Sample.xcodeproj/project.pbxproj`
   - Update `DEVELOPMENT_TEAM` with your Apple Developer Team ID
   - Update `PRODUCT_BUNDLE_IDENTIFIER` if needed

5. **Configure Auth0 Dashboard:**
   Add these URLs to your Auth0 Application settings:
   
   **Allowed Callback URLs:**
   ```
   com.auth0samples.auth0://YOUR_DOMAIN/ios/com.auth0samples/callback
   ```
   
   **Allowed Logout URLs:**
   ```
   com.auth0samples.auth0://YOUR_DOMAIN/ios/com.auth0samples/callback
   ```

## Running the App

**On iOS Simulator:**
```bash
npx react-native run-ios
```

**On iOS Device:**
```bash
npx react-native run-ios --udid YOUR_DEVICE_UDID
```

## Features

### Ephemeral Session
The app uses `ephemeralSession: true` to prevent the iOS consent popup ("App wants to use auth0.com to sign in"). This provides a smoother user experience.

### Profile Screen
After login, the app displays a profile screen showing all user claims from the ID token, including:
- Email
- Name
- Profile picture
- Sub (user ID)
- Email verification status
- Any custom claims

## Tech Stack

- React Native 0.79.2
- React 19.0.0
- react-native-auth0 5.0.0-beta.1
- TypeScript 5.0.4

## License

MIT
