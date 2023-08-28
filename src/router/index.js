import * as React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postlogin } from '../storages/action/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Login(){
    const dispatch = useDispatch()
    const login = useSelector((state)=>state.login)
    
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>LOGIN SCREEN</Text>
          <Button title="LOGIN" onPress={() => dispatch(postlogin())} />

          <Text>{login.isLoading && "...loading"}</Text>
          <Text>{login.messageError && login.messageError}</Text>
        </View>
      );
}

function HomeScreen({navigation}) {
    const dispatch = useDispatch()
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity style={{backgroundColor:"red", width:120,height:30,borderRadius:20,justifyContent:'center',alignItems:'center',margin:20}} onPress={() => dispatch(logout())} >
        <Text style={{color:"white",fontSize:20,fontWeight:'800'}}>LOGOUT</Text>
      </TouchableOpacity>
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


function Router() {
    const login = useSelector((state)=>state.login)
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {login.data ? 
        <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{title: 'Recipe'}}
        />
        :
        <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'login'}}
        />
        
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
