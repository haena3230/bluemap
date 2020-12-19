
// 지도
import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { RenderAfterNavermapsLoaded, NaverMap,Marker } from 'react-naver-maps'; // 패키지 불러오기
import axios from 'axios';

const URL = 'http://133.186.159.137:3000'

function NaverMapAPI(props) {
  
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={'hh83zq7732'} 
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"map"} 
        style={{
          width: '80%',
          height: '100vh'
        }}
        defaultCenter={{ lat: props.lat, lng: props.lon }} // 지도 초기 위치
        defaultZoom={14}
      >
        {props.data!==null?(
          props.data.map((res)=>{
              return(
                  <Marker
                      key={res.id}
                      position={{ lat: res.latitude, lng: res.longitude }}
                      animation={2}
                      onClick={() => {
                        props.setOne(res.specification);
                        props.setTwo(res.agencyName)
                        props.setThree(res.county)
                        props.setFour(res.city)
                        props.setFive(res.address)
                        props.setSix(res.specificAddress)
                        props.setSeven(res.phone)
                        props.setEight(res.homepage)
                      }}
                    />
              )
            })
        ):(
          null
        )}
        
                
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
}

const MapPage =()=>{
  const [lat,setLat]=useState('')
  const [lon,setLon]=useState('')
  const [load,setLoad]=useState(false);
  const[loadt,setLoadt]=useState(false);
  const [data,setData]=useState([])
  function map(){
     navigator.geolocation.getCurrentPosition(async(position)=> {
        await setLat(position.coords.latitude)
        await setLon(position.coords.longitude);
        setLoad(true);
      });
      try {
              axios.get(`${URL}/center/${lat}/${lon}`)
              .then((res)=>{
                setData(res.data)
                setLoadt(true)
              })
        }
        catch (error) {
            console.log(error);
        }
  }
  const[one,setOne]=useState('');
  const[two,setTwo]=useState('');
  const[three,setThree]=useState('');
  const[four,setFour]=useState('');
  const[five,setFive]=useState('');
  const[six,setSix]=useState('');
  const[seven,setSeven]=useState('');
  const[eight,setEight]=useState('');
  useEffect(()=>{
     map()
  },[load,loadt])
      if('geolocation' in navigator) {
        return(
        <Container>
          <div className="box">
            <div className="class">
              <div className="title">이름 </div>
              <div className="subClass">
                  <div>{one}</div>
                  <div>{two}</div>
              </div>
            </div>
            <div className="class">
              <div className="title">위치 </div>
              <div className="subClass">
                  <div>{three}</div>
                  <div>{four}</div>
              </div>
            </div>
             <div className="class">
              <div className="title">상세 위치 </div>
              <div className="subClass">
                  <div>{five}</div>
                  <div>{six}</div>
              </div>
            </div>
            <div className="class">
              <div className="title">번호</div>
              <div className="subClass">
                  <div>{seven}</div>
              </div>
            </div>
            <div className="class">
              <div className="title">홈페이지</div>
              <div className="subClass">
                  <div>{eight}</div>
              </div>
            </div>

          </div>
          {load&&loadt?(
               <NaverMapAPI lat={lat} lon={lon} data={data} 
                setOne={setOne} setTwo={setTwo} setThree={setThree} setFour={setFour}
                setFive={setFive} setSix={setSix} setSeven={setSeven} setEight={setEight}/>
                
          ):(
            <h2>로딩중...</h2>
          )}
        </Container>
    )

    } else {
      return(
        <Container>
            <h2>위치 불러오기 실패</h2>
        </Container>
    )
    }
     
}

const Container = styled.div`
    width:100%;
    height:85vh;
    position:absolute;
    bottom:0;
    display:flex;
    flex-flow:row;
    .box{
        width:20%;
        height:100%;
        background:${(props)=>props.theme.gray_1};
        display:flex;
        flex-flow:column;
    }
    .class{
      display:flex;
      flex-flow:column;
      ${(props)=>props.theme.b_font};
    }
    .subClass{
      height:10vh;
      justify-content:center;
      align-items:center;
      border:2px solid ${(props)=>props.theme.gray_2};
      ${(props)=>props.theme.b_font};
    }
    .title{
      background:${(props)=>props.theme.blue_2};
      color:white;
      padding:0.5vw;
    }
`

export default MapPage;