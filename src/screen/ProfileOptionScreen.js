import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Images } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../storage/actions/authAction';
import MyRecipeScreen from './MyRecipeScreen.js'
import { createStackNavigator } from '@react-navigation/stack'

export const ProfileOption = ({navigation}) => {

  const {user} = useSelector((s)=> s.auth)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(navigation));
  }

  return (
      <View style={{backgroundColor:'white',width:'100%',height:'100%',display:'flex',alignItems:'center'}} >
        
        <View style={{backgroundColor:'#EEC302',display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:40,width:'100%'}} >
          <ImageBackground source={user?.photo ? {uri: user?.photo} : Images.photoDefault} style={{width:100,height:100,marginBottom:10}} imageStyle={{borderRadius:100}} />
          <Text style={{fontFamily:'Poppins-Bold',color:'#fff',fontSize:18}}>{user?.username}</Text>
        </View>

        <View style={{width:'95%',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'white',marginTop:-30}} >

          <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:20}} >
            <Image source={Images.icon_user} style={{tintColor:'#eec302',width:20,height:20,marginRight:12}} />
            <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >Edit Profile</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('EditProfile')}} style={{position:'absolute',right:10,padding:10}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
          </View>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:20}} >
            <Image source={Images.myRecipe} style={{tintColor:'#eec302',width:20,height:20,marginRight:12}} />
            <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >My Recipe</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('MyRecipe')}} style={{position:'absolute',right:10,padding:10}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
          </View>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:20}} >
            <Image source={Images.bookmark} style={{tintColor:'#eec302',width:20,height:20,marginRight:12}} />
            <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >Saved Recipe</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('Bookmarked')}} style={{position:'absolute',right:10,padding:10}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
          </View>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:20}} >
            <Image source={Images.like} style={{tintColor:'#eec302',width:20,height:20,marginRight:12}} />
            <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >Liked Recipe</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('Liked')}} style={{position:'absolute',right:10,padding:10}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity style={{backgroundColor:'#eec302',marginTop:50,paddingVertical:10,paddingHorizontal:50,borderRadius:20,marginHorizontal:'auto'}} onPress={handleLogout}>
            <Text style={{textAlign:'center',fontFamily:'Poppins-Medium'}}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
  )
};