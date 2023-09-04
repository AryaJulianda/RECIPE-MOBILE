import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Images } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../storage/actions/authAction';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileOption } from './ProfileOptionScreen';

import MyRecipeScreen from './MyRecipeScreen.js'
import EditRecipeScreen from './EditRecipeScreen.js'
import BookmarkedScreen from './BookmarkedScreen.js'
import LikedScreen from './LikedScreen.js'

const ProfileStack = createStackNavigator();

// const ProfileOption = () => {

//   const {user} = useSelector((s)=> s.auth)
//   const dispatch = useDispatch();

//   return (
//       <View style={{backgroundColor:'white',width:'100%',height:'100%',display:'flex',alignItems:'center'}} >
        
//         <View style={{backgroundColor:'#EEC302',display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:40,gap:10,width:'100%'}} >
//           <ImageBackground source={{uri: user.photo}} style={{width:100,height:100}} imageStyle={{borderRadius:100}} />
//           <Text style={{fontFamily:'Poppins-Bold',color:'#fff',fontSize:18}}>{user.username}</Text>
//         </View>

//         <View style={{width:'95%',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'white',marginTop:-30}} >

//           <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:12,padding:20}} >
//             <Image source={Images.icon_user} style={{tintColor:'#eec302',width:20,height:20}} />
//             <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >Edit Profile</Text>
//             <TouchableOpacity onPress={()=>{alert('Clicked')}} style={{position:'absolute',right:20}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
//           </View>
//           <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:12,padding:20}} >
//             <Image source={Images.myRecipe} style={{tintColor:'#eec302',width:20,height:20}} />
//             <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >My Recipe</Text>
//             <TouchableOpacity onPress={()=>{alert('Clicked')}} style={{position:'absolute',right:20}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
//           </View>
//           <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:12,padding:20}} >
//             <Image source={Images.bookmark} style={{tintColor:'#eec302',width:20,height:20}} />
//             <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >Saved Recipe</Text>
//             <TouchableOpacity onPress={()=>{alert('Clicked')}} style={{position:'absolute',right:20}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
//           </View>
//           <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:12,padding:20}} >
//             <Image source={Images.like} style={{tintColor:'#eec302',width:20,height:20}} />
//             <Text style={{fontFamily:'Poppins-Medium',fontSize:16,lineHeight:20}} >Liked Recipe</Text>
//             <TouchableOpacity onPress={()=>{alert('Clicked')}} style={{position:'absolute',right:20}}><Image source={Images.next} style={{tintColor:'#999',width:20,height:20}} /></TouchableOpacity>
//           </View>
//         </View>

//         <View>
//           <TouchableOpacity style={{backgroundColor:'#eec302',marginTop:50,paddingVertical:10,paddingHorizontal:50,borderRadius:20,marginHorizontal:'auto'}} onPress={dispatch(logout)}>
//             <Text style={{textAlign:'center',fontFamily:'Poppins-Medium'}}>Logout</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//   )
// };

// export default ProfileScreen;

function ProfileScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name="ProfileOprion"
        component={ProfileOption}
      />
      <ProfileStack.Screen
        name="MyRecipe"
        component={MyRecipeScreen}
      />
      <ProfileStack.Screen
        name="Bookmarked"
        component={BookmarkedScreen}
      />
      <ProfileStack.Screen
        name="Liked"
        component={LikedScreen}
      />
      <ProfileStack.Screen
        name="EditRecipe"
        component={EditRecipeScreen}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileScreen;