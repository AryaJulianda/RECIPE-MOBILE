import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet ,TouchableOpacity, Image, ImageBackground,Platform,PermissionsAndroid,SafeAreaView, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { postRecipe } from '../storage/actions/recipeAction';
import { Images } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import LoadingAnimation from '../components/LoadingAnimation';
import OneSignal from 'react-native-onesignal';

const AddRecipeScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const token = useSelector((state)=> state.auth.accessToken)
  const {showToast,toastMessage,isLoading} = useSelector((state)=>state.recipes)

  // const [message,setMessage] = useState({
  //   type:'',
  //   header:''
  // })

  // useEffect(()=>{
  //   setMessage({
  //     type:toastMessage.type,
  //     header:toastMessage.header
  //   })
  // },[])

  // const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipe,setRecipe] = useState({
    title:'',
    ingredients:''
  });

  const handleChange = (name, value) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value
    }));
  }

  const [filePath, setFilePath] = useState({});

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

  const handleSubmit = async(event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title',recipe.title);
    formData.append('ingredients',recipe.ingredients);
    formData.append('category_id',selectedCategory);
    formData.append("img", {uri:filePath.uri,name:filePath.fileName,type:filePath.type})

    console.log('ini form data',formData)

    dispatch(postRecipe(formData,token,navigation,renderToast))
  }

  const renderToast = (type,text) => {
    Toast.show({
      type: type,
      text1: text,
      visibilityTime:8000
    });
  }


  return (
    <>{isLoading === true ? <LoadingAnimation/> :
      <ScrollView style={{paddingHorizontal:20}}>
        <Text style={{fontFamily:'Poppins-Medium',color:'#eec302',fontSize:24,textAlign:'center',paddingVertical:30}}>Add Your Recipe</Text>

        <View style={{display:'flex'}}>
          <TextInput name='title' value={recipe.title} style={{width:'100%',backgroundColor:'#fff',borderRadius:10,color:'#999',fontFamily:'Poppins-Medium',fontSize:15,paddingHorizontal:15,marginBottom:10}} placeholder="Title" onChangeText={(text) => handleChange('title', text)}/>
          <TextInput name='ingredients' value={recipe.ingredients} multiline={true} numberOfLines={7} style={{width:'100%',backgroundColor:'#fff',borderRadius:10,color:'#999',fontFamily:'Poppins-Medium',fontSize:15,paddingHorizontal:15,textAlignVertical:'top',marginBottom:10}} placeholder="Ingredients" onChangeText={(text) => handleChange('ingredients', text)}/>
          <View style={{borderRadius:10,backgroundColor:'white',paddingHorizontal:10}}>
            <Picker selectedValue={selectedCategory} onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)} mode="dropdown" style={{color:'#999',fontSize:20,fontFamily:'Poppins-Medium'}} fontFamily='Poppins-Medium'>
              <Picker.Item label="Select Category" enabled={false} fontFamily='Poppins-Medium' />
              <Picker.Item label="Main Course" value="1" fontFamily='Poppins-Bold'/>
              <Picker.Item label="Appetizer" value="2" />
              <Picker.Item label="Dessert" value="3" />
            </Picker>
          </View>

          <View style={{width:'100%',backgroundColor:'white',marginTop:10,padding:15,borderRadius:10,display:'flex',flexDirection:'column',alignItems:'center'}}>

            
            {filePath.uri === undefined ?
            <View style={{width:'100%',paddingVertical:10}}>
              <Text style={{fontFamily:'Poppins-Medium',color:'#999',textAlign:'center',fontSize:15}}>Choose image for your recipe</Text>
            </View> :

            <View style={{width:'100%',height:300}}>
              <ImageBackground source={{uri: filePath.uri}} style={{flex:1,resize:'contain'}} imageStyle={{ borderRadius: 10 }}/>
            </View>}

            <View>
              <View style={{display:'flex',flexDirection:'row',width:"100%",justifyContent:'space-around',marginTop:10}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyle}
                  onPress={() => captureImage('photo')}>
                  <Image source={Images.camera} style={{width:30,height:30,tintColor:'white'}}/>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyle}
                  onPress={() => chooseFile('photo')}>
                  <Image source={Images.folder} style={{width:27,height:27,tintColor:'white'}}/>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <TouchableOpacity style={{backgroundColor:'#eec302',marginVertical:20,paddingVertical:10,borderRadius:20}} onPress={handleSubmit}>
            <Text style={{textAlign:'center',fontFamily:'Poppins-Medium',color:'#fff'}}>Submit</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>}
    </>
  )
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily:'Poppins-Medium'
  },
  buttonStyle: {
    backgroundColor: '#eec302',
    padding: 5,
    borderRadius:12,
    width:'47%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});