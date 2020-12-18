
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
        width: '100%', // 네이버지도 가로 길이
        height: '85vh' // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: props.lat, lng: props.lon }} // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
    >
          <Marker
            key={1}
            position={new navermaps.LatLng(props.lat, props.lon)}
            animation={2}
            onClick={() => {alert(props.data)}}
          />
    </NaverMap>
  );
}

const MapPage =()=>{
  const [lat,setLat]=useState('')
  const [lon,setLon]=useState('')
  const [load,setLoad]=useState(false);
  const [data,setData]=useState([])
  navigator.geolocation.getCurrentPosition(async(position)=> {
    await setLat(position.coords.latitude)
    await setLon(position.coords.longitude);
    setLoad(true);
  });
  useEffect(()=>{
    try {
          axios.get(`${URL}/center/${lat}/${lon}`)
          .then((res)=>{
            setData(res.data)
            alert(res.data.status)
          })
    }
    catch (error) {
        console.log(error);
    }
  },[load])
      if('geolocation' in navigator) {
        return(
        <Container>
          {load?(
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
    .button{
        height:10vh;
        display:flex;
        justify-content:center;
        align-items:center;
        border:2px solid ${(props)=>props.theme.gray_2};
        ${(props)=>props.theme.b_font};
        &:hover{
            background:${(props)=>props.theme.blue_1};
            color:white;
         }
    }
`

export default MapPage;