// 기본 틀
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../Assets/logo.png'

const Pages = ()=>{
    return(
        <div>         
                {/* 상단 메뉴 */}
                <Container>
                    <Font>
                        <StyledLink to ="/">
                            <div  className="header">
                                우울증 자가진단 테스트
                            </div>
                        </StyledLink>
                    </Font>
                    <Font>
                        <StyledLink to ="/map">
                            <div className="header">
                                정신건강 증진센터 찾기
                            </div>
                        </StyledLink>
                    </Font>
                     <Font >
                         <StyledLink to ="/board">
                            <div className="header">
                                게시판
                            </div>
                        </StyledLink>
                    </Font>
                </Container>
                 <Title>
                    <StyledLink to ="/">BLUEMAP</StyledLink>
                    <img src={logo} width={50} heigth={50} alt=''/>
                </Title>
                
        </div>
    );
}


export const StyledLink = styled(Link)`
    text-decoration:none;
    color:black;
    &:focus, &:hover, &:visited, &link, &:active{
        text-decoration:none;
    }
`
const Title=styled.div`
    font-size:40px;
    font-weight:bold;
    margin-feft:40px;
    position:fixed;
    top:50px; 
    color:'#3f51b5';
    display:flex;
    flex-flow:row;
    justify-content:center;
`
const Font=styled.div`
    .header{
        ${(props)=>props.theme.b_font}
        
        padding:0.5vw;
        margin:0 3vw 0 3vw;
         &:hover{
            // transition:all 0.3s ease-in-out;
            border-radius: 20px;
            background:${(props)=>props.theme.blue_1};
            color:white;
            
         }
    }
`

const Container = styled.div`
    display:flex;
    position:fixed;
    top:0;
    width:100%;
    height:15vh;
    align-items: flex-end;
    justify-content:flex-end;
    box-shadow:1px 1px 1px gray;
    background-color:${(props)=>props.theme.gray_1};
    
`

export default Pages;