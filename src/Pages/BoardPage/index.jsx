// 게시판
import React,{useState,useEffect} from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import {Button} from '../MainPage'
import {StyledLink} from '../index';

import {useDispatch} from 'react-redux'
import {userIdAction} from '../../Store/actions';
export const URL ='http://133.186.159.137:3000';

const BoardPage =()=>{

    const dispatch = useDispatch()
    const axios = require('axios')
    const [value, setValue] = useState('');
    // 확인모달
    const [modalIsOpen,setIsOpen] = React.useState(false);
       
    function closeModal(){
        setIsOpen(false);
    }
    
    return(
        <Container>
                <div className="info">
                    게시판에서 사용할 닉네임 등록이 필요합니다!
                </div>
                <div>
                    <input className="input" type ="text" placeholder ="사용할 닉네임을 입력하세요" onChange ={
                        function onChange(event) {
                            setValue(event.target.value);}
                    } size={50} />
                </div>
                <Button>
                    <button style={{all:'unset'}} onClick={
                        function openModal() {
                            if(value==='') alert('닉네임을 입력해 주세요');
                            else setIsOpen(true);
                        } 
                    }>
                     등록하고 시작하기
                    </button>
                </Button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                        
                    <div>'{value}' 로 시작하시겠습니까? </div>
                    <ModalButton onClick={
                        async function onClickModal() {
                            try {
                                const response = await axios.post(`${URL}/user`,{
                                    name:value,
                                });
                                await dispatch(userIdAction(response.data.name,response.data.id))
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    }>
                        <StyledLink to ={`/board/page`}>
                            <div style={{color:'white'}}>
                                Yes
                            </div>
                         </StyledLink> 
                    </ModalButton>                        
                </Modal>
    
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
    .input{
        width:100%;
        padding:2%;
        border:5px solid gray;
        border-radius:10vw;
        ${(props)=>props.theme.m_font}
    }
    .info{
        ${(props)=>props.theme.b_font}
        padding:10vh;
    }
    
`
const ModalButton=styled.div`
    all:unset;
    padding:1vh;
    ${(props)=>props.theme.b_font};
    background-color:${(props)=>props.theme.blue_3};
    color:white;
    border-radius:10px;
    &:hover{
        transition:all 0.3s ease-in-out;
        background:${(props)=>props.theme.blue_1};
        }
`

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin:10,
    transform: 'translate(-50%, -50%)',
    display:'flex',
    flexFlow:'row',
    fontSize:20,
    fontWeight:'bold',
    alignItems:'center',
  }
};

export default BoardPage;