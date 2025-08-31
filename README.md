# Bluetooth React Native App

A basic React Native application with Bluetooth connection capabilities.

## Features

- **Bluetooth Device Scanning**: Scan for nearby Bluetooth Low Energy (BLE) devices
- **Device Connection**: Connect to discovered Bluetooth devices  
- **Real-time Status**: Display connection status and device information
- **Permission Management**: Handles Bluetooth and location permissions automatically
- **Cross-platform**: Works on both Android and iOS

## Prerequisites

- Node.js (>=20)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/menneric84/hr.git
cd hr
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Usage

1. **Start Scanning**: Tap the "Start Scan" button to discover nearby Bluetooth devices
2. **View Devices**: Discovered devices will appear in the list with their name, ID, and signal strength (RSSI)
3. **Connect**: Tap on any device in the list to attempt a connection
4. **Disconnect**: Use the "Disconnect" button to disconnect from the current device

## Permissions

The app requires the following permissions:

### Android
- `BLUETOOTH` - Basic Bluetooth operations
- `BLUETOOTH_ADMIN` - Bluetooth administrative operations
- `ACCESS_FINE_LOCATION` - Required for Bluetooth scanning
- `ACCESS_COARSE_LOCATION` - Location access for device discovery
- `BLUETOOTH_SCAN` - For Android 12+ devices
- `BLUETOOTH_CONNECT` - For Android 12+ devices
- `BLUETOOTH_ADVERTISE` - For Android 12+ devices

### iOS
- Bluetooth usage description in Info.plist

## Libraries Used

- [react-native-ble-manager](https://github.com/innoveit/react-native-ble-manager) - Bluetooth Low Energy management
- [react-native-permissions](https://github.com/zoontek/react-native-permissions) - Permission handling

## Development

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

### Start Metro Bundler
```bash
npm start
```

## Troubleshooting

1. **Location Permission**: Make sure location services are enabled as they're required for Bluetooth scanning on Android
2. **Bluetooth**: Ensure Bluetooth is enabled on your device
3. **Build Issues**: Try cleaning the build cache:
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request