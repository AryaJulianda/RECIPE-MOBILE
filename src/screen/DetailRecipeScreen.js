import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { Images } from '../../assets/images';
import { styles } from '../styles/homeStyle';

import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRecipeById,addLike, getLikedRecipes, addBookmark, getBookmarkedRecipes, removeBookmark } from '../storage/actions/recipeAction';
import LoadingAnimation from '../components/LoadingAnimation';

const DetailRecipeScreen = ({route,navigation}) => {

  const {recipeId} = route.params;
  const dispatch = useDispatch();
  const {recipe,likedRecipes,bookmarkedRecipes,isLoading} = useSelector((state)=> state.recipes)
  const token = useSelector((state)=>state.auth.accessToken)


  useEffect(() => {
   dispatch(getRecipeById(recipeId))
   dispatch(getLikedRecipes(token))
   const isLiked = likedRecipes.some((recipe)=>recipe.recipe_id===recipeId)
   isLiked===true && setLikeIsActive(true) 
   const isBookmark = bookmarkedRecipes.some((recipe)=>recipe.recipe_id===recipeId)
   isBookmark===true && setBookmarkIsActive(true) 
  },[])
  // console.log(recipe.ingredients)
  
  const ingredientsArray = recipe?.ingredients?.split(',') || [];

  const [bookmarkIsActive,setBookmarkIsActive] = useState(false)
  const [likeIsActive,setLikeIsActive] = useState(false)



  const handleClickLike = async () => {
    likeIsActive == true ? setLikeIsActive(false) : setLikeIsActive(true) 
    dispatch(addLike(recipeId,token))
    dispatch(getLikedRecipes(token))
  }
  const handleClickBookmark = () => {
    bookmarkIsActive == true ? setBookmarkIsActive(false) : setBookmarkIsActive(true) 
    bookmarkIsActive == false ? dispatch(addBookmark(recipeId,token)) : dispatch(removeBookmark(recipeId,token))
    dispatch(getBookmarkedRecipes(token))
  }

  return (
    <>
    {isLoading===true? <LoadingAnimation/> :
    <View style={{minHeight:'100%'}}>
      
      <View style={{width:'100%',height:320}}>
        <ImageBackground source={{uri:recipe.img}} style={{flex:1,resize:'contain'}}>
          <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.1)']}style={styles.gradient}>   
            <TouchableOpacity onPress={()=>navigation.goBack()}><Image source={Images.arrow} style={{width:45,height:45,margin:10}}/></TouchableOpacity>
            <View style={{width:'70%',position:'absolute',left:0,bottom:0,marginLeft:20,marginBottom:30}}>
              <Text style={{fontFamily:"Poppins-Bold",fontSize:32,color:'white',lineHeight:36}}>{recipe.title}</Text>
              <Text style={{fontFamily:"Poppins-Medium",fontSize:18,color:'white'}}>by {recipe.author}</Text>
            </View>
            <View style={{width:'auto',position:'absolute',right:0,bottom:0,display:'flex',flexDirection:'row',gap:7,marginBottom:35,marginRight:20}}>
              <TouchableOpacity onPress={handleClickBookmark} style={{backgroundColor:bookmarkIsActive == true ? '#eec302' :'#ffffff00',padding:4,borderRadius:10,marginRight:5}}><Image source={Images.bookmark_button} style={{width:35,height:35,tintColor:bookmarkIsActive == true ? 'white' :'#eec302'}} /></TouchableOpacity>
              <TouchableOpacity onPress={handleClickLike} style={{backgroundColor:likeIsActive == true ? '#eec302' : '#ffffff00',padding:2,borderRadius:10,marginRight:5}}><Image source={Images.like_button} style={{width:38,height:38,tintColor:likeIsActive == true ? 'white' :'#eec302'}} /></TouchableOpacity>
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

    </View>}
    </>
  )
};

export default DetailRecipeScreen;
