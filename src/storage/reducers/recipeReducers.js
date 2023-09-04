const initialState = {
  recipes: [],
  totalCount:null,
  recipe:{},
  myRecipes:[],
  isError:false,
  isLoading : false,
  showModal:false,
  modalMessage:{},
  latestRecipes:[],
  likedRecipes:[]
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
            showModal:true,
            isLoading:false,
            modalMessage:{
              header:"Add Recipe Successfully"
            }
        };
      case 'POST_RECIPE_FAILED':
        return {
          ...state,
          isError: true,
          isLoading:false,
          showModal:true,
          modalMessage:{
            header:'Add Recipe failed'
          }
        }

      // put recipe
      case 'PUT_RECIPE_SUCCESS':
        return {
            ...state,
            showModal:true,
            modalMessage:{
              header:"Edit Recipe Successfully"
            },
            isLoading:false

        };
      case 'PUT_RECIPE_FAILED':
        return {
          ...state,
          isError: true,
          showModal:true,
          modalMessage:{
            header:'Edit Recipe failed'
          },
          isLoading:false
        }

      //delete recipe
      case 'DELETE_RECIPE_SUCCESS':
        return {
            ...state,
            showModal:true,
            modalMessage:{
              header:"Delete Recipe Successfully"
            },
            isLoading:false
        };
      case 'DELETE_RECIPE_FAILED':
        return {
          ...state,
          isError: true,
          showModal:true,
          modalMessage:{
            header:'Delete Recipe failed'
          },
          isLoading:false
        }

      case 'CLOSE_MODAL':
        return{
          ...state,
          showModal : false,
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
  }
};

