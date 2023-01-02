import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function MypageKakaoMap() {
  const root = useRef();
  const roadmapControl = useRef();
  const skyviewControl = useRef();
  const [locationObj, setLocationObj] = useState('');
  const { kakao } = window;
  console.log(locationObj);
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch('테헤란로44길 8', function (result, status) {
      console.log('result,', result);
      setLocationObj(result);
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 결과값으로 받은 위치를 마커로 표시합니다
        const options = {
          center: new kakao.maps.LatLng(coords.getLng(), coords.getLat()),
          level: 3,
        };
        const map = new kakao.maps.Map(root.current, options);
        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${result[0].road_address.address_name}</div>`,
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      }
    });

    // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
  };
  function setMapType(maptype) {
    const mapOption = {
      center: new kakao.maps.LatLng(locationObj[0].x, locationObj[0].y), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(root.current, mapOption);
    if (maptype === 'roadmap') {
      map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
      roadmapControl.className = 'selected_btn';
      skyviewControl.className = 'btn';
    } else {
      map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      skyviewControl.className = 'selected_btn';
      roadmapControl.className = 'btn';
    }
  }
  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomIn() {
    const mapOption = {
      center: new kakao.maps.LatLng(locationObj[0].x, locationObj[0].y), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(root.current, mapOption);
    map.setLevel(map.getLevel() - 1);
  }

  // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomOut() {
    const mapOption = {
      center: new kakao.maps.LatLng(locationObj[0].x, locationObj[0].y), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(root.current, mapOption);
    map.setLevel(map.getLevel() + 1);
  }
  return (
    <div
      style={{
        width: '100%',
        display: 'inline-block',
        marginLeft: '5px',
        marginRight: '5px',
      }}
    >
      <div id="map" ref={root} style={{ width: '99%', height: '500px' }}>
        {}
      </div>
    </div>
  );
}
