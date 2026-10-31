import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

const rootTag = document.getElementById('root');
if (rootTag) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag,
  });
}
