import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity, Image, ImageBackground,ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import { styles } from '../styles/homeStyle';

const Slider = ({recipes,header,navigate,navigation}) => {
  return (
    <View style={{marginBottom:20}}>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text style={styles.h1}>{header}</Text>
        <TouchableOpacity  onPress={navigate}><Text style={styles.h2}>See More</Text></TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} > 
        <View style={{ flexDirection: 'row',paddingHorizontal:20,gap:10}}>
          
          {recipes?.map((recipe)=> {
            return (
            <TouchableOpacity onPress={(()=>navigation.navigate('Detail',{recipeId : recipe.recipe_id}))} key={recipe.recipe_id}>
              <View style={styles.cardPopular}>
                <ImageBackground source={{uri:recipe.img}} style={styles.imageCard} imageStyle={{ borderRadius: 10 }}>
                  <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.5)']}style={styles.gradient}>
                    <Text style={styles.titleCard}>{recipe.title}</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            )
          })}

        </View>
      </ScrollView>
    </View>
  )
};

export default Slider;
