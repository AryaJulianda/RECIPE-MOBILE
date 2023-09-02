import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { recipeReducer } from "./recipeReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipeReducer
})

export default rootReducer;