import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground} from 'react-native';
import {Images} from '../../assets/images'
import {styles} from '../styles/authStyle'
import { useDispatch, useSelector } from 'react-redux';
import { regist } from '../storage/actions/authAction';
import {Popup} from 'react-native-popup-confirm-toast'
import LoadingAnimation from '../components/LoadingAnimation';

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch()
  const {isLoadingAuth} = useSelector((s)=>s.auth)

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [usernameIsFocused, setUsernameIsFocused] = useState(false);
  const [pwIsFocused, setPwIsFocused] = useState(false);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const inputData = {
    email,
    password,
    username
  }

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };
  
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };



  const isFormValid = () => {
    const errors = [];
    if (username.trim() === '') errors.push(' • Username is required');
    if (!isEmailValid(email)) errors.push(' • Email not valid');
    if (!isPasswordValid(password)) errors.push(' • Password must have at least 8 character');
    if (errors.length > 0) {
      Popup.show({
        type: 'warning',
        title: 'Regist Failed!',
        textBody: errors.join('\n'),
        buttonText: 'OK',
        callback: () => Popup.hide(),
        okButtonStyle:{backgroundColor:'#eec302'},
        okButtonTextStyle:{fontFamily:'Poppins-Medium'},
        titleTextStyle:{fontFamily:'Poppins-Bold',color:'salmon',marginBottom:10},
        descTextStyle:{fontFamily:'Poppins-Medium',color:'#999',marginBottom:0,textAlign:'left',paddingHorizontal:10},
      })
      return false;
    }
    return true;
  };

 

  const handleSubmit = () => {
    if (isFormValid()) {
      dispatch(regist(inputData, Popup));
    }
  };

  return (
    <>
    {isLoadingAuth==true ? <LoadingAnimation/> :
      <View style={styles.container} >
        
        <Text style={styles.h1}>Wellcome !</Text>
        <Text style={styles.h2}>Register to Mama Recipe</Text>

        <View style={[styles.input, usernameIsFocused && styles.inputFocused]}>
          <Image source={Images.icon_user} style={{width:20,height:20,marginRight:10}}/>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.textInput}
            maxLength={40}
            inputMode='text'
            onFocus={() => setUsernameIsFocused(true)}
            onBlur={() => setUsernameIsFocused(false)}
          />
        </View>
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
            <Image source={isPasswordHidden ? Images.hide : Images.see} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate('Login')} style={styles.singUp}>Have an account? <Text style={{color:'#EFC81A'}}>Sing In</Text></Text>
      </View>
      }
    </> 
  );
}

export default RegisterScreen;