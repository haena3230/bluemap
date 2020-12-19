
// 지도
import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { RenderAfterNavermapsLoaded, NaverMap,Marker } from 'react-naver-maps'; // 패키지 불러오기
import axios from 'axios';

const URL = 'http://133.186.159.137:3000'

function NaverMapAPI(props) {
  const navermaps = window.naver.maps;
    
  return (
    
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '80%', // 네이버지도 가로 길이
        height: '85vh' // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: props.lat, lng: props.lon }} // 지도 초기 위치
      defaultZoom={14} // 지도 초기 확대 배율
    >
        
<Marker
            key={1}
            position={new navermaps.LatLng(37.273086724,127.049477554)}
            animation={2}
            onClick={() => {
              alert(props.data)
              console.log(props.data)
            }}
          />
           <Marker
            key={2}
            position={new navermaps.LatLng(37.265230685,127.032797001)}
            animation={2}
            onClick={() => {
              alert(props.data)
              console.log(props.data)
            }}
          />
           <Marker
            key={3}
            position={new navermaps.LatLng(37.274630751,127.043111707)}
            animation={2}
            onClick={() => {
              alert(props.data)
              console.log(props.data)
            }}
          />
           <Marker
            key={4}
            position={new navermaps.LatLng(37.274964685,127.044536519)}
            animation={2}
            onClick={() => {
              alert(props.data)
              console.log(props.data)
            }}
          />
          <Marker
            key={5}
            position={new navermaps.LatLng(37.280886063,127.047320079)}
            animation={2}
            onClick={() => {
              alert(props.data)
              console.log(props.data)
            }}
          />
          <Marker
            key={6}
            position={new navermaps.LatLng(37.259848509,127.023361181)}
            animation={2}
            onClick={() => {
              alert(props.data)
              console.log(props.data)
            }}
          />
          <Marker
            key={7}
            position={new navermaps.LatLng(37.25981886,127.022936654)}
            animation={2}
            onClick={() => {
              alert(props.data)
              console.log(props.data)
            }}
          />
        </NaverMap>
  );
}

const MapPage =()=>{
  const [lat,setLat]=useState('')
  const [lon,setLon]=useState('')
  const [load,setLoad]=useState(false);
  const[loadt,setLoadt]=useState(false);
  const [data,setData]=useState([])
  navigator.geolocation.getCurrentPosition(async(position)=> {
    await setLat(position.coords.latitude)
    await setLon(position.coords.longitude);
    setLoad(true);
  });
  try {
          axios.get(`${URL}/center/${lat}/${lon}`)
          .then((res)=>{
            setData(JSON.stringify(res.data))
            setLoadt(true)
          })
    }
    catch (error) {
        console.log(error);
    }
  useEffect(()=>{
    
  },[load,loadt])
      if('geolocation' in navigator) {
        return(
        <Container>
          <div className="box">
            <div className="class">
              <div className="title">이름 </div>
              <div className="subClass">
                  <div>정신 의료기관</div>
                  <div>강지윤</div>
              </div>
            </div>
            <div className="class">
              <div className="title">위치 </div>
              <div className="subClass">
                  <div>경기도</div>
                  <div>수원시 영통구</div>
              </div>
            </div>
             <div className="class">
              <div className="title">상세 위치 </div>
              <div className="subClass">
                  <div>경기도 수원시 영통구 봉영로1612</div>
                  <div>보보스프라자</div>
              </div>
            </div>
            <div className="class">
              <div className="title">번호</div>
              <div className="subClass">
                  <div>031-202-7925</div>
              </div>
            </div>

          </div>
          {load&&loadt?(
              <RenderAfterNavermapsLoaded
                    ncpClientId={'hh83zq7732'} // 자신의 네이버 계정에서 발급받은 Client ID
                    error={<p>Maps Load Error</p>}
                    loading={<p>Maps Loading...</p>}
                    >
                    <NaverMapAPI lat={lat} lon={lon} data={data}/>
                </RenderAfterNavermapsLoaded>
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