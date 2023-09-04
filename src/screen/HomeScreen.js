import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import { styles } from '../styles/homeStyle';
import { Images } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLatestRecipes } from '../storage/actions/recipeAction';
import { createStackNavigator } from '@react-navigation/stack';

import NewRecipesScreen from './NewRecipesScreen.js'
import Slider from '../components/Slider';
const HomeStack = createStackNavigator();

const HomeScreenNav = ({navigation}) => {
  
  const dispatch = useDispatch()
  const {latestRecipes} = useSelector((s)=>s.recipes)
  
  useEffect(()=> {
    dispatch(getLatestRecipes())
    // console.log('ini recipes',recipes)
  },[])
  
  // console.log(latestRecipes)

  return (
    <ScrollView style={{backgroundColor:"#fff"}}>
      <View style={styles.searchField}>
        <Image source={Images.search} style={{width:20,height:20}}/>
        <TextInput placeholder='Search recipes in here' maxLength={40} style={styles.textInput} onPressIn={()=> navigation.navigate('Search')} />
      </View>

      <View>
        {/* Popular Recipe */}
        <View style={{marginBottom:20}}>
          <Text style={styles.h1}>Popular Recipes</Text>
          {/* <Text style={styles.h3}>Popular check</Text> */}
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} > 
            <View style={{ display:'flex',flexDirection: 'row',paddingHorizontal:20}}>
              
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>

            </View>
          </ScrollView>
        </View>

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
        <Slider recipes={latestRecipes} header={'New Recipes'} navigate={()=> navigation.navigate('NewRecipes')} navigation={navigation}/>

        {/* Most Liked */}
        <View style={{marginBottom:20}}>
          <Text style={styles.h1}>Most Liked Recipes</Text>
          {/* <Text style={styles.h3}>Popular check</Text> */}
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} > 
            <View style={{ flexDirection: 'row',paddingHorizontal:20,gap:10}}>
              
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
              <View style={styles.cardPopular}>
                <ImageBackground source={Images.burger} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>Sandwich With Egg</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>

            </View>
          </ScrollView>
        </View>
      </View>
      
    </ScrollView>
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
    </HomeStack.Navigator>
  )
};
export default HomeScreen;