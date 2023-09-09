import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLatestRecipes } from '../storage/actions/recipeAction';import ListRecipes from '../components/ListRecipes';
import { Images } from '../../assets/images';
import LoadingAnimation from '../components/LoadingAnimation';
;

const PopularRecipeScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {recipes,isLoading} = useSelector((s)=>s.recipes)
  
  useEffect(()=> {
    dispatch(getAllRecipes(searchQuery, currentPage, limit,searchBy));
  },[])
  
  // console.log(latestRecipes)

  return (
    <>{isLoading===true ? <LoadingAnimation/> :
      <ScrollView style={{backgroundColor:"white",minHeight:'100%',paddingHorizontal:20,marginBottom:150}}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:20}}>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={{position:'absolute',left:0,marginLeft:0}}><Image source={Images.arrow} style={{width:45,height:45,tintColor:'#eec302'}}/></TouchableOpacity>
          <Text style={{fontFamily:'Poppins-Bold',color:'#eec302',fontSize:24,textAlign:'center'}}>New Recipes</Text>
        </View>

        <ListRecipes recipes={latestRecipes} navigation={navigation}/>
      </ScrollView>}
    </>
  )
};

export default PopularRecipeScreen;