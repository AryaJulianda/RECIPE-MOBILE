import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { Images } from '../../assets/images';
import { styles } from '../styles/homeStyle';

import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRecipeById } from '../storage/actions/recipeAction';

const DetailRecipeScreen = ({route,navigation}) => {

  const {recipeId} = route.params;
  const dispatch = useDispatch();
  const recipe = useSelector((state)=> state.recipes.recipe)

  useEffect(() => {
   dispatch(getRecipeById(recipeId))
  },[])
  console.log(recipe.ingredients)
  const ingredientsArray = recipe?.ingredients.split(',');

  return (
    <View style={{minHeight:'100%'}}>

      <View style={{width:'100%',height:320}}>
        <ImageBackground source={{uri:recipe.img}} style={{flex:1,resize:'contain'}}>
          <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']}style={styles.gradient}>   
            <TouchableOpacity onPress={()=>navigation.goBack()}><Image source={Images.arrow} style={{width:45,height:45,margin:10}}/></TouchableOpacity>
            <View style={{width:'70%',position:'absolute',left:0,bottom:0,marginLeft:20,marginBottom:30}}>
              <Text style={{fontFamily:"Poppins-Bold",fontSize:32,color:'white',lineHeight:36}}>{recipe.title}</Text>
              <Text style={{fontFamily:"Poppins-Medium",fontSize:18,color:'white'}}>by {recipe.author}</Text>
            </View>
            <View style={{width:'auto',position:'absolute',right:0,bottom:0,display:'flex',flexDirection:'row',gap:7,marginBottom:35,marginRight:20}}>
              <Image source={Images.bookmark_button} style={{width:45,height:45,marginRight:7}} />
              <Image source={Images.like_button} style={{width:45,height:45}} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={{paddingHorizontal:30,borderRadius:20,marginTop:-20,backgroundColor:'#fff',height:'100%'}}>
        <Text style={{fontFamily:"Poppins-Medium",color:'#18172B',fontSize:20,borderBottomWidth:2,borderBottomColor:'#eec302',width:100,marginVertical:20}}>Ingredients</Text>
        {ingredientsArray?.map((ingredient, index) => (
          <Text key={index} style={{ fontFamily: 'Poppins-Medium', fontSize: 16 ,textTransform:'capitalize'}}>
            ・{ingredient.trim()} 
          </Text>
        ))}
      </View>

      </View>
  )
};

export default DetailRecipeScreen;
