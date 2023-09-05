const initialState = {
  recipes: [],
  totalCount:null,
  recipe:{},
  myRecipes:[],
  isError:false,
  isLoading : false,
  showToast:false,
  toastMessage:{},
  latestRecipes:[],
  likedRecipes:[],
  bookmarkedRecipes:[]
};

export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'PENDING':
        // console.log('loading...')
        return {
            ...state,
            isLoading:true,
        };
      //get recipe by recipe id
      case 'GET_RECIPE_SUCCESS':
        return {
            ...state,
            recipe: action.payload,
            isLoading:false
        };
      case 'GET_RECIPE_FAILED':
        return {
          ...state,
          isError: true,
          isLoading:false
        }

      // get all recipes
      case 'GET_RECIPES_SUCCESS':
        return {
            ...state,
            recipes: action.payload.recipes,
            totalCount: action.payload.totalCount,
            isLoading:false

        };
      case 'GET_RECIPES_FAILED':
        return {
          ...state,
          isError: true,
          isLoading:false
        }

      // get recipes by user id
      case 'GET_RECIPES_BY_ID_SUCCESS':
        return {
            ...state,
            myRecipes: action.payload,
            isLoading:false
        };
      case 'GET_RECIPES_BY_ID_FAILED':
        return {
          ...state,
          myRecipes: [],
          isError: true,
          isLoading:false
        }

      // get latest recipes
      case 'GET_LATEST_RECIPES_SUCCESS':
        return {
            ...state,
            latestRecipes: action.payload,
            isLoading:false
        };
      case 'GET_LATEST_RECIPES_FAILED':
        return {
          ...state,
          latestRecipes: [],
          isError: true,
          isLoading:false
        }

      // post recipe
      case 'POST_RECIPE_SUCCESS':
        return {
            ...state,
            showToast:true,
            isLoading:false,
            toastMessage:{
              header:"Add Recipe Successfully",
              type:'success'
            }
        };
      case 'POST_RECIPE_FAILED':
        return {
          ...state,
          isError: true,
          isLoading:false,
          showToast:true,
          toastMessage:{
            header:'Add Recipe failed',
            type:'error'
          }
        }

      // put recipe
      case 'PUT_RECIPE_SUCCESS':
        return {
            ...state,
            showToast:true,
            toastMessage:{
              header:"Edit Recipe Successfully",
              type:'success'
            },
            isLoading:false

        };
      case 'PUT_RECIPE_FAILED':
        return {
          ...state,
          isError: true,
          showToast:true,
          toastMessage:{
            header:'Edit Recipe failed',
            type:'error'
          },
          isLoading:false
        }

      //delete recipe
      case 'DELETE_RECIPE_SUCCESS':
        return {
            ...state,
            showToast:true,
            toastMessage:{
              header:"Delete Recipe Successfully",
              type:'success'
            },
            isLoading:false
        };
      case 'DELETE_RECIPE_FAILED':
        return {
          ...state,
          isError: true,
          showToast:true,
          toastMessage:{
            header:'Delete Recipe failed',
            type:'error'
          },
          isLoading:false
        }

      case 'CLOSE_MODAL':
        return{
          ...state,
          showToast : false,
          isLoading:false
        }
      default:
        return state;

      // like
      case 'ADD_LIKE_SUCCESS':
        return {
            ...state,
            isLoading:false,
        };
      case 'ADD_LIKE_FAILED':
        return {
          ...state,
          isLoading:false
        }
      // get liked recipes
      case 'GET_LIKED_RECIPES_SUCCESS':
        return {
            ...state,
            likedRecipes: action.payload,
            isLoading:false
        };
      case 'GET_LIKED_RECIPES_FAILED':
        return {
          ...state,
          likedRecipes: [],
          isError: true,
          isLoading:false
        }

      // bookmark
      case 'ADD_BOOKMARK_SUCCESS':
        return {
            ...state,
            isLoading:false,
        };
      case 'ADD_BOOKMARK_FAILED':
        return {
          ...state,
          isLoading:false
        }  
      case 'REMOVE_BOOKMARK_SUCCESS':
        return {
            ...state,
            isLoading:false,
        };
      case 'REMOVE_BOOKMARK_FAILED':
        return {
          ...state,
          isLoading:false
        }  
      case 'GET_BOOKMARKED_RECIPES_SUCCESS':
        return {
            ...state,
            bookmarkedRecipes: action.payload,
            isLoading:false
        };
      case 'GET_BOOKMARKED_RECIPES_FAILED':
        return {
          ...state,
          bookmarkedRecipes: [],
          isError: true,
          isLoading:false
        }
  }
};

