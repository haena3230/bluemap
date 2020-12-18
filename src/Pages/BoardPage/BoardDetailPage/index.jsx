// 작성하기

import React, { useEffect,useState} from 'react';
import styled from 'styled-components';
import {StyledLink} from '../../index';
import { useSelector} from 'react-redux';
import {URL} from '../index'

const BoardDetailPage =({match})=>{
    // postId
    let {postId} =match.params;
    // 상태관리
    const[load,setLoad]=useState(false)
    const axios= require('axios')
    //userID
    // const userId = useSelector((state)=>state.login.userId)
    const userId = '30'
   
    // post 정보 가져오기
    const [postData,setPostData]=useState([])
    const[comment,setComment]=useState([])
    
    async function getPost(){
        const axios=require('axios');
        try {
            const response = await axios.get(`${URL}/post/${postId}/${userId}`);
            setPostData(response.data)
            setLoad(true)
        }
        catch (error) {
            console.log(error);
        }
    }
    async function getComment(){
        const axios=require('axios');
        try {
            const response_2 = await axios.get(`${URL}/post/${postId}/comment/${userId}`);
            setComment(response_2.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    // 댓글 작성하기
    const [reqComment, setReqComment] = useState('');
    
     useEffect(()=>{
        getPost()
        getComment()
    },[load])
    
    return(
        load?(
            <Container>
                <div className="box">
                    <div className="title">
                        <div>
                            {postData.title}
                        </div>
                        <StyledLink to ="/board/page/">
                            <Button>돌아가기</Button>
                        </StyledLink>
                    </div>
                    <div className="content">{postData.content}</div>
                    <div className="bottom">
                        <div className="bottomInfo">
                            <div className="font">닉네임 {postData.name}</div>
                            <div className="font">조회수 {postData.viewCount}</div>
                            <div className="font">공감수 {postData.likeCount}</div>
                            <div className="font">댓글수 {postData.commentCount}</div>
                        </div>
                        <button style={{all:'unset'}} onClick={
                            async function postLike(){
                                    const axios=require('axios')
                                    try {
                                        await axios.patch(`${URL}/post/like/${postId}/${userId}`);
                                        setLoad(false);
                                        setLoad(true);
                                    }
                                    catch (error) {
                                        console.log(error);
                                        
                                    }
                                }
                        }>
                            {postData.like===0?(
                                <div className="like">공감하기</div>
                            ):(
                                <div className="like">취소하기</div>
                            )}
                            
                        </button>
                    </div>
                    {comment.map((data)=>{
                        return(
                            <CommentStyle key = {data.id}>
                                <div className="test">
                                    <div className="fron">
                                        <div>
                                            {data.name}
                                        </div>
                                        <div>
                                            {data.comment}
                                        </div>
                                    </div>
                                     <div className="tail">
                                    {data.like===0?(
                                        <div className="like">공감하기</div>
                                    ):(
                                        <div className="like">취소하기</div>
                                    )}
                                    </div>
                                </div>
                                <div className="date">
                                    공감수 {data.likeCount} / {data.createdAt}
                                </div>
                            </CommentStyle>
                        )
                    })}
                    <ReqComment>
                            <input className="input" type ="text" placeholder ="댓글을 입력하세요." onChange ={
                                function store(event){
                                    setReqComment(event.target.value);
                                }
                            } />
                            <button style={{all:'unset'}} onClick={
                                async function postComment(){
                                    const axios=require('axios')
                                    try {
                                        const response = await axios.post(`${URL}/post/${postId}/comment`,{
                                            userId:userId,
                                            comment:reqComment,
                                        });
                                        setComment(response.data)
                                        window.scrollTo(0,0);
                                        alert('성공')
                                    }
                                    catch (error) {
                                        alert('실패')
                                    }
                                }
                            }>
                                <Button>작성하기</Button>
                            </button>
                        
                    </ReqComment>
                </div>
            </Container>
        ):(
            <Container>
                <div>로딩중...</div>
            </Container>
        )
        
    )
}

const Container=styled.div`
    width:100%;
    height:100%;
    position:relative;
    top:15vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${(props)=>props.theme.gray_1};
    .box{
        display:flex;
        align-items:center;
        justify-content:center;
        flex-flow:column;
    }
    .title{
        margin:1%;
        width:100%;
        padding:1%;
        ${(props)=>props.theme.b_font}
        border:1px solid ${(props)=>props.theme.gray_2};
        display:flex;
        flex-flow:row;
        justify-content:space-between;
        align-items:center;
        background-color:white;
        border-radius:1vw;
    }
    
    .content{
         ${(props)=>props.theme.m_font};
         padding:1%;
         margin:1%;
         width:100%;
         background-color:white;
         border:1px solid ${(props)=>props.theme.gray_2};
         border-radius:1vw;
         min-height:30vh;
    }
    .bottom{
        width:100%;
        background-color:${(props)=>props.theme.gray_2};
        display:flex;
        flex-flow:row;
        justify-content:space-between;
        align-items:center;
        border-radius:5px;
    }
    .bottomInfo{
        display:flex;
        flex-flow:row;
    }
    .font{
        ${(props)=>props.theme.s_font}
        color:white;
        background-color:${(props)=>props.theme.blue_2};
        border-radius:5px;
        display:flex;
        flex-flow:row;
        padding:5px;
        justify-content:center;
        align-items:center;
        margin:5px;
    }
    .like{
        ${(props)=>props.theme.s_font}
        color:white;
        background-color:${(props)=>props.theme.blue_3};
        border-radius:5px;
        display:flex;
        padding:5px;
        justify-content:center;
        align-items:center;
        margin:5px;
        &:hover{
            transition:all 0.3s ease-in-out;
            background:${(props)=>props.theme.blue_1};
         }
    }
   
`
const Button=styled.div`
        background-color:${(props)=>props.theme.blue_3};
        border-radius:5px;
        color:white;
        padding:10px;
        &:hover{
            transition:all 0.3s ease-in-out;
            background:${(props)=>props.theme.blue_1};
         }
    
`
const CommentStyle=styled.div`
    width:100%;
    padding:1%;
    display:flex;
    flex-flow:column;
    justify-content:space-between;
    ${(props)=>props.theme.s_font}
    background-color:${(props)=>props.theme.gray_1};
    border-bottom:solid ${(props)=>props.theme.gray_2};
    .date{
        display:flex;
        justify-content:flex-end;
    }
    .fron{
        display:flex;
        flex-flow:column;
    }
    .tail{

    }
    .test{
        display:flex;
        flex-flow:row;
        justify-content:space-between;
    }
`
const ReqComment=styled.div`
    width:100%;
    display:flex;
    flex-flow:row;
    justify-content:space-between;
    padding:10vh;
    .input{
        width:65vw;
        padding:2%;
        border:2px solid gray;
        border-radius:1vw;
        ${(props)=>props.theme.m_font}
    }
`

export default BoardDetailPage;