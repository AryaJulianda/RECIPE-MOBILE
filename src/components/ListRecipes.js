import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { Images } from '../../assets/images';

const ListRecipes = ({recipes,navigation}) => {
  // console.log(recipes,'ini recipes')
  return (
    <View>
    {recipes?.map((recipe) => {
      return(
        <TouchableOpacity onPress={(()=>navigation.navigate('Detail',{recipeId : recipe.recipe_id}))} key={recipe.recipe_id}>
          <View style={{display:'flex',flexDirection:'row',marginBottom:10}}>
            <ImageBackground source={{uri:recipe.img}} style={{width:80,height:80}}  imageStyle={{ borderRadius: 20 }}/>
            <View style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:1,marginHorizontal:15}}>
              <Text style={{fontFamily:'Poppins-Bold',fontSize:18,lineHeight:30}}>{recipe.title}</Text>
              <Text style={{fontFamily:'Poppins-Medium',fontSize:14,textTransform:'capitalize'}}>{recipe.category}</Text>
              <View style={{display:'flex',flexDirection:'row'}} > 
                <View style={{display:recipe.like_count?'flex':'none',flexDirection:'row'}}>
                  <Image source={Images.like} style={{width:15,height:15,marginRight:2,tintColor:'#eec302'}}/>
                  <Text style={{fontFamily:'Poppins-Medium',fontSize:14}} >{recipe.like_count}   •   </Text>
                </View>
                <Text style={{fontFamily:'Poppins-Bold',fontSize:14,marginRight:7}}>{recipe.author}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )})}
      </View>
  )
};

export default ListRecipes;
