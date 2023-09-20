import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground} from 'react-native';
import {Images} from '../../assets/images'

import { useIsFocused } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import AddRecipeScreen from './AddRecipeScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message';

const Tab = createBottomTabNavigator();

function MainScreen({navigation}) {

  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if(user==null){
      navigation.replace('Login');
    }else if(!Object.keys(user)?.length) {
      navigation.replace('Login');
    }
  }, []);

  return (
    <>
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color,size }) => (
            <Image
              source={Images.home}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarInActiveTintColor:'#999',
          tabBarActiveTintColor:'#eec302',
          tabBarShowLabel:false
        }}
      />
      <Tab.Screen
        name="Post"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ color,size }) => (
            <Image
              source={Images.add}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarInActiveTintColor:'#999',
          tabBarActiveTintColor:'#eec302',
          tabBarShowLabel:false
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color,size }) => (
            <Image
              source={Images.search}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarInActiveTintColor:'#999',
          tabBarActiveTintColor:'#eec302',
          tabBarShowLabel:false
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color,size }) => (
            <Image
              source={Images.chat}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarInActiveTintColor:'#999',
          tabBarActiveTintColor:'#eec302',
          tabBarShowLabel:false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color,size }) => (
            <Image
              source={Images.icon_user}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
          tabBarInActiveTintColor:'#999',
          tabBarActiveTintColor:'#eec302',
          tabBarShowLabel:false
        }}
      />
    </Tab.Navigator>
    <View style={{position:'absolute',bottom:0,display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
      <TouchableOpacity style={{paddingVertical:25,paddingHorizontal:20}} onPress={()=>navigation.navigate('Home')}></TouchableOpacity>
      <TouchableOpacity style={{paddingVertical:25,paddingHorizontal:20}} onPress={()=>navigation.navigate('Post')}></TouchableOpacity>
      <TouchableOpacity style={{paddingVertical:25,paddingHorizontal:20}} onPress={()=>navigation.navigate('Search')}></TouchableOpacity>
      <TouchableOpacity style={{paddingVertical:25,paddingHorizontal:20}} onPress={()=>navigation.navigate('Chat')}></TouchableOpacity>
      <TouchableOpacity style={{paddingVertical:25,paddingHorizontal:20}} onPress={()=>navigation.navigate('Profile')}></TouchableOpacity>
    </View>
    </>
  );
}

export default MainScreen;

