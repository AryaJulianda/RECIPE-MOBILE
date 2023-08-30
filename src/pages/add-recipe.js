import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View,Text, PermissionsAndroid, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'react-native-image-picker'
import { useSelector } from 'react-redux'

const base_url = 'https://fair-cyan-leopard-wrap.cyclic.app/';


export default function AddRecipe({navigation}) {
    const login = useSelector((state)=>state.login)
    const [photo,setPhoto] = useState(null)
    const [postResponse,setPostResponse] = useState(null)

    useEffect(()=>{
        console.log("res upload recipe ",postResponse)
        postResponse && navigation.navigate("Home")
    },[postResponse])

    let headers = {
        headers: {
            "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${login.data.token}`
        }
    }

    const uploadRecipe = async () => {
        let formData = new FormData()

        formData.append("title", "ketoprak")
        formData.append("ingredients", "lontong, toge, sambal kacang")
        formData.append("category_id", 1)
        formData.append("photo", {uri:photo.uri,name:photo.fileName,type:photo.type})

        let result = await axios.post(base_url+`recipe`,formData,headers)

        console.log(result)
        result.data && setPostResponse(result.data)
    }

    const requestPermission = async ()=> {
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, {
                    title: "App Camera Permission",
                    message: "App needs Camera Access",
                    buttonPositive:"OK",
                    buttonNegative:"cancel"
                }
            )
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                console.log("access camera success")
                cameraLaunch()

            } else{
                console.log("access camera failed")
                console.log(PermissionsAndroid.RESULTS.GRANTED)
            }
        }catch(err){
            console.log("error")
            console.log(err)
        }
    }
    const cameraLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup:true,
                path:"images"
            }
        }
        ImagePicker.launchCamera(options,(res)=>{
            console.log("response camera ", res)
            if(res.didCancel){
                console.log("user cancel camera picker")
            } else if(res.error){
                console.log("camera picker error ",res.errorMessage)
            } else{
                console.log(res)
                setPhoto(res.assets[0])
            }
        })
    }

    const galleryLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup:true,
                path:"images"
            }
        }
        ImagePicker.launchImageLibrary(options,(res)=>{
            if(res.didCancel){
                console.log("user cancel camera picker")
            } else if(res.error){
                console.log("camera picker error ",res.errorMessage)
            } else{
                console.log(res)
                setPhoto(res.assets[0])
            }
        })
    }

  return (
    <View>
    <Text>add-recipe</Text>
    <TouchableOpacity onPress={()=>requestPermission()}>
        <Text>Take Foto</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>galleryLaunch()}>
        <Text>Gallery Foto</Text>
    </TouchableOpacity>
    {photo && 
    <Image resizeMode='cover' style={{height:200,width:200}} source={{uri:photo.uri}} />
    }

    <TouchableOpacity style={photo ? {"backgroundColor":"blue"} : {"backgroundColor":"red"}} onPress={photo ? ()=>uploadRecipe() : null}>
        <Text>Upload Recipe</Text>
    </TouchableOpacity>
    </View>
  )
}
