/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import VehicleDataProvider from './src/context/DataContext';
import Root from './src/root';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <VehicleDataProvider>
        <Root />
      </VehicleDataProvider>
    </SafeAreaProvider>
  );
}

export default App;
