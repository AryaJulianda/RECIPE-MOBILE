const initialState = {
  user: {},
  accessToken: null,
  refreshToken:null,
  isLoading:false,
  isError:false,
  error:null,
  showModal:false,
  modalMessage:{}
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING' || 'REGIST_PENDING':
      console.log('loading...')
      return {
        ...state,isLoading:true
      }
    case 'LOGIN_SUCCESS':
      console.log(action)
      return {
        ...state,
        user: action.payload.user,
        accessToken : action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isLoading:false
      }
    case 'LOGIN_FAILED':
      // console.log(error,'ini error')
      return {
        ...state,
        error:action.error.message,
        isError:true,
        showModal:true,
        modalMessage:action.error.message,
        isLoading:false
      }
    case 'REGIST_SUCCESS':
      console.log(action)
      return {
        ...state,
        user: action.payload.user,
        accessToken : action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        showModal:true,
        modalMessage:action.modalMessage,
        isLoading:false
      }
    case 'REGIST_FAILED':
      // console.log(action.modalMessage,action.error)
      return {
        ...state,error:action.error,isError:true,user:null,isLoading:false,
        showModal: true,modalMessage:action.modalMessage,
      }
    case 'ACTIVATION_SUCCESS':
      return {
        ...state,showModal:true,modalMessage: action.modalMessage,
        isLoading:false
      }
      case 'PENDING':
      console.log('loading...')
      return {
        ...state,isLoading:true
      }
    case 'UPDATE_USER_SUCCESS':
      // console.log(action.payload)
      console.log('update success')
      return {
        ...state,
        user: action.payload,
        isLoading:false
      }
    case 'UPDATE_USER_FAILED':
      // console.log(action.error)
      return {
        ...state,
        error:action.error,
        isError:true,
        showModal:true,
        modalMessage:action.modalMessage,
        isLoading:false
      }
    case 'CLOSE_MODAL':
      return {
        ...state,showModal: false,
      } 
    case "DELETE_TOKEN":
        return{
            ...state,
            user:null,
            isLoading:false,
            isError:false,
            accessToken:null
        }
    default :
      return state;
  }
}