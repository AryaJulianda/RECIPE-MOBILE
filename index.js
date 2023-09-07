/**
 * @format
 */
import React,{Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storages from './src/storage/store';
import {Root as PopupRootProvider} from 'react-native-popup-confirm-toast';
import OneSignal from 'react-native-onesignal';
const {store, persistor} = storages();

class Route extends Component{
  async componentDidMount() {
      OneSignal.setAppId("fa8785e5-bbb3-408e-82ea-5dcbab027bfa");
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

      // // OneSignal Initialization
      // OneSignal.initialize("fa8785e5-bbb3-408e-82ea-5dcbab027bfa");

      // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

      // // requestPermission will show the native iOS or Android notification permission prompt.
      // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
      // OneSignal.Notifications.requestPermission(true);

      // // Method for listening for notification clicks
      // OneSignal.Notifications.addEventListener('click', (event) => {
      //   console.log('OneSignal: notification clicked:', event);
      // });
  }
  render(){
      return(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PopupRootProvider>
            <App />
          </PopupRootProvider>
        </PersistGate>
      </Provider>
      )
  }
}

AppRegistry.registerComponent(appName, () => Route);

// function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <Router />
//       </PersistGate>
//     </Provider>
//   );
// }





// const {store, persistor} = storages();

// function Route() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <PopupRootProvider>
//           <App />
//         </PopupRootProvider>
//       </PersistGate>
//     </Provider>
//   );
// }

// AppRegistry.registerComponent(appName, () => Route);


// /**
//  * @format
//  */