// 게시판 내부
// 게시판
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {Button} from '../../MainPage'
import {StyledLink} from '../../index';
// import {useSelector} from 'react-redux'
import {postIdAction} from '../../../Store/actions';
import {URL} from '../index'
import {useDispatch, useSelector } from 'react-redux';


const BoardInPage =()=>{
    const dispatch=useDispatch()
    // const userId=useSelector((state)=>state.login.dataId)
    const userId='30'
    // const userNickname=useSelector((state)=>state.login.userId)
    const userNickname='양해나'
    const [load,setLoad] = useState(false);
    
    async function getPost() {
        const axios=require('axios');
        try {
            const response = await axios.get(`${URL}/post/${userId}`);
            setPostData(response.data)
            setLoad(true);
        }
        catch (error) {
            console.log(error);
        }
    }
    const [postData,setPostData]=useState([])
    useEffect(()=>{
        getPost()
    },[load])
    return(
        <Container>
            <div className="box">
                <div className="user">내 닉네임 : {userNickname}</div>
                {postData.map((data)=>{
                    return(
                        <List>
                            <button style={{all:'unset'}} onClick={
                                    dispatch(postIdAction(data.id))
                                }>
                            <StyledLink to ={`/board/page/${data.id}`}>
                                <div className="fontTitle">
                                        {data.title}
                                </div>
                                <div className="info">
                                            <div>
                                                {data.createdAt} |
                                            </div>
                                            <div>
                                                | 조회 {data.viewCount} |
                                            </div>
                                            <div>
                                                | 공감 {data.likeCount}
                                            </div>
                                                                
                                </div>
                            </StyledLink>
                            </button>
                        </List>
                    )
                })}
            </div>
            <StyledLink to ="/board/write">
                <div className="writeBtn">
                    작성하기
                </div>
            </StyledLink>
        </Container>
    )
}

const Container = styled.div`
    width:100%;
    height:100vh;
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
        width:80%;
        
    }
    .user{
        ${(props)=>props.theme.m_font};
        width:100%;
        display:flex;
        justify-content:flex-start;
        padding:1%;
    }
    .writeBtn{
        width:7vw;
        position:fixed;
        top:18vh;
        right:10vw;
        background-color:${(props)=>props.theme.blue_3};
        color:white;
        padding:5px;
        border-radius:5px;
        display:flex;
        justify-content:center;
    }
`

const List= styled.div`
    border-bottom:solid ${(props)=>props.theme.gray_2};
    padding:1%;
    margin:0.5%;
    width:100%;
    display:flex;
    
    flex-flow:column;
    background-color: white;
    border-radius:1vh;
    .fontTitle{
        ${(props)=>props.theme.m_font};
    }
    .info{
        display:flex;
        flex-flow:row;
        justify-content:flex-end;
    }
    .fontInfo{
        ${(props)=>props.theme.s_font};
    }
`

export default BoardInPage;
