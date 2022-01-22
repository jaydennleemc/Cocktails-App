/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// fixed Unsupported top level event type "onGestureHandlerStateChange dispatched " error 
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
