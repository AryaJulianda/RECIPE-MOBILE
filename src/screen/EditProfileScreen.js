import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,Platform,PermissionsAndroid,} from 'react-native';
import { Images } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../storage/actions/authAction';
import { styles } from '../styles/authStyle';
import { useEffect, useState } from 'react';
import { Root, SPSheet } from 'react-native-popup-confirm-toast'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LoadingAnimation from '../components/LoadingAnimation'

const EditProfileScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const {user,isLoadingAuth} = useSelector((s)=> s.auth)

  const [username, setUsername] = useState('');
  const [usernameIsFocused, setUsernameIsFocused] = useState(false);
  const [filePath, setFilePath] = useState({});

  useEffect(() => { 
    setUsername(user.username)
    setFilePath({uri: user.photo})
  },[])

  const component = () => {
    return (
      <View>
      <Text style={{...styles.textInput,textAlign:'center',width:'100%',marginTop:20,marginBottom:0,fontSize:18}}>Choose Photo From</Text>
        <View style={{display:'flex',flexDirection:'row',width:"100%",justifyContent:'space-around',marginTop:10,paddingHorizontal:20}}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle2}
            onPress={() => captureImage('photo')}>
            <Image source={Images.camera} style={{width:30,height:30,tintColor:'white'}}/>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle2}
            onPress={() => chooseFile('photo')}>
            <Image source={Images.folder} style={{width:27,height:27,tintColor:'white'}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
    
    //props.spSheet.hide();
    //props.spSheet.setHeight(150,()=>alert('nice'));
};

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 700,
      maxHeight: 700,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response.assets);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0]);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 700,
      maxHeight: 700,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0]);
    });
  };

  // const inputData = {
  //   username
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username',username);
    if(user.photo != filePath.uri){
      formData.append("img", {uri:filePath.uri,name:filePath.fileName,type:filePath.type})
    }
    dispatch(updateUser(user.user_id,formData,user.accessToken,navigation))
}

  return (
    <>
      {isLoadingAuth==true ? <LoadingAnimation/> :
      <View style={{backgroundColor:'white',width:'100%',height:'100%',display:'flex',alignItems:'center'}} >
        
        <View style={{backgroundColor:'#EEC302',display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:40,gap:10,width:'100%'}} >
          <ImageBackground source={filePath.uri ? {uri: filePath.uri} : Images.photoDefault} style={{width:100,height:100,marginBottom:10}} imageStyle={{borderRadius:100}} />
          <TouchableOpacity 
            onPress={() => {
              const spSheet = SPSheet;
              spSheet.show({
                  component: () => component({spSheet}),
                  dragFromTopOnly: true,
                  height:260
              });
            }}>
            <Text style={{fontFamily:'Poppins-Bold',color:'#fff',fontSize:18}}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={{width:'95%',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'white',marginTop:-30,paddingHorizontal:10}} >
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
          <View style={{...styles.input,paddingVertical:15}}>
            <Image source={Images.icon_email} style={{width:20,height:20,marginRight:16}}/>
            <Text style={styles.textInput}>{user.email}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity style={{backgroundColor:'#eec302',marginTop:50,paddingVertical:10,paddingHorizontal:50,borderRadius:20,marginHorizontal:'auto'}} 

          >
            <Text style={{textAlign:'center',fontFamily:'Poppins-Medium',color:'white'}} onPress={handleSubmit}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    }  

    </>
  )
};

export default EditProfileScreen;