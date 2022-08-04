/**
 * @format
 */

import './src/modules/logger/logger.utils'; // import our logger utils to attach to console ASAP
import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
