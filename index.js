/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/router';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storages from './src/storages/store';
import React,{Component} from 'react';
import OneSignal from 'react-native-onesignal';

const {store, persistor} = storages();


class App extends Component{
  async componentDidMount() {
      OneSignal.setAppId("6133ed60-d24f-4cf8-8df5-1101b2e5cd2e");
      OneSignal.promptForPushNotificationsWithUserResponse();
      OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      notificationReceivedEvent.complete(notification);
      });
      OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
      });
  }
  render(){
      return(
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                  <Router />
              </PersistGate>
          </Provider>
      )
  }
}

// function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <Router />
//       </PersistGate>
//     </Provider>
//   );
// }

AppRegistry.registerComponent(appName, () => App);
