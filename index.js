/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, LogBox, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreAllLogs();

// there is a bug in rn-screens where on android a StackNavigator within a TabNavigator causes crash on app startup
enableScreens(Platform.OS === 'android');

AppRegistry.registerComponent(appName, () => App);
