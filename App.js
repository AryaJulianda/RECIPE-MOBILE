import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('DetailsScreen',{
        recipeId:20,
        title:'nasi goreng'
      })} />
    </View>
  );
}

function DetailsScreen({route,navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Details" onPress={() => navigation.push('Detail')} />
    </View>
  );
}

function MyTabs({}){
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ()=> (<Ionicons name='home' size={30}/>)
      }}/>
      <Tab.Screen name="DetailsScreen" component={DetailsScreen} options={{
        tabBarIcon: ()=> (<Ionicons name='apps-outline' size={30}/>)
      }}/>
    </Tab.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{title: 'Recipe'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
