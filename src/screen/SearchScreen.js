import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { Images } from '../../assets/images';
import { styles } from '../styles/homeStyle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../storage/actions/recipeAction';

const SearchScreen = ({navigation}) => {

  const [searchQuery,setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const {recipes} = useSelector((state)=> state.recipes);
  // console.log(recipes)
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery.length >= 3 || searchQuery === "") {
      setCurrentPage(1);
      dispatch(getAllRecipes(searchQuery, 1, limit));
    }
    }, [searchQuery, limit]);

    useEffect(() => {
    dispatch(getAllRecipes(searchQuery, currentPage, limit));
    }, [currentPage, limit]);

    const handleChange = (e) => {
      setSearchQuery(e.target.value);
  }

  return (
    <View style={{backgroundColor:'#fff'}}>
      <View style={styles.searchField}>
          <Image source={Images.search} style={{width:20,height:20}}/>
          <TextInput placeholder='Search recipes in here' maxLength={40} style={styles.textInput} value={searchQuery} onChangeText={handleChange}/>
      </View>
      <ScrollView style={{backgroundColor:"#fff",minHeight:"100%",paddingHorizontal:20}}>


        {/* Result */}
        

          <TouchableOpacity onPress={(()=>navigation.navigate('Detail'))}>
            <View style={{display:'flex',flexDirection:'row',marginBottom:10}}>
              <ImageBackground source={Images.burger} style={{width:80,height:80}}  imageStyle={{ borderRadius: 20 }}/>
              <View style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:1,marginHorizontal:15}}>
                <Text style={{fontFamily:'Poppins-Bold',fontSize:18,lineHeight:30}}>Black Fish</Text>
                <Text style={{fontFamily:'Poppins-Medium',fontSize:14}}>Main Course</Text>
                <View style={{display:'flex',flexDirection:'row'}} > 
                  <Text style={{fontFamily:'Poppins-Bold',fontSize:14,marginRight:7}}>Arya Julianda   •</Text>
                  <Image source={Images.like} style={{width:15,height:15,marginRight:2,tintColor:'#eec302'}}/>
                  <Text style={{fontFamily:'Poppins-Medium',fontSize:14}} >15k</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={(()=>navigation.navigate('Detail',{recipeId : recipe.recipe_id}))} key={recipe.recipe_id}>
          <View style={{display:'flex',flexDirection:'row',marginBottom:10,alignItems:'center'}}>
            <ImageBackground source={recipe.img !== null ? {uri:recipe.img} : Images.burger} style={{width:90,height:90}}  imageStyle={{ borderRadius: 20 }}/>
            <View style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:1,marginHorizontal:15}}>
              <Text style={{fontFamily:'Poppins-Bold',fontSize:16,lineHeight:30,width:130,lineHeight:22,textTransform:'capitalize'}}>{recipe.title}</Text>
              <Text style={{fontFamily:'Poppins-Medium',fontSize:14,textTransform:'capitalize'}}>{recipe.category}</Text>
              <View style={{display:'flex',flexDirection:'row'}} >
                <Image source={Images.like} style={{width:15,height:15,marginRight:2,tintColor:'#eec302'}}/>
                <Text style={{fontFamily:'Poppins-Medium',fontSize:14}} >15k</Text>
              </View>
            </View>
            <View style={{display:'flex',flexDirection:'column',alignItems:"center",justifyContent:'center',position:"absolute",right:0}}>
              <TouchableOpacity style={{backgroundColor:'skyblue',width:80,paddingVertical:3,borderRadius:8,marginBottom:5}} >
                <Text style={{fontFamily:'Poppins-Bold',fontSize:16,textAlign:"center",color:'#fff'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'salmon',width:80,paddingVertical:3,borderRadius:8}} onPress={()=>handleDelete(recipe.recipe_id,token)}>
                <Text style={{fontFamily:'Poppins-Bold',fontSize:16,textAlign:"center",color:'#fff'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity> */}

      </ScrollView>
    </View>
    
  )
};

export default SearchScreen;
