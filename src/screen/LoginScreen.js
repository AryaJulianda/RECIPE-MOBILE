import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground} from 'react-native';
import {Images} from '../../assets/images'
import {styles} from '../styles/authStyle'
import { useDispatch, useSelector } from 'react-redux';
import {login } from '../storage/actions/authAction'
import {Popup} from 'react-native-popup-confirm-toast'
import LoadingAnimation from '../components/LoadingAnimation';

function LoginScreen({ navigation }) {

  const {user,isLoadingAuth} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputData = {
    email,
    password
  }
  console.log(inputData)
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [pwIsFocused, setPwIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const handleLogin = () => {
    dispatch(login(inputData,navigation))
    // navigation.navigate('Main')
  };

  return (
    <>
    {isLoadingAuth==true ? <LoadingAnimation/> :
      <View style={styles.container} >
        
        <Text style={styles.h1}>Wellcome !</Text>
        <Text style={styles.h2}>Log in to your exiting account</Text>

        <View style={[styles.input, emailIsFocused && styles.inputFocused]}>
          <Image source={Images.icon_email} style={{width:20,height:20,marginRight:10}}/>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            maxLength={40}
            inputMode='email'
            onFocus={() => setEmailIsFocused(true)}
            onBlur={() => setEmailIsFocused(false)}
          />
        </View>
        <View style={[styles.input, pwIsFocused && styles.inputFocused]}>
          <Image source={Images.icon_password} style={{width:20,height:20,marginRight:10}}/>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={isPasswordHidden}
            style={styles.textInput}
            onFocus={() => setPwIsFocused(true)}
            onBlur={() => setPwIsFocused(false)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{position:'absolute',right:0,marginRight:15}}>
            <Image source={isPasswordHidden ? Images.hide : Images.see} style={{ width: 20, height: 20}} />
          </TouchableOpacity>
        </View>

        <Text style={styles.forget}>Forgot Password ?</Text>
        <TouchableOpacity onPress={handleLogin} style={styles.buttonStyle}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate('Register')} style={styles.singUp}>Don't have an account? <Text style={{color:'#EFC81A'}}>Sing up</Text></Text>
      </View>
    } 
    </> 
  );
}


export default LoginScreen;

