import React,{useState,useEffect} from "react"
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground, Alert} from 'react-native';
import { Images } from '../../assets/images';
import { styles } from '../styles/homeStyle';
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, getAllRecipesById, getRecipeById } from "../storage/actions/recipeAction";
import Toast from 'react-native-toast-message';
import {Popup} from 'react-native-popup-confirm-toast'

const MyRecipeScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const recipes = useSelector((state)=>state.recipes.myRecipes);
  const token = useSelector((s)=>s.auth.accessToken)

  useEffect(()=> {
    dispatch(getAllRecipesById())
  },[])
 
  const handleEdit = (recipeId) => {
    dispatch(getRecipeById(recipeId))
    navigation.navigate('EditRecipe',{recipeId : recipeId})
  }

  const handleDelete = async (recipeId) => {
    await dispatch(deleteRecipe(recipeId,token,renderToast))
    dispatch(getAllRecipesById())
  };

  const renderToast = (type,header) => {
    Toast.show({
      type: type,
      text1: header,
      visibilityTime:4000
    });
  }

  const confirm = (recipeId) => {
    Popup.show({
        type: 'confirm',
        title: 'Are you sure to delete this recipe?',
        buttonText: 'Yes',
        confirmText: 'No',
        callback: () => {
            handleDelete(recipeId)
            Popup.hide();
        },
        cancelCallback: () => {
            Popup.hide();
        },
        okButtonStyle:{backgroundColor:'#eec302'},
        confirmButtonStyle:{borderWidth:1,borderColor:'#eec302'},
        okButtonTextStyle:{fontFamily:'Poppins-Medium'},
        confirmButtonTextStyle:{fontFamily:'Poppins-Medium',color:'#999'},
        titleTextStyle:{fontFamily:'Poppins-Medium',color:'#999',marginBottom:0},
    })
  }

  return (
    <View style={{backgroundColor:'#fff'}}>
    <ScrollView style={{backgroundColor:"#fff",minHeight:"100%"}}>

    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:20}}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{position:'absolute',left:0,marginLeft:20}}><Image source={Images.arrow} style={{width:45,height:45,tintColor:'#eec302'}}/></TouchableOpacity>
      <Text style={{fontFamily:'Poppins-Bold',color:'#eec302',fontSize:24,textAlign:'center'}}>My Recipes</Text>
    </View>
    
    {!recipes ? <Text style={{fontFamily:'Poppins-Bold',color:'salmon',fontSize:24,textAlign:'center',marginTop:200}}>Empty Recipe</Text> :
    <View style={{paddingHorizontal:20}}>

    {recipes?.map((recipe) => {
      return(
        <TouchableOpacity onPress={(()=>navigation.navigate('Detail',{recipeId : recipe.recipe_id}))} key={recipe.recipe_id}>
          <View style={{display:'flex',flexDirection:'row',marginBottom:10,alignItems:'center'}}>
            <ImageBackground source={recipe.img !== null ? {uri:recipe.img} : Images.burger} style={{width:80,height:80}}  imageStyle={{ borderRadius: 20 }}/>
            <View style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:1,marginHorizontal:15}}>
              <Text style={{fontFamily:'Poppins-Bold',fontSize:16,lineHeight:30,width:130,lineHeight:22,textTransform:'capitalize'}}>{recipe.title}</Text>
              <Text style={{fontFamily:'Poppins-Medium',fontSize:14,textTransform:'capitalize'}}>{recipe.category}</Text>
              <View style={{display:'flex',flexDirection:'row'}} >
                <Image source={Images.like} style={{width:15,height:15,marginRight:2,tintColor:'#eec302'}}/>
                <Text style={{fontFamily:'Poppins-Medium',fontSize:14}} >{recipe.like_count}</Text>
              </View>
            </View>
            <View style={{display:'flex',flexDirection:'column',alignItems:"center",justifyContent:'center',position:"absolute",right:0}}>
              <TouchableOpacity style={{backgroundColor:'skyblue',width:80,paddingVertical:3,borderRadius:8,marginBottom:5}} onPress={()=>handleEdit(recipe.recipe_id)}>
                <Text style={{fontFamily:'Poppins-Bold',fontSize:16,textAlign:"center",color:'#fff'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'salmon',width:80,paddingVertical:3,borderRadius:8}} onPress={()=>confirm(recipe.recipe_id)}>
                <Text style={{fontFamily:'Poppins-Bold',fontSize:16,textAlign:"center",color:'#fff'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )

      })} 

    </View> 
    }
    </ScrollView>
  </View>
  )
};

export default MyRecipeScreen;

{/* <View>
    <TouchableOpacity
        onPress={() =>
            Popup.show({
                type: 'confirm',
                title: 'Dikkat!',
                textBody: 'Mutlak özgürlük, kendi başına hiçbir anlam ifade etmez. ',
                buttonText: 'Tamam',
                confirmText: 'Vazgeç',
                callback: () => {
                    alert('Okey Callback && hidden');
                    Popup.hide();
                },
                cancelCallback: () => {
                    alert('Cancel Callback && hidden');
                    Popup.hide();
                },
            })
        }
    >
        <Text>Open Popup Confirm Message</Text>
    </TouchableOpacity>
</View> */}