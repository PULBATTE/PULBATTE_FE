import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function MypageKakaoMap() {
  const root = useRef();
  const adress = useRef();
  const [locationObj, setLocationObj] = useState('');
  const { kakao } = window;
  console.log(locationObj);
  useEffect(() => {
    mapscript();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=대구광역시 용산동`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        const location = res.data.documents[0];
        setLocationObj({
          si: location.address.region_1depth_name,
          gu: location.address.region_2depth_name,
          dong: location.address.region_3depth_name,
          locationX: location.address.x,
          locationY: location.address.y,
        });
      });
  }, []);

  const mapscript = () => {
    const options = {
      center: new kakao.maps.LatLng(35.8565964722084, 128.531153884197),
      level: 5,
    };

    const map = new kakao.maps.Map(root.current, options);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 마커를 생성
    const marker = new kakao.maps.Marker({
      position: options.center,
    });
    // 클릭한 위치를 표시할 마커입니다
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr =
            result[0].road_address == true
              ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
              : '';
          detailAddr += `<div>지번 주소 : ${result[0].address.address_name} </div>`;

          const content = `<div class="bAddr"> <span class="title">법정동 주소정보</span>
            ${detailAddr} 
            </div>`;

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        /*    var infoDiv = document.getElementById('centerAddr'); */

        for (let i = 0; i < result.length; i += 1) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            adress.current.value = result[i].address_name;
            break;
          }
        }
      }
    }
  };

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
      <div className="hAddr">
        <span className="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr" ref={adress}>
          {}
        </span>
      </div>
    </div>
  );
}
