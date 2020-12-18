import React from 'react';
import styled from 'styled-components'
import {StyledLink} from '../index'

const MainPage=()=>{
    return(
    <Container>

        <BoxContainer>
            <div className="box">자기보고식(이용대상자 본인이 직접 작성)으로 너무 오래 생각하지 마시고 솔직하게응답해 주세요.</div>
            <div className="box">지난주부터 오늘까지 자신의 상태를 가장 잘 나타냈다고 생각되는 항목을 한 가지 골라 표시하세요.</div>
        </BoxContainer>
              
        <StyledLink to ="/check">
            <Button>
                <div>자가진단 테스트 시작하기</div>
            </Button>
        </StyledLink>
        
        <Card>
            <div className="font">인지치료의 전문가인 아론 벡이 제안한, 우울증상의 유무와 증상의 심각성 정도를 평가하는 자기보고형 척도입니다. </div>
            <div className="font">증상의 정도를 표현하는 구체적인 진술문에 응답함으로써 자신의 심리상태를 수량화하는데서 겪는 혼란을 줄일 수 있습니다. </div>
            <div className="font">1961년 개발된 이래 전 세계적으로 널리 사용되고 있습니다.</div>
            <div className="font">우울증의 인지적, 정서적, 동기적, 신체적 증상 영역을 포함하는 21문항으로 이루어져 있습니다. </div>
            <div className="font">각 문항은 네 개의 문장으로 되어 있습니다.</div>
        </Card>
    </Container>
    )
}


export const Container=styled.div`
    width:100%;
    height:85vh;
    position:absolute;
    bottom:0;
    display:flex;
    flex-flow:column;
    align-items:center;
    .font{
        ${(props)=>props.theme.m_font}
    }
`
export const BoxContainer=styled.div`
    width:100%;
    height:30vh;
    background-color:${(props)=>props.theme.blue_2};
    display:flex;
    justify-content:space-around;
    align-items:center;
    flex-flow:row;
    padding:10vh 0 10vh 0;
    .box{
        width:30%;
        border: 4px dashed ${(props)=>props.theme.blue_3};
        border-radius:10px;
        padding:5vh;
        ${(props)=>props.theme.b_font}
    }
`
const Card=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-flow:column;
    padding:5vh 0 5vh 0;

`
export const Button =styled.div`
    all:unset;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:3vh;
    background-color:${(props)=>props.theme.blue_3};
    border-radius: 20px;
    margin:5vh;
    font-weight:bold;
    font-size:30px;
    color:white;
    &:hover{
            transition:all 0.3s ease-in-out;
            border-radius: 20px;
            background:${(props)=>props.theme.blue_1};
         }
`

export default MainPage;