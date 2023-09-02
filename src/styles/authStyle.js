import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container : {
    backgroundColor: "#fff",
    textAlign:"center",
    height:"100%",
    paddingHorizontal:'7%',
    fontFamily: 'Poppins-Regular',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  hero: {
    width:'100%',
    height: 200
  },
  h1 : {
    color:'#EFC81A',
    fontSize: 20,
    textAlign:'center',
    fontFamily: 'Poppins-Medium'
  },
  h2 : {
    fontSize:16,
    fontFamily:'Poppins-Medium',
    textAlign:'center',
    color:'#C4C4C4',
    marginBottom:10
  },
  input : {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:15,
    backgroundColor: '#F5F5F5',
    borderRadius:10,
    width:'100%',
    paddingHorizontal:15,
    marginTop:15,
    borderWidth:1,
    borderColor:'#fff'
  },
  inputFocused : {
    borderColor:'#EFC81A'
  },
  textInput : {
    fontFamily:'Poppins-Medium',
    fontSize:14,
    color:'#999',
    width:'75%',
  },
  forget: {
    alignSelf:'flex-end',
    fontFamily:'Poppins-Medium',
    fontSize:14,
    color: '#999',
    marginTop:15
  },
  buttonStyle: {
    width:'100%',
    backgroundColor:'#EFC81A',
    fontSize:16,
    paddingVertical:8,
    borderRadius:20,
    marginTop:15
  },
  textButton : {
    color:'white',
    fontFamily:'Poppins-Medium',
    fontSize:16,
    textAlign:'center'
  },
  singUp : {
    color:'#999',
    fontFamily:'Poppins-Medium',
    fontSize:14,
    marginTop:10
  }
})
