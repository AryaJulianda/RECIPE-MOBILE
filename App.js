import React, { useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const Stack = createStackNavigator();

import LoginScreen from './src/screen/LoginScreen'; 
import RegisterScreen from './src/screen/RegisterScreen';
import MainScreen from './src/screen/MainScreen';
import DetailRecipeScreen from './src/screen/DetailRecipeScreen';
import UserActivationScreen from './src/screen/UserActivationScreen.js'
import SplashScreen from './src/screen/SplashScreen';

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="UserActivation" component={UserActivationScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Detail" component={DetailRecipeScreen} />
          <Stack.Screen name="Splash" component={SplashScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig}/>
    </>
  );
}


export default App;

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'yellowgreen' }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
    />
  )

}




// import * as React from 'react';
// import {View, Text, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//       <Button title="Go to Details" onPress={() => navigation.navigate('DetailsScreen',{
//         recipeId:20,
//         title:'nasi goreng'
//       })} />
//     </View>
//   );
// }

// function DetailsScreen({route,navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Details Screen</Text>
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go to Details" onPress={() => navigation.push('Detail')} />
//     </View>
//   );
// }

// function MyTabs({}){
//   return (
//     <Tab.Navigator screenOptions={{headerShown:false}} >
//       <Tab.Screen name="Home" component={HomeScreen} options={{
//         tabBarIcon: ()=> (<Ionicons name='home' size={30}/>)
//       }}/>
//       <Tab.Screen name="DetailsScreen" component={DetailsScreen} options={{
//         tabBarIcon: ()=> (<Ionicons name='apps-outline' size={30}/>)
//       }}/>
//     </Tab.Navigator>
//   );
// }


// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator >
//         <Stack.Screen
//           name="MyTabs"
//           component={MyTabs}
//           options={{title: 'Recipe'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
