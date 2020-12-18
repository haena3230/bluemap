// 게시판 작성하기
// 게시판
import React,{useState} from 'react'
import styled from 'styled-components'
import {Button} from '../../MainPage'
import {StyledLink} from '../../index';
import {URL} from '../index'

const BoardWritePage =()=>{
    // 글 작성하기
    const [title,setTitle]=useState('')
    const [content, setContent] = useState('');
    
    // const userId = useSelector((state)=>state.login.userId)
    const userId = '30'
    return(
        <Container>
            <div className="title">
                <input className="input" type ="text" placeholder ="제목을 작성하세요." size={40} onChange ={
                    function ChangeTitle(event){
                        setTitle(event.target.value)
                    }
                } />
            </div>
            <div className="content">
                <textarea className="input" name="Text1" cols="60" rows="10" onChange={
                    function ChangeContent(event){
                        setContent(event.target.value)
                    }
                }></textarea>
            </div>
            {content===''||title===''?(
                <button style={{all:'unset'}} onClick={
                    async function postPost(){
                            alert('제목과 내용을 모두 입력해야 합니다.');
                    }}>
                    <Button>
                        등록하기  
                    </Button>
                </button>
            ):(
                <button style={{all:'unset'}} onClick={
                async function postPost(){
                    if(content!==''&&title!==''){
                        const axios=require('axios')
                            try {
                                await axios.post(`${URL}/post`,{
                                    userId:userId,
                                    title:title,
                                    content:content,
                                });
                                alert('성공')
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    }
            }>
                <StyledLink to ="/board/page">
                    <Button>
                        등록하기  
                    </Button>
                </StyledLink>
            </button>
            )}
        </Container>
    )
}

const Container = styled.div`
    width:100%;
    height:85vh;
    position:absolute;
    bottom:0;
    display:flex;
    flex-flow:column;
    align-items:center;
    justify-content:center;
    .title{
        width:80%;
        margin:10px;
        
    }
    .content{
        width:80%;
        height:40%;
    }
    .input{
        width:100%;
        padding:2%;
        border:5px solid gray;
        border-radius:2vw;
        ${(props)=>props.theme.m_font}
    }
`

export default BoardWritePage;
