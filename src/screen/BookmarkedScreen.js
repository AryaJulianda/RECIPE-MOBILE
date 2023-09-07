import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBookmarkedRecipes, getLatestRecipes } from '../storage/actions/recipeAction';
import ListRecipes from '../components/ListRecipes';
import { Images } from '../../assets/images';
import LoadingAnimation from '../components/LoadingAnimation';

const BookmarkedScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {bookmarkedRecipes,isLoading} = useSelector((s)=>s.recipes)
  const token = useSelector((state)=>state.auth.accessToken)
  
  useEffect(()=> {
    dispatch(getBookmarkedRecipes(token))
  },[])


  return (
    <>{isLoading==true ? <LoadingAnimation/> :
    <ScrollView style={{backgroundColor:"white",minHeight:'100%',paddingHorizontal:20,marginBottom:150}}>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:20}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{position:'absolute',left:0,marginLeft:0}}><Image source={Images.arrow} style={{width:45,height:45,tintColor:'#eec302'}}/></TouchableOpacity>
        <Text style={{fontFamily:'Poppins-Bold',color:'#eec302',fontSize:24,textAlign:'center'}}>Saved Recipes</Text>
      </View>
      {bookmarkedRecipes.length==0 ? <Text style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:20,color:'#999',marginTop:'80%'}}>Empty Recipes</Text> :
      <ListRecipes recipes={bookmarkedRecipes} navigation={navigation}/>}
    </ScrollView>}
    </>
  )
};

export default BookmarkedScreen;
