/* eslint-disable react/jsx-props-no-spreading */
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPlantsInfo, postSelectPlant } from '../../apis/plantGuide';
import { guidePath } from '../../apis/path';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { palette } from '../../styles/palette';
import PlantEnviroment from '../../components/plantguide/PlantEnviroment';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';
import useModal from '../../hooks/useModal';
import ConfirmModal from '../../components/plantguide/ConfirmModal';

export default function PlantChoice() {
  const [plantInfo, setPlantInfo] = useState(null);
  const plantName = useRef();
  const navigate = useNavigate();
  const [modal, onChangeModalHandler] = useModal();

  // 모달창 > 확인버튼
  const onSubmitHandler = () => {
    postSelectPlant(plantName.current)
      .then(res => navigate(`/api/beginner/plant/my`))
      .catch(error => console.log(error));
  };
  // 식물선택 했을 때
  const checkPlantHandler = name => {
    plantName.current = name;
    onChangeModalHandler();
  };
  // 모달창 닫을때
  const closeModal = () => {
    onChangeModalHandler();
  };
  // 렌더링될때 식물 중복된 값있는지 판단
  getAllPlantsInfo()
    .then(res => {
      console.log(res);
      res
        .map(data => {
          if (data.overlap) {
            alert('선택된 식물이 있습니다. 가이드 페이지로 이동합니다.');
            navigate(guidePath);
          }
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));

  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    getAllPlantsInfo()
      .then(res => {
        console.log(res);
        setPlantInfo(res);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <StWrapper>
      {plantInfo && (
        <>
          <ConfirmModal
            modal={modal}
            onSubmitHandler={onSubmitHandler}
            closeModal={closeModal}
          />
          <div className="guide_title_container">
            <h2>식집사 가이드 식물 선택하기</h2>
            <span>
              풀밭에가 제공하는 가이드를 따라 초보 식물 키우기에 도전해보세요
            </span>
          </div>
          <div>
            <StSwiper
              className="example"
              slidesOffsetBefore={0}
              slidesOffsetAfter={0}
              spaceBetween={40}
              slidesPerView={4}
              initialSlide={1}
              navigation
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                300: {
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: false,
                },
                500: {
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                  slidesPerView: 1.5,
                  spaceBetween: 30,
                  centeredSlides: false,
                },
                650: {
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                  slidesPerView: 2,
                  spaceBetween: 30,
                  centeredSlides: false,
                },
                900: {
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                  slidesPerView: 2.5,
                  spaceBetween: 40,
                  centeredSlides: false,
                },
                1280: {
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                  slidesPerView: 3,
                  spaceBetween: 50,
                  centeredSlides: false,
                },
                1650: {
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                  slidesPerView: 4,
                  spaceBetween: 50,
                  centeredSlides: false,
                },
              }}
            >
              {plantInfo &&
                plantInfo.map(data => {
                  return (
                    <SwiperSlide
                      key={data.beginnerPlantName}
                      onClick={() => checkPlantHandler(data.beginnerPlantName)}
                    >
                      <div className="plant_img_container">
                        <img className="plant_image" src={data.image} alt="" />
                        {data.like ? <span>풀밭에 추천</span> : ''}
                      </div>
                      <div className="plant_content_container">
                        <h3>{data.beginnerPlantName}</h3>
                        <StGridInner>
                          <PlantEnviroment
                            src={shineIcon}
                            checkPoint={data.sunshine}
                            name="sunny"
                          />
                          <PlantEnviroment
                            src={waterIcon}
                            checkPoint={data.water}
                            name="water"
                          />
                          <PlantEnviroment
                            src={airIcon}
                            checkPoint={data.ventilation}
                            name="air"
                          />
                        </StGridInner>
                        <StTip>
                          {data.tipList.map(item => {
                            return (
                              <div className="item_list" key={item}>
                                <span>∙</span>
                                <span>{item}</span>
                              </div>
                            );
                          })}
                        </StTip>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </StSwiper>
          </div>
        </>
      )}
    </StWrapper>
  );
}

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px 0;
  width: 100%;
  height: 100vh;
  z-index: 6;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  justify-content: center;
  .choice_modal {
    height: 230px;
  }
  @media (max-width: 500px) {
    gap: 0;
  }
  .guide_title_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    span {
      font-size: 1.2rem;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
    h2 {
      font-size: 2rem;
      font-weight: 800;
      @media (max-width: 500px) {
        font-size: 1.5rem;
      }
    }
  }
  .plant_img_container {
    position: relative;
    min-height: fit-content;
    overflow: hidden;
    span {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 6px 10px;
      background: #fff;
      border-radius: 6px;
      color: ${palette.mainColor};
      font-weight: 700;
      font-size: 0.9rem;
      box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
    }
  }
  .plant_content_container {
    height: 36vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (max-width: 500px) {
      gap: 0;
    }
    > div {
      order: 1;
      padding: 10px;
    }
    .plant_env {
      display: block;
      text-align: center;
      .circle {
        width: 9px;
        height: 9px;
        @media (max-width: 500px) {
          width: 11px;
          height: 11px;
        }
      }
      img {
        width: calc(10px + 2vw);
        @media (max-width: 500px) {
          width: 30px;
        }
      }
    }
  }
`;

const StSwiper = styled(Swiper)`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px 0;
  padding: 10px;
  @media (max-width: 1280px) {
    width: 70%;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
  .swiper-pagination {
    display: flex;
    justify-content: center;
    gap: 0 10px;
    @media (max-width: 500px) {
      gap: 0 5px;
    }
    .swiper-pagination-bullet {
      width: 11px;
      height: 11px;
      display: block;
      border-radius: 50%;
      background: ${palette.borderColor2};
      @media (max-width: 500px) {
        width: 9px;
        height: 9px;
      }
    }
    .swiper-pagination-bullet-active {
      background: ${palette.borderCOlor3};
    }
  }
  .plant_image {
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 200px;
    object-fit: cover;
  }
  .swiper-slide {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.23);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 7px 3px rgba(35, 146, 112, 0.4);
      transition: all 0.3s ease-in-out;
    }
    > div {
    }
    h3 {
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }

  .swiper-wrapper {
    height: fit-content;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 4px 1px rgb(0 0 0 / 20%);
    &::after {
      font-size: 1.1rem;
      font-weight: 600;
      color: black;
    }
  }
  .swiper-button-next {
    right: 2px;
  }
  .swiper-button-prev {
    left: 2px;
  }
`;
const StGridInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  gap: 0 15px;
  @media (max-width: 768px) {
    padding: 40px 0px;
    order: 2;
  }
`;
const StTip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  padding: 10px;
  .item_list {
    display: flex;
    span {
      font-size: 0.8rem;
      @media (max-width: 500px) {
        font-size: 0.9rem;
      }
    }
  }
`;
