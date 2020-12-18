// 리듀서
import {USER_ID,POST_ID} from '../actions'

const initState={
    userId:null,
    dataId:null,
    postId:null,
}

export const loginReducers = (state=initState,action)=>{
    switch(action.type){
         case USER_ID:
            return {
                ...state,
                userId:action.userId,
                dataId:action.dataId,
            }
        case POST_ID:
            return {
                ...state,
                postId:action.postId,
            } 
    
        default:
            return state; 
    }
}


