/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Enable web browser mounting
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const rootTag =
    document.getElementById('root') ||
    document.getElementById('main') ||
    document.body;
  AppRegistry.runApplication(appName, { rootTag });
}
