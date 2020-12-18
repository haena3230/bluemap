// 액션
export const USER_ID = 'USER_ID'
export const POST_ID = 'POST_ID'

export const userIdAction= (text,data)=>{
    return{
        type:USER_ID,
        userId:text, 
        dataId:data,       
    }
}

export const postIdAction= (text)=>{
    return{
        type:POST_ID,
        postId:text,  
    }
}
  
  