// 테스트 진행 페이지
import React,{useState,useEffect} from 'react';
import {BoxContainer} from '../index';
import {StyledLink} from '../../index';
import styled from 'styled-components';
import Modal from 'react-modal';



const CheckPage =()=>{
    const [des,setDes]=useState([]);

    // 페이지번호 세팅 
    const[currentPage,setCurrentPage]=useState(1);
    const[paginate,setPaginate]=useState(1);
    const ppp = 7;
    const indexOfLast = currentPage*ppp;
    const indexOfFirst = indexOfLast - ppp;
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
    // 답변 저장
    const [arr,setArr]=useState([]);
    function UpdateArr(index,val){
        let newArr=[...arr];
        newArr[index]=val;
        setArr(newArr);
    }
    
    // 확인모달
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }    
    function closeModal(){
        setIsOpen(false);
    }
    //점수
    const [score,setScore]=useState(0)
    useEffect(()=>{
        setDes(data);
        if(data.length!==0)
            setPaginate(Math.ceil(data.length/ppp));
    },[])


    return(
        <Container> 
            <BoxContainer>
                <div className="box">자기보고식(이용대상자 본인이 직접 작성)으로 너무 오래 생각하지 마시고 솔직하게응답해 주세요.</div>
                <div className="box">지난주부터 오늘까지 자신의 상태를 가장 잘 나타냈다고 생각되는 항목을 한 가지 골라 표시하세요.</div>
            </BoxContainer>
            
            <QuestionContainer>
                {currentPosts(des).map((des)=>{
                    return(
                        <Question key={des.id}>
                            <div className="num">{des.id}</div>
                            <div className="qList">
                                <div>1) {des.q1}</div>
                                <div>2) {des.q2}</div>
                                <div>3) {des.q3}</div>
                                <div>4) {des.q4}</div>
                            </div>
                            <form>
                                <div className="checkbox">
                                    <div className="check">
                                        <input type="radio" name ={des.id} value={0} onChange={(e)=>UpdateArr(des.id,e.target.value)}/>
                                    </div>
                                    <div className="check">
                                        <input type="radio" name ={des.id} value={1} onChange={(e)=>UpdateArr(des.id,e.target.value)} />
                                    </div>
                                    <div className="check">
                                        <input type="radio" name ={des.id} value={2} onChange={(e)=>UpdateArr(des.id,e.target.value)}/>
                                    </div>
                                    <div className="check">
                                        <input type="radio" name ={des.id} value={3} onChange={(e)=>UpdateArr(des.id,e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </Question>
                        
                    )
                })}
            </QuestionContainer>
            <PageNumber>
                <Button>
                    <button style={{ all:'unset'}} onClick={
                        ()=>{
                           if(currentPage!==1)                                    
                                setCurrentPage(currentPage-1);
                            else alert('첫번째 페이지 입니다.');
                        }
                    }>이전페이지</button>
                </Button>
                {[...Array(paginate)].map((n,index)=>{
                        return(
                            <div>
                                {currentPage===index+1?(
                                    <div className="numPicked">{index+1}</div>
                                ):(
                                        <div className="num" >{index+1}</div>
                                )} 
                            </div>
                            )                        
                })} 
                {currentPage===paginate?(
                    <div>
                        <Button>
                            <button style={{ all:'unset'}} onClick={
                                ()=>{
                                    let v=indexOfFirst;
                                    let array =[...arr];
                                    for(let j=indexOfFirst;j<indexOfLast;j++){
                                        if(array[j+1]===undefined){
                                            alert('모든 항목에 답변해야 합니다.');
                                            break;
                                        }
                                        else v=v+1;
                                    }
                                    if(v===indexOfLast){
                                        openModal();
                                        let calcArr=[...arr];
                                        let sum=0;
                                        let tmp;
                                        let tmp2;
                                        for(let k=1;k<=21;k++){
                                            tmp=calcArr[k]
                                            tmp2 = parseInt(tmp);
                                            sum=sum+tmp2
                                        }
                                        setScore(sum);

                                    }                            
                                    }}>점수확인하기</button>
                                    
                        </Button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                            >
                                <StyledLink to ={`/check/${score}`}>확인하러 가기 </StyledLink>   
                             
                        </Modal>
                    </div>
                    
                ):( 
                    <Button>
                    <button style={{ all:'unset'}} onClick={
                        ()=>{
                            let v=indexOfFirst;
                            let array =[...arr];
                            for(let j=indexOfFirst;j<indexOfLast;j++){
                                if(array[j+1]===undefined){
                                    alert('모든 항목에 답변해야 합니다.');
                                    break;
                                }
                                else v=v+1;
                            }
                            if(v===indexOfLast){
                                window.scrollTo(0,0);
                                setCurrentPage(currentPage+1);
                            }    
                        }
                    }>다음페이지</button>
                </Button>
                )}
            </PageNumber>
        </Container>
    )
}

const Container=styled.div`
    width:100%;
    height:85vh;
    position:absolute;
    bottom:0;
    display:flex;
    flex-flow:column;
    align-items:center;
`
const QuestionContainer=styled.div`
    display:flex;
    justify-content:flex-start;
    flex-flow:column;
    width:50vw;
`
const Question=styled.div`
    display:flex;
    flow-flex:row;
    align-items:center;
    padding:3%;
    margin:1%;
    width:100%;
    box-shadow:1px 1px 1px gray;
    border-radius:5vh;
    background-color:${(props)=>props.theme.gray_1};
    .num{
        display:flex;
        align-items:center;
        padding:2vh;
        height:2vh;
        width:2vh;
        background-color: ${(props)=>props.theme.blue_3};
        color:white;
        border-radius:2vh;
        font-size:20px;
        margin-right:3%;
    }
    .qList{
        display:flex;
        flex-flow:column;
        width:100%;
        justify-content:flex-start;
        margin: 2% 0 2% 0;
        ${(props)=>props.theme.b_font};
    }
    .checkbox{
        display:flex;
        flex-flow:column;
        justify-content:flex-end;
    }
    .check{
        padding:3%;
    }
`

const PageNumber=styled.div`
    display:flex;
    flex-flow:row;
    padding:10vh;
    align-items:center;
    .numPicked{
         ${(props)=>props.theme.b_font};
        color:white;
        background-color:#3f51b5;
        padding:1vh;
        margin:2px;
    }
    .num{
         ${(props)=>props.theme.b_font};
         padding:1vh;
         margin:2px;
    }
`

const Button =styled.div`
    all:unset;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:2vh;
    background-color:#3f51b5;
    border-radius: 20px;
    margin:5vh;
    font-weight:bold;
    font-size:20px;
    color:white;
    &:hover{
            transition:all 0.3s ease-in-out;
            border-radius: 20px;
            background:#3f5fff;
         }
`

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
export default CheckPage

const data=[
    {id:1,q1:"나는 슬픔을 느끼지 않는다.", q2:"나는 슬픔을 느낀다.",q3:"나는 항상 슬프고 기운을 낼 수 없다.",q4:"나는 너무나 슬프고 불행해서 도저히 견딜 수 없다."},
    {id:2,q1:"나는 앞날에 대해 별로 낙담하지 않는다.", q2:"나는 앞날에 대해 용기가 나지 않는다.",q3:"나는 항상 슬프고 기운을 낼 수 없다.",q4:"나는 앞날에 대해 기대할 것이 아무것도 없다고느낀다."},
    {id:3,q1:"나는 실패자라고 느끼지 않는다.", q2:"나는 다른 사람들보다 더 많이 실패했다고 느낀다.",q3:"나의 살아온 과거를 되돌아보면 실패투성이라고 느낀다.",q4:"나는 인간으로서 완전히 실패했다고 느낀다."},
    {id:4,q1:"나는 인간으로서 완전히 실패했다고 느낀다.", q2:"나의 일상생활은 전처럼 즐겁지 않다.",q3:" 나는 더 이상 어떤 것에도 만족을 별로 얻지 못한다.",q4:"나는 모든 것이 다 불만스럽고 싫증난다"},
    {id:5,q1:"나는 특별히 죄책감을 느끼지 않는다", q2:"나는 죄책감을 느낄 때가 많다.",q3:"나는 죄책감을 느낄 때가 아주 많다.",q4:" 나는 항상 죄책감에 시달린다."},
    {id:6,q1:"나는 벌을 받고 있다고 느끼지 않는다.", q2:"나는 어쩌면 벌을 받을지도 모른다고 느낀다.",q3:" 나는 벌을 받을 것 같다.",q4:"나는 지금 벌을 받고 있다고 느낀다. "},
    {id:7,q1:"나는 내 자신에게 실망하지 않는다. ", q2:"나는 내 자신에게 실망하고 있다. ",q3:"나는 내 자신에게 화가 난다.",q4:" 나는 내 자신을 증오한다."},
    {id:8,q1:"나는 내가 다른 사람보다 못하다고 느끼지 않는다.", q2:"나는 내 약점이나 실수에 대해 자신을 탓하는 편이다.",q3:"나는 내가 한 일이 잘못되었을 때 항상 자신을탓한다.",q4:"나는 주위에서 일어나는 모든 잘못된 일에 대해 자신을 탓한다."},
    {id:9,q1:"나는 자살 같은 것은 생각하지 않는다.", q2:"나는 자살할 생각을 가끔 하지만 실행하지는 않을 것이다.",q3:"나는 자살하고 싶은 생각이 자주 든다.",q4:"나는 기회가 있으면 자살하겠다."},
    {id:10,q1:"나는 전보다 더 울지는 않는다.", q2:"나는 전보다 더 많이 운다.",q3:"나는 요즘 항상 운다.",q4:"나는 전에는 울고 싶을 때 울 수 있었지만 요즘은 울래야 울 기력조차 없다."},
    {id:11,q1:"나는 전보다 더 짜증을 내지는 않는다.", q2:"나는 전보다 더 쉽게 짜증이 나고 귀찮아진다.",q3:"나는 요즘 항상 짜증이 난다.",q4:"전에는 짜증나던 일에 요즘은 너무 지쳐서 짜증조차 나지 않는다."},
    {id:12,q1:"나는 여전히 다른 사람들에게 관심을 가지고 있다.", q2:"나는 전보다 다른 사람들에게 관심이 줄었다.",q3:"나는 다른 사람들에게 관심이 거의 없어졌다.",q4:"나는 다른 사람들에게 관심이 완전히 없어졌다."},
    {id:13,q1:"나는 전과 다름없이 결정을 잘 내린다.", q2:"나는 전보다 결정을 못 내리고 미루는 때가 많다.",q3:"나는 전보다 결정을 내리는 데 큰 어려움을 느낀다.",q4:"나는 이제 아무 결정도 내릴 수 없다."},
    {id:14,q1:"나는 전보다 내 모습이 더 나빠졌다고 느끼지 않는다.", q2:"나는 나이들어 보이거나 매력없어 보일까봐 걱정한다.",q3:"나는 내가 매력이 없어졌다고 느낀다.",q4:"나는 내가 추해 보인다고 느낀다. "},
    {id:15,q1:"나는 전과 다름없이 일을 할 수 있다.", q2:"나는 어떤 일을 시작하는데 전보다 더 많은 노력이 든다.",q3:"나는 무슨 일이든 하려면 자신을 매우 심하게 채찍질해야만 한다.",q4:"나는 아무런 일도 할 수가 없다."},
    {id:16,q1:"나는 전과 다름없이 잠을 잘 잔다.", q2:"나는 전처럼 잠을 자지 못한다.",q3:"나는 전보다 한 두시간 일찍 깨며, 다시 잠들기어렵다.",q4:"나는 전보다 몇 시간 일찍 깨며, 한 번 깨면 다시 잠들 수가 없다. "},
    {id:17,q1:"나는 전보다 더 피곤하지 않다.", q2:"나는 전보다 더 쉽게 피곤해진다.",q3:"나는 무슨 일을 하든 곧 피곤해진다.",q4:"나는 너무나 피곤해서 아무 일도 할 수가 없다."},
    {id:18,q1:"내 식욕은 전과 다름없다.", q2:"내 식욕이 전보다 좋지 않다.",q3:"내 식욕이 전보다 매우 줄었다.",q4:"요즘에는 전혀 식욕이 없다. "},
    {id:19,q1:"나는 전보다 몸무게가 줄지 않았다.", q2:"나는 전보다 몸무게가 2Kg 가량 줄었다.",q3:"나는 전보다 몸무게가 5Kg 가량 줄었다.",q4:"나는 전보다 몸무게가 7Kg 가량 줄었다."},
    {id:20,q1:"나는 전보다 건강에 대해 더 염려하지는 않는다.", q2:"나는 통증, 소화불량, 변비 등의 신체적 문제로 걱정하고 있다.",q3:"나는 건강이 너무 걱정되어 다른 일을 생각하기 힘들다.",q4:"나는 건강이 너무 걱정되어 다른 일을 아무것도 생각할 수가 없다."},
    {id:21,q1:"나는 성에 대한 관심이 전과 다름없다고 느낀다.", q2:"나는 전보다 성에 대한 관심이 줄었다.",q3:"나는 전보다 성에 대한 관심이 상당히 줄었다.",q4:"나는 성에 대한 관심을 완전히 잃었다."},
]