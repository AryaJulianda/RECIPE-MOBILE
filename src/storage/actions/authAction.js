import axios from "axios";

const url = 'https://creepy-pocket-yak.cyclic.app'
import {Popup} from 'react-native-popup-confirm-toast'

export const login = (inputData,navigation) => async(dispatch) => {
  try {
    dispatch({type:'LOGIN_PENDING'})
    const response = await axios.post(url+'/auth/login',inputData);
    console.log('login success',response.data);
    dispatch({type:'LOGIN_SUCCESS',payload:response.data});
    navigation.navigate("Main");
  } catch (error) {
    console.log(error,'ini error')
    dispatch({type:'LOGIN_FAILED',error:error,modalMessage:{header:'Login failed!',text:error.response.data.message}});
      Popup.show({
        type: 'warning',
        title: 'Login Failed!',
        textBody: error.response.data.message,
        buttonText: 'OK',
        callback: () => Popup.hide(),
        okButtonStyle:{backgroundColor:'#eec302'},
        okButtonTextStyle:{fontFamily:'Poppins-Medium'},
        titleTextStyle:{fontFamily:'Poppins-Bold',color:'#999',marginBottom:0},
        descTextStyle:{fontFamily:'Poppins-Medium',color:'#999',marginBottom:0},
      })
  }
}

export const regist = (inputData,Popup) => async(dispatch) => {
  try {
    dispatch({type:'REGIST_PENDING'})
    const response = await axios.post(url+`/auth/register`,inputData);
    console.log('regist success',inputData);
    dispatch({type:'REGIST_SUCCESS',payload:response.data,modalMessage:{header:'You are all set!',text:'Please check your email account for verification'}});
    Popup.show({
      type: 'success',
      title: 'You are all set!',
      textBody: 'Please check your email account for verification',
      buttonText: 'OK',
      callback: () => Popup.hide(),
      okButtonStyle:{backgroundColor:'#eec302'},
      okButtonTextStyle:{fontFamily:'Poppins-Medium'},
      titleTextStyle:{fontFamily:'Poppins-Bold',color:'#999',marginBottom:0},
      descTextStyle:{fontFamily:'Poppins-Medium',color:'#999',marginBottom:0},
    })
    // navigate('/');
  } catch (error) {
    console.log('regist failed',inputData,error)
    dispatch({type:'REGIST_FAILED',error:error.response.data.message,modalMessage:{header:'Regist failed!',text:error.response.data.message}});
    Popup.show({
      type: 'warning',
      title: 'Regist Failed!',
      textBody: error.response.data.message,
      buttonText: 'OK',
      callback: () => Popup.hide(),
      okButtonStyle:{backgroundColor:'#eec302'},
      okButtonTextStyle:{fontFamily:'Poppins-Medium'},
      titleTextStyle:{fontFamily:'Poppins-Bold',color:'#999',marginBottom:0},
      descTextStyle:{fontFamily:'Poppins-Medium',color:'#999',marginBottom:0},
    })
  }
}

export const activation = (token) => async(dispatch) => {
  try {
    dispatch({type:'REGIST_PENDING'})
    const response = await axios.post(url+`/auth/activate` +token);
    console.log('activation success' , response.data, token);
    dispatch({type:'ACTIVATION_SUCCESS',modalMessage:{header:'Account has been set up',text:'Account activated successfully, please login'}});
    // navigate('/');
  } catch (error) {
    console.log('activation failed',token,error)
    // dispatch({type:'REGIST_FAILED',error:error.response.data.message,modalMessage:{header:'Regist failed!',text:error.response.data.message}});
  }
}

export const logout = (navigation) => async(dispatch) => {
  try {
    dispatch({type:'REGIST_PENDING'})
    dispatch({type:"DELETE_TOKEN"})
    navigation.navigate('Login')
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = (userId,inputData,token,navigation) => async(dispatch) => {
  try {
    dispatch({type:'REGIST_PENDING'})
    const response = await axios.put(url+'/user/edit/'+userId,inputData,{
      headers:{
        Authorization:`Bearer ${token}`,
        'Content-Type':'multipart/form-data'
      }});
    console.log('UPDATE success');
    dispatch({type:'UPDATE_USER_SUCCESS',payload:response.data.new_data});
      Popup.show({
        type: 'success',
        title: 'Edit Profile Success',
        buttonText: 'OK',
        callback: () => {
          Popup.hide()
          navigation.navigate('ProfileOption')},
        okButtonStyle:{backgroundColor:'#eec302'},
        okButtonTextStyle:{fontFamily:'Poppins-Medium'},
        titleTextStyle:{fontFamily:'Poppins-Bold',color:'#999',marginBottom:0},
        descTextStyle:{fontFamily:'Poppins-Medium',color:'#999',marginBottom:0},
      })
  } catch (error) {
    dispatch({
      type:'UPDATE_USER_FAILED',
      error:error.response.data.message,
      modalMessage:{
        header:'Edit User failed!',
        text:error.response.data.message}
      });
  }
}