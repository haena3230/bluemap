import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import {Button} from '../index'
import logo from '../../../Assets/logo.png';
import {StyledLink} from '../../index';


const ScorePage=({match})=>{
    const {score}=match.params;
    const[load,setLoad]=useState(false);
    const[state,setState]=useState('');
    
    useEffect(()=>{
        if(score>=0&&score<=9){
            setState('우울하지 않은 상태')
            setLoad(true)
        }
        else if(score>=10&&score<=15) {
            setState('가벼운 우울 상태')
            setLoad(true)
        }
        else if(score>=16&&score<=23) {
            setState('중한 우울 상태')
            setLoad(true)
        }
        else if(score>=24&&score<=63) {
            setState('심한 우울 상태')
            setLoad(true)
        }
    },[])
    return(
        <div>
        {load?(
            <Container>
                <div className="box">
                    <img src={logo} width={'50%'} heigth={'50%'} alt=''/>
                    <StyledLink to ="/board">
                        <Button>
                            이야기 나누러 가기
                        </Button>
                    </StyledLink>
                </div>
                <div className="box">
                    <div className="title">
                        우울증 점수
                    </div>
                    <div className="score">
                        {score} 점
                    </div>
                    <div className="des">
                        당신은 {state} 입니다!
                    </div>
                    <StyledLink to ="/map">
                        <Button>주변 정신 건강 증진 센터 찾기</Button>
                    </StyledLink>
                </div>
            </Container>
        ):(
            <div>로딩중..</div>
        )}
        </div>
    )
}
const Container =styled.div`
    width:100%;
    height:85vh;
    position:absolute;
    bottom:0;
    display:flex;
    flex-flow:row;
    .box{
        width:100%;
        height:100%;
        display:flex;
        flex-flow:column;
        justify-content:center;
        align-items:center;
    }
    .title{
        ${(props)=>props.theme.bb_font};
    }
    .score{
        font-weight:bold;
        font-size:50px;
        color:${(props)=>props.theme.blue_1};
        padding:10vh;   
    }
    .des{
        ${(props)=>props.theme.b_font};
    }
`


export default ScorePage;