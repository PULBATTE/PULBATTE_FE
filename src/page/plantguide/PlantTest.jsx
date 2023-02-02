import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useCallback, useState, useRef } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';
import testImg00 from '../../assets/image/guide_test_00.png';
import testImg01 from '../../assets/image/guide_test_01.png';
import testImg02 from '../../assets/image/guide_test_02.png';
import testImg03 from '../../assets/image/guide_test_03.png';
import testImg04 from '../../assets/image/guide_test_04.png';
import testImg05 from '../../assets/image/guide_test_05.png';
import testImg06 from '../../assets/image/guide_test_06.png';
import testImg07 from '../../assets/image/guide_test_07.png';
import { palette } from '../../styles/palette';
import 'swiper/swiper.min.css';
import pgBack from '../../assets/image/pg_back.png';
import { testResultPath } from '../../apis/path';
import 'swiper/components/navigation/navigation.min.css';
import { authInstance } from '../../apis/axios';
import PlantSlide from '../../components/plantguide/PlantSlide';

export default function PlantTest() {
  SwiperCore.use([Navigation, Pagination]);
  const [swiper, setSwiper] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const answer = useRef('');

  const preventOverClick = useDebounce(() => setIsChecked(false), 1000);

  const navigate = useNavigate();
  const checkQuestionHandler = data => {
    if (isChecked) return;
    setIsChecked(true);
    preventOverClick();
    answer.current += data;
    swiper.slideNext();
  };

  const lastOrderHandler = useCallback(async () => {
    try {
      setTimeout(() => {
        authInstance
          .post(`/api/plantTest/${answer.current}`)
          .then(res => {
            navigate(testResultPath);
            setLoading(false);
          })
          .catch(err => console.log(err));
      }, [1700]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <StWrapper>
      <div className="guide_title_container">
        <h3>식집사 테스트</h3>
      </div>
      <div className="swiper_container">
        <Swiper
          modules={[Thumbs, Pagination]}
          touchRatio={0}
          spaceBetween={100}
          speed={500}
          onInit={ev => {
            setSwiper(ev);
          }}
          onReachEnd={() => {
            console.log('end');
            lastOrderHandler();
          }}
          watchSlidesProgress
        >
          <SwiperSlide>
            <div className="slide_inner">
              <div>
                <img src={testImg00} alt="가이드 테스트 이미지" />
              </div>
              <div className="btn_wrapper">
                <h4>식집사 테스트</h4>
                <span>
                  내 성향을 알아보고, 나에게 맞는 식물을 추천 받아보세요 :)
                </span>
                <button type="button" onClick={() => swiper.slideNext()}>
                  START!
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 반려동물을 키운다면 어떤 동물을 선택 하시겠습니까?"
              questionA="강아지"
              questionB="고양이"
              image={testImg01}
              checkQuestionHandler={checkQuestionHandler}
              isChecked={isChecked}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 약속시간에 자주 늦는 친구를 만나기로 했습니다. 당신은 언제
              나갈건가요?"
              questionA="그 친구가 늦건 말건 제 시간에 맞춰 나간다"
              questionB="늘 늦는 친구이므로 나도 늦게 간다"
              image={testImg02}
              checkQuestionHandler={checkQuestionHandler}
              isChecked={isChecked}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 아는 사람이 울고 있습니다. 당신의 행동은?"
              questionA="걱정이 되어 말을 건다"
              questionB="왜우는지 궁금해서 말을 건다"
              image={testImg03}
              checkQuestionHandler={checkQuestionHandler}
              isChecked={isChecked}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 괜찮은 정보나 재미있는 내용을 발견하면 메모하거나 스크랩해두는 편인가요?"
              questionA="그렇다"
              questionB="아니다"
              image={testImg04}
              checkQuestionHandler={checkQuestionHandler}
              isChecked={isChecked}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 당신은 계획을 세우면 꾸준히 지켜 나가는 편인가요?"
              questionA="그렇다"
              questionB="아니다"
              image={testImg05}
              checkQuestionHandler={checkQuestionHandler}
              isChecked={isChecked}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 당신은 한 가지 일을 할 때 쉽게 질리는 편인가요?"
              questionA="그렇다"
              questionB="아니다"
              image={testImg06}
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 당신은 식물을 5가지 이상 키워봤나요?"
              questionA="그렇다"
              questionB="아니다"
              image={testImg07}
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide_inner">
              <h4>분석중</h4>
              <MoonLoader
                color="rgba(13, 82, 68, 1)"
                loading={loading}
                size={110}
                speedMultiplier={1}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  padding: 4rem 0 2rem;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-image: url(${pgBack});
  background-size: cover;
  .swiper-slide-active,
  .swiper-slide-prev,
  .swiper-slide-next {
    pointer-events: none;
  }
  @media (max-width: 768px) {
    margin-top: 0;
    height: auto;
    background: #fff;
  }
  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin: 5rem 0 4rem;
    color: ${palette.textColor1};
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin: 2rem 0;
    }
  }
  .guide_title_container {
    text-align: center;
  }
  .swiper_container {
    position: relative;
    max-width: 600px;
    width: 80%;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 0 auto;
    min-height: 60vh;
    box-sizing: border-box;
    border-radius: 16px;
    background: #fff;
    padding: 4rem 5rem;
    box-sizing: border-box;
    pointer-events: none;
    .swiper-slide {
      height: auto;
    }
    @media (max-width: 768px) {
      padding: 3rem;
    }
    @media (max-width: 500px) {
      padding: 2rem;
      width: 90%;
    }
    h4 {
      font-size: 1.7rem;
      font-weight: 800;
      color: #009688;
      @media (max-width: 768px) {
        font-size: 1.4rem;
      }
      @media (max-width: 500px) {
        font-size: 1.2rem;
      }
    }
    .swiper-container {
      height: 100%;
    }
    .slide_image_container {
      max-height: 300px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    img {
      @media (max-width: 500px) {
        max-width: 100px;
        object-fit: contain;
      }
    }
    .slide_inner {
      display: flex;
      height: 100%;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-align-items: center;
      gap: 20px 0;
      .btn_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px 0;
        padding-top: 45px;
        h4 {
          margin: 0;
        }
        span {
          font-size: 1.2rem;
          @media (max-width: 500px) {
            font-size: 1rem;
          }
        }
        button {
          width: 100%;
          border-radius: 16px;
          border: none;
          font-size: 30px;
          font-weight: 800;
          color: #fff;
          line-height: 55px;
          margin-top: 20px;
          background: ${palette.mainColor};
          cursor: pointer;
          pointer-events: fill;
          @media (max-width: 500px) {
            font-size: 1.2rem;
            line-height: 45px;
          }
        }
      }
      .question_title {
        font-weight: 800;
        font-size: 1.4rem;
        font-weight: 700;
        line-height: 2.2rem;
        min-height: 90px;
        letter-spacing: 0.4px;
        width: 90%;
        text-align: center;
        word-break: keep-all;
        @media (max-width: 768px) {
          font-size: 1.4rem;
          line-height: 2rem;
        }
        @media (max-width: 500px) {
          font-size: 1.2rem;
          line-height: 1.8rem;
        }
      }
    }
  }
`;
