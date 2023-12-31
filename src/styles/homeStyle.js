import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  searchField : {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:15,
    backgroundColor: '#efefef',
    borderRadius:10,
    height:45,
    paddingHorizontal:15,
    marginVertical:10,
    marginHorizontal:20
  },
  textInput : {
    fontFamily:'Poppins-Medium',
    fontSize:14,
    color:'#999',
    width:'100%'
  },

  h1: {
    fontFamily:'Poppins-Medium',
    fontSize:18,
    paddingHorizontal:20,
    paddingVertical:5
  },
  h2: {
    fontFamily:'Poppins-Medium',
    fontSize:14,
    color:'#eec302',
    paddingHorizontal:20,
    paddingVertical:5
  },
  h3: {
    fontFamily:'Poppins-Medium',
    fontSize:12,
    textAlign:'center'
  },
  cardPopular : {
    width:220,
    height:110,
    marginRight:10
  },
  imageCard : {
     flex: 1, 
     resizeMode: 'contain'
  },
  titleCard : {
    color: 'white', 
    fontFamily:'Poppins-Bold',
    fontSize:16,
    position: 'absolute', 
    bottom: 0, 
    left: 0 ,
    width:'50%',
    marginHorizontal:10,
    marginVertical:5
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    borderRadius: 10,
  },
  isActiveButton : { 
    backgroundColor:'#eec302',
    paddingHorizontal:15,
    paddingVertical:7,
    borderRadius:10,
    marginRight:5
  },
  isActiveTextButton : {
    fontFamily:'Poppins-Medium',
    color:'white',
    fontSize:12
  },
  disActiveButton : {
    backgroundColor:'#fff',
    paddingHorizontal:15,
    paddingVertical:7,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#eec302',
    marginRight:5
  },
  disActiveTextButton : {
    fontFamily:'Poppins-Medium',
    color:'#eec302',
    fontSize:12
  },
})