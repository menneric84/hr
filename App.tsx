/**
 * React Native App with Bluetooth Connection
 * https://github.com/menneric84/hr
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function App(): React.JSX.Element {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Peripheral[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);

  useEffect(() => {
    // Initialize BLE Manager
    BleManager.start({showAlert: false});

    // Request permissions
    requestPermissions();

    return () => {
      BleManager.stopScan();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          Alert.alert('Permission Required', 'Location permission is required for Bluetooth scanning');
        }
      } catch (error) {
        console.log('Permission request error:', error);
      }
    }
  };

  const startScan = () => {
    if (!isScanning) {
      setDevices([]);
      setIsScanning(true);
      
      BleManager.scan([], 10, true)
        .then(() => {
          console.log('Scanning...');
        })
        .catch(error => {
          console.error('Scan error:', error);
          setIsScanning(false);
        });

      // Listen for discovered devices
      const handleDiscoverPeripheral = (peripheral: Peripheral) => {
        console.log('Discovered peripheral:', peripheral);
        setDevices(prevDevices => {
          const existingDevice = prevDevices.find(device => device.id === peripheral.id);
          if (!existingDevice) {
            return [...prevDevices, peripheral];
          }
          return prevDevices;
        });
      };

      // Listen for scan stop
      const handleStopScan = () => {
        console.log('Scan stopped');
        setIsScanning(false);
      };

      const discoverListener = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      const stopScanListener = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

      // Stop scanning after 10 seconds
      setTimeout(() => {
        BleManager.stopScan();
        setIsScanning(false);
        // Clean up listeners
        discoverListener.remove();
        stopScanListener.remove();
      }, 10000);
    }
  };

  const connectToDevice = async (deviceId: string) => {
    try {
      await BleManager.connect(deviceId);
      setConnectedDevice(deviceId);
      Alert.alert('Success', 'Connected to device');
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Error', 'Failed to connect to device');
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        await BleManager.disconnect(connectedDevice);
        setConnectedDevice(null);
        Alert.alert('Success', 'Disconnected from device');
      } catch (error) {
        console.error('Disconnection error:', error);
        Alert.alert('Error', 'Failed to disconnect from device');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <Text style={styles.title}>Bluetooth Connection App</Text>
        <Text style={styles.subtitle}>Scan and connect to Bluetooth devices</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isScanning && styles.buttonDisabled]}
          onPress={startScan}
          disabled={isScanning}>
          <Text style={styles.buttonText}>
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Text>
        </TouchableOpacity>

        {connectedDevice && (
          <TouchableOpacity
            style={[styles.button, styles.disconnectButton]}
            onPress={disconnectDevice}>
            <Text style={[styles.buttonText, styles.disconnectButtonText]}>
              Disconnect
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status: {connectedDevice ? `Connected to ${connectedDevice}` : 'Not connected'}
        </Text>
        <Text style={styles.deviceCount}>
          Devices found: {devices.length}
        </Text>
      </View>

      <ScrollView style={styles.devicesList}>
        <Text style={styles.listTitle}>Available Devices:</Text>
        {devices.length === 0 ? (
          <Text style={styles.noDevicesText}>
            No devices found. Start scanning to discover Bluetooth devices.
          </Text>
        ) : (
          devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={[
                styles.deviceItem,
                connectedDevice === device.id && styles.connectedDevice,
              ]}
              onPress={() => connectToDevice(device.id)}>
              <Text style={styles.deviceName}>
                {device.name || 'Unknown Device'}
              </Text>
              <Text style={styles.deviceId}>ID: {device.id}</Text>
              <Text style={styles.deviceRssi}>RSSI: {device.rssi}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e3f2fd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  disconnectButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disconnectButtonText: {
    color: 'white',
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 5,
  },
  deviceCount: {
    fontSize: 14,
    color: '#6c757d',
  },
  devicesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 10,
  },
  noDevicesText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  },
  deviceItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  connectedDevice: {
    borderColor: '#28a745',
    borderWidth: 2,
    backgroundColor: '#f8fff8',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 5,
  },
  deviceId: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  deviceRssi: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default App;
