import React, { useEffect } from "react"
import { View,Text, Image } from "react-native";
import { Images } from "../../assets/images";


function SplashScreen({ navigation }) {
  useEffect(() => {

    const timeout = setTimeout(() => {
      navigation.replace('Main');
    }, 3000); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
      <Image source={Images.logo} style={{width:100,height:100,marginBottom:5}}/>
      <Text style={{fontSize:22,fontFamily:'Poppins-ExtraBold',color:'#eec302'}}>Mama Recipe</Text>
    </View>
  );
}

export default SplashScreen;
