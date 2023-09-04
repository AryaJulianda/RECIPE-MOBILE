import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { Images } from '../../assets/images';
import { styles } from '../styles/homeStyle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../storage/actions/recipeAction';
import ListRecipes from '../components/ListRecipes';

const SearchScreen = ({navigation}) => {

  const [searchQuery,setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const {recipes,totalCount} = useSelector((state)=> state.recipes);
  // console.log(recipes)
  const dispatch = useDispatch();

  const totalPage = Math.ceil(totalCount/limit)

  const onNext = () => {
      currentPage < totalPage && setCurrentPage(currentPage + 1)
  }
  const onPrev = () => {
      currentPage > 1 && setCurrentPage(currentPage - 1)
  }

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setCurrentPage(1);
      dispatch(getAllRecipes(searchQuery, 1, limit));
    } else if(searchQuery.length == 0) {
      dispatch(getAllRecipes(searchQuery, currentPage, limit));
    }
    }, [searchQuery,currentPage, limit]);
    
  return (
    <View style={{backgroundColor:'#fff',paddingBottom:130}}>
      <View style={styles.searchField}>
          <Image source={Images.search} style={{width:20,height:20}}/>
          <TextInput placeholder='Search recipes in here' maxLength={40} style={styles.textInput} value={searchQuery} onChangeText={(text)=>setSearchQuery(text)}/>
      </View>
      <ScrollView style={{backgroundColor:"white",minHeight:'100%',paddingHorizontal:20}}>

        <ListRecipes recipes={recipes} navigation={navigation}/>
            
        {totalPage != 1 &&
        <View style={{display:'flex',flexDirection:'row',marginBottom:20,marginTop:10,justifyContent:'space-around',alignItems:'center'}} >
          <TouchableOpacity style={{backgroundColor:'#eec302',paddingHorizontal:20,paddingVertical:10,borderRadius:10}}><Text style={{fontFamily:'Poppins-Medium',color:'white',fontSize:15}} onPress={onPrev}>Prev</Text></TouchableOpacity>
          <Text style={{fontFamily:'Poppins-Medium',fontSize:15}}>Show {currentPage} From {totalPage}</Text>
          <TouchableOpacity style={{backgroundColor:'#eec302',paddingHorizontal:20,paddingVertical:10,borderRadius:10}}><Text style={{fontFamily:'Poppins-Medium',color:'white',fontSize:15}} onPress={onNext}>Next</Text></TouchableOpacity>
        </View>
        }

      </ScrollView>


    </View>
    
  )
};

export default SearchScreen;
