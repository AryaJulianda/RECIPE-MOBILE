import axios from "axios";

const url = 'https://creepy-pocket-yak.cyclic.app'

export const login = (inputData,navigation) => async(dispatch) => {
  try {
    dispatch({type:'LOGIN_PENDING'})
    const response = await axios.post(url+'/auth/login',inputData);
    console.log('login success',response.data);
    dispatch({type:'LOGIN_SUCCESS',payload:response.data});
    navigation.navigate("Main");
  } catch (error) {
    console.log(error,'ini error')
    dispatch({
      type:'LOGIN_FAILED',
      error:error,
      modalMessage:{
        header:'Login failed!',
        text:error.message}
      });
  }
}

export const regist = (inputData) => async(dispatch) => {
  try {
    dispatch({type:'REGIST_PENDING'})
    const response = await axios.post(url+`/auth/register`,inputData);
    console.log('regist success',inputData);
    dispatch({type:'REGIST_SUCCESS',payload:response.data,modalMessage:{header:'You are all set!',text:'Please check your email account for verification'}});
    // navigate('/');
  } catch (error) {
    console.log('regist failed',inputData,error)
    dispatch({type:'REGIST_FAILED',error:error.response.data.message,modalMessage:{header:'Regist failed!',text:error.response.data.message}});
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