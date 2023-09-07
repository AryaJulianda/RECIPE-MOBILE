import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import { Images } from '../../assets/images';
import { styles } from '../styles/homeStyle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../storage/actions/recipeAction';
import ListRecipes from '../components/ListRecipes';
import LoadingAnimation from '../components/LoadingAnimation'

const SearchScreen = ({navigation}) => {

  const [searchQuery,setSearchQuery] = useState('');
  const [searchBy,setSearchBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const {recipes,totalCount,isLoading} = useSelector((state)=> state.recipes);
  // console.log(recipes)
  const dispatch = useDispatch();

  const totalPage = Math.ceil(totalCount/limit)

  const onNext = async() => {
      currentPage < totalPage && setCurrentPage(currentPage + 1)
      dispatch(getAllRecipes(searchQuery, currentPage, limit,searchBy));
  }
  const onPrev = async () => {
      currentPage > 1 && setCurrentPage(currentPage - 1)
      dispatch(getAllRecipes(searchQuery, currentPage, limit,searchBy));
  }

  useEffect(() => {
    if (searchQuery.length == 3) {
      setCurrentPage(1);
      dispatch(getAllRecipes(searchQuery, 1, limit,searchBy));
    } else if(searchQuery.length == 0) {
      dispatch(getAllRecipes(searchQuery, currentPage, limit,searchBy));
    }
    }, [searchQuery,currentPage, limit,searchBy]);
    

  return (
    <View style={{backgroundColor:'#fff',paddingBottom:210}}>
      <View style={styles.searchField}>
          <Image source={Images.search} style={{width:20,height:20}}/>
          <TextInput placeholder='Search recipes in here' maxLength={40} style={styles.textInput} value={searchQuery} onChangeText={(text)=>setSearchQuery(text)}/>
      </View>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginBottom:10,paddingHorizontal:20}}>
        <Text style={{fontFamily:'Poppins-Medium',color:'#999',marginRight:5}}>Search by : </Text>
        <TouchableOpacity style={searchBy=='title' ? styles.isActiveButton : styles.disActiveButton} onPress={() => setSearchBy('title')}><Text style={searchBy=='title' ? styles.isActiveTextButton : styles.disActiveTextButton}>Title</Text></TouchableOpacity>
        <TouchableOpacity style={searchBy=='ingredients' ? styles.isActiveButton : styles.disActiveButton} onPress={() => setSearchBy('ingredients')}><Text style={searchBy=='ingredients' ? styles.isActiveTextButton : styles.disActiveTextButton}>Ingredients</Text></TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor:"white",minHeight:'100%',paddingHorizontal:20}}>

          {isLoading===true ? <LoadingAnimation /> :
          <ListRecipes recipes={recipes} navigation={navigation}/>}
        
        {totalPage > 1 &&  
        <View style={{display:'flex',flexDirection:'row',marginBottom:20,marginTop:10,justifyContent:'space-around',alignItems:'center'}} >
          <TouchableOpacity style={{backgroundColor:'#eec302',paddingHorizontal:20,paddingVertical:10,borderRadius:10}}><Text style={{fontFamily:'Poppins-Medium',color:'white',fontSize:15}} onPress={onPrev}>Prev</Text></TouchableOpacity>
          <Text style={{fontFamily:'Poppins-Medium',fontSize:15}}>Show {currentPage} From {totalPage}</Text>
          <TouchableOpacity style={{backgroundColor:'#eec302',paddingHorizontal:20,paddingVertical:10,borderRadius:10}}><Text style={{fontFamily:'Poppins-Medium',color:'white',fontSize:15}} onPress={onNext}>Next</Text></TouchableOpacity>
        </View>
        }
        {totalPage===0 && <Text style={{...styles.textInput,fontSize:20,textAlign:'center'}}>Recipe Not Found</Text>}

      </ScrollView>


    </View>  
  )
};

export default SearchScreen;
