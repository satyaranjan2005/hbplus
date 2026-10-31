import React from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import ErrorBoundary from './src/components/ErrorBoundary';

const webMetrics = {
  frame: {
    x: 0,
    y: 0,
    width: Dimensions.get('window').width || 800,
    height: Dimensions.get('window').height || 600,
  },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function App() {
  const metrics =
    Platform.OS === 'web'
      ? webMetrics
      : initialWindowMetrics ?? undefined;

  return (
    <ErrorBoundary>
      <SafeAreaProvider initialMetrics={metrics}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
