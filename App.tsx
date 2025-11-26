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
import MainPage from './src/pages/main';
import VehicleDataProvider from './src/context/DataContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <VehicleDataProvider>
        <MainPage />
      </VehicleDataProvider>
    </SafeAreaProvider>
  );
}

export default App;
