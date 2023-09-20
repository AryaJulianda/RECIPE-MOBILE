import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView, RefreshControl} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import { styles } from '../styles/homeStyle';
import { Images } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllRecipes, getHomePageRecipes, getLatestRecipes, getPopularRecipes } from '../storage/actions/recipeAction';
import { createStackNavigator } from '@react-navigation/stack';

import NewRecipesScreen from './NewRecipesScreen.js'
import Slider from '../components/Slider';
import LoadingAnimation from '../components/LoadingAnimation';
import RecommendationRecipesScreen from './RecommendationRecipesScreen';
import PopularRecipesScreen from './PopularRecipesScreen';
const HomeStack = createStackNavigator();

const HomeScreenNav = ({navigation}) => {
  
  const dispatch = useDispatch()
  const {latestRecipes,popularRecipes,homePageRecipes,recipes,isLoading} = useSelector((s)=>s.recipes)
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=> {
    dispatch(getHomePageRecipes())
    dispatch(getAllRecipes(undefined, 1, 5,undefined))
    // console.log('ini recipes',recipes)
  },[])
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(getHomePageRecipes())
    await dispatch(getAllRecipes())
    setRefreshing(false);
  };

  return (
    <>{isLoading===true ? <LoadingAnimation/> : 
    <ScrollView style={{backgroundColor:"#fff"}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }>
      <View style={styles.searchField}>
        <Image source={Images.search} style={{width:20,height:20}}/>
        <TextInput placeholder='Search recipes in here' maxLength={40} style={styles.textInput} onPressIn={()=> navigation.navigate('Search')} />
      </View>

      <View>
        
        {/* Popular Recipes */}
        <Slider recipes={homePageRecipes.popular} header={'Popular Recipes'} navigate={()=> navigation.navigate('PopularRecipes')} navigation={navigation}/>

        {/* Category */}
        <View style={{marginBottom:20}}>
          <Text style={styles.h1}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row',paddingHorizontal:20}}>
            
            <View style={{width:50,height:'auto',display:'flex',justifyContent:'center',alignItems:'center',marginRight:10}}>
              <Image source={Images.mainCourse} style={{width:35,height:35,tintColor:'grey'}}/>
              <Text style={styles.h3}>Main Course</Text>
            </View>
            <View style={{width:50,height:'auto',display:'flex',justifyContent:'center',alignItems:'center',marginRight:10}}>
              <Image source={Images.dessert} style={{width:35,height:35,tintColor:'grey'}}/>
              <Text style={styles.h3}>Dessert</Text>
            </View>
            <View style={{width:50,height:'auto',display:'flex',justifyContent:'center',alignItems:'center',marginRight:10}}>
              <Image source={Images.apptizer} style={{width:35,height:35,tintColor:'grey'}}/>
              <Text style={styles.h3}>Apptizer</Text>
            </View>


            </View>
          </ScrollView>

        </View>

        {/* New Recipes */}
        <Slider recipes={homePageRecipes.latest} header={'New Recipes'} navigate={()=> navigation.navigate('NewRecipes')} navigation={navigation}/>
        
       {/* Recomendation Recipe */}
       <Slider recipes={recipes} header={'Recomendation Recipes'} navigate={()=> navigation.navigate('RecommendationRecipes')} navigation={navigation}/>



      </View>
      
    </ScrollView>}
    </>
  )
}

const HomeScreen = ({navigation}) => {
  return(
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="HomeNav"
        component={HomeScreenNav}
      />
      <HomeStack.Screen
        name="NewRecipes"
        component={NewRecipesScreen}
      />
      <HomeStack.Screen
        name="RecommendationRecipes"
        component={RecommendationRecipesScreen}
      />
      <HomeStack.Screen
        name="PopularRecipes"
        component={PopularRecipesScreen}
      />
    </HomeStack.Navigator>
  )
};
export default HomeScreen;