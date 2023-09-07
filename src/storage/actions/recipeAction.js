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

export const getAllRecipes = (query = '', page = 1, limit,searchBy) => {
    return async(dispatch) => {
      const url = query ? `${serverUrl}/recipe/search?search_by=${searchBy}&key=${query}&page=${page}&limit=${limit}` : `${serverUrl}/recipe?page=${page}&limit=${limit}`;
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
          dispatch({type:'GET_RECIPES_BY_ID_FAILED',error:err})
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

// CRUD RECIPES
export const postRecipe = (inputData,token,navigation,renderToast) => {
  return async(dispatch) => {
    try {
      dispatch({type:'PENDING'})
      const res = await axios.post(`${serverUrl}/recipe`, inputData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }})
      await dispatch({type:'POST_RECIPE_SUCCESS',payload:res.data})
      renderToast('success','Add Recipe Successfull')
      navigation.navigate('Profile')
    } catch (error) {
      dispatch({type:'POST_RECIPE_FAILED',error:error})
      renderToast('error','Add Recipe Failed')
    }
  }
}

export const updateRecipe = (recipeId,inputData,token,navigation,renderToast) => {
  return async(dispatch) => {
    
    try {
      dispatch({type:'PENDING'})
      const res = await axios.put(`${serverUrl}/recipe/` + recipeId, inputData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }})
      await dispatch({type:'PUT_RECIPE_SUCCESS',payload:res.data})
      renderToast('success','Edit Recipe Successfull')
      navigation.navigate('MyRecipe')
    } catch (error) {
      dispatch({type:'PUT_RECIPE_FAILED',error:error})
      renderToast('error','Edit Recipe Failed')
    }
  }
}

export const deleteRecipe = (recipeId,token,renderToast) => {
  return async(dispatch) => {
    try {
      dispatch({type:'PENDING'})
      const res = await axios.delete(`${serverUrl}/recipe/${recipeId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }})
      await dispatch({type:'DELETE_RECIPE_SUCCESS',payload:res.data})
      renderToast('success','Delete Recipe Successfull')
    } catch (error) {
      dispatch({type:'DELETE_RECIPE_FAILED',error:error})
      renderToast('error','Delete Recipe Failed')
    }
  }
}

// LIKES
export const addLike = (recipeId,token) => {
  return async(dispatch) => {
    console.log(recipeId,token,'ni')
    try {
      // dispatch({type:'PENDING'})
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

// BOOKMARK
export const addBookmark = (recipeId,token) => {
  return async(dispatch) => {
    // console.log(recipeId,token,'ni')
    try {
      // dispatch({type:'PENDING'})
      const res = await axios.post(`${serverUrl}/recipe/bookmark/${recipeId}`,{},{
        headers:{
          Authorization:`Bearer ${token}`
        }})
      dispatch({type:'ADD_BOOKMARK_SUCCESS',payload:res.data})
    } catch (error) {
      dispatch({type:'ADD_BOOKMARK_FAILED',error:error})
    }
  }
}

export const removeBookmark = (recipeId,token) => {
  return async(dispatch) => {
    // console.log(recipeId,token,'ni')
    try {
      // dispatch({type:'PENDING'})
      const res = await axios.delete(`${serverUrl}/recipe/bookmark/${recipeId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }})
      dispatch({type:'REMOVE_BOOKMARK_SUCCESS',payload:res.data})
    } catch (error) {
      dispatch({type:'REMOVE_BOOKMARK_FAILED',error:error})
    }
  }
}

export const getBookmarkedRecipes = (token) => {
  return async(dispatch) => {
      try {
        dispatch({type:'PENDING'})
        const res = await axios.get(`${serverUrl}/recipe/bookmarks/get`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        dispatch({type:'GET_BOOKMARKED_RECIPES_SUCCESS',payload:res.data.data});
      }catch(err){
        dispatch({type:'GET_BOOKMARKED_RECIPES_FAILED',error:err})
      }
  };
};