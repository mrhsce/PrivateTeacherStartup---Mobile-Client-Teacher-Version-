# Amra Teacher Mobile - React Native App

## 📱 Project Overview

**Amra Teacher Mobile** is a React Native mobile application designed for private teachers to manage their students, lessons, and teaching schedules. This project is part of the Amra platform – an innovative startup concept that connects private teachers with students in a way similar to how Uber connects taxi drivers with passengers.

The app provides teachers with a comprehensive toolset to:
- Accept or reject lesson requests from students
- Manage their weekly schedule and availability
- View and track their students and classes
- Monitor their earnings and income
- Update their profile information

> **Note**: This is the **Teacher Version** of the mobile client. A separate student version exists for end-users.

## 🎯 Business Concept

Amra aims to revolutionize private education by creating a seamless platform that connects qualified private teachers with students seeking personalized education. The platform works similarly to ride-sharing services:

- **Teachers** register, create profiles, and set their availability
- **Students** browse available teachers and send lesson requests
- **Matching System** facilitates connections based on location, subject, and schedule
- **Direct Communication** enables teachers and students to coordinate and conduct lessons
- **Transaction Management** handles payments and earnings tracking

This teacher mobile app empowers educators to manage their practice efficiently and grow their income through the Amra platform.

## ✨ Features

### Authentication & Profile Management
- User registration and login with phone number and OTP verification
- Comprehensive teacher profile setup with qualifications
- Profile editing and updates
- Account management through drawer navigation

### Lesson Management
- **View all available lesson requests** from students
- **Accept or reject** lesson requests
- **Set personal lesson preferences** and availability
- Real-time synchronization with backend

### Schedule Management
- **Weekly schedule management** - Set your available teaching hours
- **Timetable view** - Visual representation of your schedule
- **Real-time updates** - Changes sync immediately

### Earnings & Income Growth
- **Status tracking** - Monitor current availability status
- **Districts coverage** - View and manage areas you serve
- **Income suggestions** - Tips for increasing earnings
- **Availability toggle** - Quickly switch between online/offline status

### Notifications & History
- **Real-time notifications** - Get updates on lesson requests
- **History tracking** - View past activities and interactions
- **Toast alerts** - Immediate feedback on actions

### Localization
- **Right-to-Left (RTL) support** - Full support for Persian/Farsi language
- **Persian calendar support** - Jalaali calendar integration for Iranian date system
- **Localized fonts** - IRAN Yekan fonts for authentic Persian typography

## 🛠 Technology Stack

### Frontend
- **React Native** 0.60.5 - Cross-platform mobile framework
- **React** 16.9.0 - UI library
- **React Navigation** 4.0.4 - Navigation management
  - React Navigation Drawer - Slide-in menu navigation
  - React Navigation Stack - Stack-based screen navigation

### State Management & Storage
- **MobX** 5.13.0 - State management library
- **MobX React** 6.1.3 - React integration for MobX
- **MobX Persist** 0.4.1 - Local storage persistence
- **Async Storage** - Native storage for app data

### UI Components & Libraries
- **React Native Material Kit** - Material Design components
- **React Native Material Dialog** - Dialog components
- **React Native Tab View** - Tab navigation component
- **React Native Linear Gradient** - Gradient backgrounds
- **React Native Check Box** - Checkbox components
- **React Native Simple Radio Button** - Radio button components

### Persian/RTL Support
- **Moment Jalaali** 0.8.3 - Persian/Jalaali calendar support
- **React Native Persian Calendar Picker** - Date picker with Persian calendar
- **RTL Support** - Built-in Right-to-Left layout support

### Media & Image Handling
- **React Native Fast Image** - Optimized image loading
- **React Native Image Crop Picker** - Image selection and cropping
- **React Native Image Progress** - Image loading progress indicator
- **React Native Photo Upload** - Photo upload functionality

### User Interface Features
- **React Native Gesture Handler** - Better gesture handling
- **React Native Reanimated** - Advanced animation support
- **React Native Progress** - Progress indicators
- **React Native Keyboard Aware Scroll View** - Keyboard management
- **React Native Permissions** - Native permissions handling

### Utilities
- **Lodash** 4.17.15 - Utility functions
- **Accounting.js** - Number and currency formatting
- **React Side Effect** - Side effects management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v10 or later) and npm or yarn
- **React Native CLI** or Expo CLI
- **Android SDK** and Android Studio (for Android development)
- **Xcode** (for iOS development) - macOS only
- **Java Development Kit (JDK)** (for Android)
- **Git** (for version control)

### System Requirements

**macOS:**
```bash
brew install node
npm install -g react-native-cli
```

**Linux/Ubuntu:**
```bash
sudo apt update
sudo apt install nodejs npm
npm install -g react-native-cli
```

**Windows:**
- Download and install Node.js from [nodejs.org](https://nodejs.org)
- Install React Native CLI: `npm install -g react-native-cli`

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/amra-teacher-mobile.git
cd amra-teacher-mobile
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn (recommended):
```bash
yarn install
```

### 3. Configure Server Address

Edit `server_config.js` and update the server address to match your backend:

```javascript
export const SERVER_ADDRESS = 'http://your-server-address:port';
```

**Development:**
```javascript
export const SERVER_ADDRESS = 'http://localhost:3000';
```

**Production:**
```javascript
export const SERVER_ADDRESS = 'http://api.amra.com';
```

### 4. Install Native Dependencies (Android)

```bash
cd android
./gradlew build
cd ..
```

### 5. Install Native Dependencies (iOS)

```bash
cd ios
pod install
cd ..
```

### 6. Link Native Modules

```bash
react-native link
```

## 📱 Running the App

### Android

**Development Mode:**
```bash
react-native run-android
```

**With Metro bundler running separately:**
```bash
# Terminal 1 - Start Metro bundler
react-native start

# Terminal 2 - Run on device/emulator
react-native run-android
```

**Development APK Build:**
```bash
cd android
./gradlew assembleDebug
cd ..
```

### iOS

**Development Mode:**
```bash
react-native run-ios
```

**With Metro bundler running separately:**
```bash
# Terminal 1 - Start Metro bundler
react-native start

# Terminal 2 - Run on simulator
react-native run-ios
```

**Production Build:**
```bash
cd ios
xcodebuild -workspace amraTeacherMobile.xcworkspace -scheme amraTeacherMobile -configuration Release
cd ..
```

### Development Server

Start the Metro bundler:

```bash
npm start
# or
yarn start
```

This will start the development server and allow you to reload the app using:
- **Android**: Press `R` twice or `M` to open developer menu
- **iOS**: Press `Cmd+R` to reload or `Cmd+D` to open developer menu

## 📁 Project Structure

```
amra-teacher-mobile/
├── src/                          # Main source code
│   ├── components/               # Reusable React components
│   │   ├── AlertMessage.js      # Alert dialog component
│   │   ├── Toolbar.js           # App toolbar/header
│   │   ├── DrawerPanel.js       # Side drawer menu
│   │   ├── LoadingPopUp.js      # Loading indicator
│   │   ├── Card.js              # Card component
│   │   ├── LessonCard.js        # Lesson request card
│   │   ├── ToastCard.js         # Toast notification
│   │   ├── SnakePopup.js        # Bottom sheet component
│   │   ├── SwitchText.js        # Toggle switch
│   │   └── ...other components
│   │
│   ├── screens/                  # App screens/pages
│   │   ├── Splash.js            # App splash/loading screen
│   │   ├── Login.js             # Login screen
│   │   ├── SignUp.js            # Registration screen
│   │   ├── SignIn.js            # Sign in alternative screen
│   │   ├── Main.js              # Main dashboard/home screen
│   │   ├── Welcome.js           # Welcome screen
│   │   ├── Profile.js           # User profile screen
│   │   ├── LessonsManagement.js # Lesson requests management
│   │   ├── TimeTableManagement.js # Weekly schedule management
│   │   ├── DistrictsManagement.js # Coverage areas management
│   │   ├── TeacherBrief.js      # Teacher's class list
│   │   └── index.js             # Screen exports
│   │
│   ├── stores/                   # MobX state management
│   │   ├── index.js             # Store initialization
│   │   ├── PersistStore.js      # Persistence configuration
│   │   ├── User.js              # User store
│   │   ├── Teacher.js           # Teacher data store
│   │   └── Student.js           # Student data store
│   │
│   ├── network/                  # API integration
│   │   └── Queries.js           # API query functions
│   │
│   ├── constants/                # App constants
│   │   ├── colors.js            # Color palette
│   │   └── values.js            # Configuration values
│   │
│   └── utils.js                  # Utility functions
│
├── assets/                        # Static assets
│   ├── images/                   # App images and icons
│   ├── fonts/                    # Persian fonts
│   └── districts.js             # District data
│
├── android/                       # Android native code
│   ├── app/                      # Android app module
│   ├── gradle/                   # Gradle configuration
│   └── build.gradle             # Build configuration
│
├── ios/                           # iOS native code
│   ├── amraTeacherMobile/       # iOS app target
│   └── amraTeacherMobile.xcodeproj/ # Xcode project
│
├── __tests__/                     # Jest unit tests
│   └── App-test.js
│
├── App.js                         # Root app component
├── index.js                       # App entry point
├── app.json                       # App configuration
├── package.json                   # Dependencies
├── babel.config.js               # Babel configuration
├── metro.config.js               # Metro bundler configuration
├── react-native.config.js        # React Native link configuration
└── README.md                      # This file
```

## 🔌 API Integration

The app communicates with a backend API server. Key API endpoints (referenced in `src/network/Queries.js`):

### Lesson Management
- `GET /api/lessons/getalllessons` - Fetch all available lesson requests
- `GET /api/teachers/getteacherlessons` - Get teacher's lessons
- `POST /api/teachers/setteacherlessons` - Update teacher's lessons

### Availability
- `POST /api/teachers/setavailability?towhat={state}` - Set online/offline status
- `GET /api/teachers/getteacherhours` - Fetch teacher's hours

### Teacher Management
- `GET /api/teachers/getteacherinfo` - Get teacher profile
- `POST /api/teachers/updateteacherinfo` - Update profile
- `GET /api/teachers/gettimetable` - Get weekly schedule
- `POST /api/teachers/settimetable` - Update weekly schedule

### Authentication
- Sign up and login endpoints for teacher registration

## 🎨 Customization

### Colors
Edit `src/constants/colors.js` to customize the app's color scheme:

```javascript
export const primary = '#3498db';      // Primary brand color
export const primaryDark = '#2980b9';  // Darker primary
export const white = '#ffffff';        // White
export const background = '#f5f5f5';   // Background
// ... more colors
```

### Fonts
Custom Persian fonts are located in `assets/fonts/`. To use different fonts:

1. Add font files to `assets/fonts/`
2. Run: `react-native link`
3. Update font-family references in components

### Server Configuration
Change the backend server URL in `server_config.js`:

```javascript
export const SERVER_ADDRESS = 'http://your-server-address';
```

## 🧪 Testing

Run tests using Jest:

```bash
npm test
# or
yarn test
```

Run tests with coverage:

```bash
npm test -- --coverage
# or
yarn test --coverage
```

Lint code:

```bash
npm run lint
# or
yarn lint
```

## 🐛 Debugging

### Enable Yellow Box Warnings
Edit `App.js`:
```javascript
console.disableYellowBox = false; // Set to false to see warnings
```

### React Native Debugger
1. Download [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
2. Install and open the app
3. Run your React Native app with: `react-native start`
4. Open debugger to inspect state and logs

### React DevTools
For MobX state inspection:
```bash
npm install --save-dev mobx-react-devtools
```

## 📦 Building for Production

### Android Release Build

```bash
# Generate a signing key (first time only)
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias

# Build release APK
cd android
./gradlew assembleRelease
cd ..

# The APK will be at: android/app/build/outputs/apk/release/app-release.apk
```

### iOS Release Build

```bash
cd ios
xcodebuild -workspace amraTeacherMobile.xcworkspace \
  -scheme amraTeacherMobile \
  -configuration Release \
  -derivedDataPath build
cd ..
```

## 🔐 Security & Permissions

The app requests the following permissions:

- **Camera** - Photo/lesson verification
- **Photo Library** - Profile picture upload
- **Contacts** - Student contact integration
- **Location** - Geographic matching with students
- **Phone** - Direct calling with students

These permissions are handled via `react-native-permissions` and prompted at runtime.

## 📚 API Documentation

For detailed API documentation, see the backend repository or contact the development team.

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/amra-teacher-mobile.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Link any related issues
   - Wait for review and feedback

### Code Style Guidelines

- Use functional components where possible
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Maintain consistent indentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors & Contributors

- **Original Development**: Amra Team
- **Maintainers**: Open to community contributions

## 🆘 Support & Contact

- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/amra-teacher-mobile/issues)
- **Discussions**: Join our community discussions
- **Email**: support@amra.io

## 🙏 Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Powered by [MobX](https://mobx.js.org/) for state management
- Beautiful UI with [React Native Material Kit](https://github.com/xinthink/react-native-material-kit)
- Special thanks to all contributors

## 📈 Roadmap

Future features and improvements planned:

- [ ] Video call integration for live lessons
- [ ] Advanced analytics and earnings reports
- [ ] In-app messaging system
- [ ] Lesson feedback and rating system
- [ ] Integration with payment gateways
- [ ] Student session recordings
- [ ] Offline mode support
- [ ] Dark mode theme
- [ ] Multi-language support (beyond Persian)

## ⚠️ Important Notes

1. **Backend Setup Required**: This app requires a running backend server. Ensure your API server is running and configured correctly.

2. **API Authentication**: Update API endpoints and authentication logic based on your backend implementation.

3. **Phone Number Format**: The app is configured for Iranian phone numbers. Adjust validation in authentication screens if needed.

4. **RTL Layout**: The app is optimized for right-to-left (RTL) languages. Modifications might be needed for left-to-right languages.

---

