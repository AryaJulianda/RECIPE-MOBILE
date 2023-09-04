import axios from 'axios';
import { useSelector } from 'react-redux';

const serverUrl = 'https://creepy-pocket-yak.cyclic.app';


export const getRecipeById = (recipeId) => {
    return async(dispatch) => {
        const url =`${serverUrl}/recipe/`+ recipeId
        try {
          dispatch({type:'PENDING'})
          const res = await axios.get(url);
          dispatch({type:'GET_RECIPE_SUCCESS',payload:res.data});
        }catch(err){
          dispatch({type:'GET_RECIPE_FAILED',error:err})
        }
    };
};

export const getAllRecipes = (query = '', page = 1, limit) => {
    return async(dispatch) => {
      const url = query ? `${serverUrl}/recipe/search?search_by=title&key=${query}&page=${page}&limit=${limit}` : `${serverUrl}/recipe?page=${page}&limit=${limit}`;
        try {
          dispatch({type:'PENDING'})
          const res = await axios.get(url);
          dispatch({type:'GET_RECIPES_SUCCESS',payload:res.data});
        }catch(err){
          dispatch({type:'GET_RECIPES_FAILED',error:err})
        }
    };
};

export const getAllRecipesById = () => {
    return async(dispatch,useSelector) => {
        const {auth} = useSelector((state)=> state)
        const user_id = auth.user.user_id;
        try {
          dispatch({type:'PENDING'})
          const res = await axios.get(`${serverUrl}/recipe/my_recipe/` + user_id)
          dispatch({type:'GET_RECIPES_BY_ID_SUCCESS',payload:res.data});
        }catch(err){
          dispatch({type:'GET_RECIPES_BY_ID_FAILED',error:err.message})
        }
    };
};

export const getLatestRecipes = () => {
    return async(dispatch) => {
        try {
          dispatch({type:'PENDING'})
          const res = await axios.get(`${serverUrl}/recipe/latest/get`)
          dispatch({type:'GET_LATEST_RECIPES_SUCCESS',payload:res.data.data});
        }catch(err){
          dispatch({type:'GET_LATEST_RECIPES_FAILED',error:err.message})
        }
    };
};

export const postRecipe = (inputData,token,navigation) => {
  return async(dispatch) => {
    try {
      dispatch({type:'PENDING'})
      const res = await axios.post(`${serverUrl}/recipe`, inputData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }})
      dispatch({type:'POST_RECIPE_SUCCESS',payload:res.data})
      navigation.navigate('Profile')
    } catch (error) {
      dispatch({type:'POST_RECIPE_FAILED',error:error.message})
    }
  }
}

export const updateRecipe = (recipeId,inputData,token,navigation) => {
  return async(dispatch) => {
    
    try {
      dispatch({type:'PENDING'})
      const res = await axios.put(`${serverUrl}/recipe/` + recipeId, inputData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }})
      dispatch({type:'PUT_RECIPE_SUCCESS',payload:res.data})
      navigation.navigate('MyRecipe')
    } catch (error) {
      dispatch({type:'PUT_RECIPE_FAILED',error:error.message})
    }
  }
}

export const deleteRecipe = (recipeId,token) => {
  return async(dispatch) => {
    console.log(recipeId,token,'ni')
    try {
      dispatch({type:'PENDING'})
      const res = await axios.delete(`${serverUrl}/recipe/${recipeId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }})
      dispatch({type:'DELETE_RECIPE_SUCCESS',payload:res.data})
    } catch (error) {
      dispatch({type:'DELETE_RECIPE_FAILED',error:error})
    }
  }
}

export const addLike = (recipeId,token) => {
  return async(dispatch) => {
    console.log(recipeId,token,'ni')
    try {
      dispatch({type:'PENDING'})
      const res = await axios.post(`${serverUrl}/recipe/like/${recipeId}`,{},{
        headers:{
          Authorization:`Bearer ${token}`
        }})
      dispatch({type:'ADD_LIKE_SUCCESS',payload:res.data})
    } catch (error) {
      dispatch({type:'ADD_LIKE_FAILED',error:error})
    }
  }
}

export const getLikedRecipes = (token) => {
  return async(dispatch,useSelector) => {
    // const token = useSelector((s)=>s.auth.accessToken)
    // console.log(token)
      try {
        dispatch({type:'PENDING'})
        const res = await axios.get(`${serverUrl}/recipe/liked/get`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        dispatch({type:'GET_LIKED_RECIPES_SUCCESS',payload:res.data.data});
      }catch(err){
        dispatch({type:'GET_LIKED_RECIPES_FAILED',error:err})
      }
  };
};