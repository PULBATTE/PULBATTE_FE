import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import MoonLoader from 'react-spinners/MoonLoader';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
  Controller,
} from 'swiper';
import styled from 'styled-components';
import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import testImage from '../../assets/image/test_01.png';
import 'swiper/swiper.min.css';
import { testResultPath } from '../../apis/path';
import 'swiper/components/navigation/navigation.min.css';
import { authInstance } from '../../apis/axios';
import PlantSlide from '../../components/plantguide/PlantSlide';

export default function PlantTest() {
  SwiperCore.use([Navigation, Pagination]);
  const [swiper, setSwiper] = useState();
  const [loading, setLoading] = useState(true);
  let result = '';
  const navigate = useNavigate();
  const checkQuestionHandler = data => {
    console.log('ok');
    result += data;
    console.log(result);
    swiper.slideNext();
  };
  const lastOrderHandler = async () => {
    try {
      setTimeout(() => {
        authInstance
          .post(`/api/plantTest/${result}`)
          .then(res => {
            navigate(testResultPath);
            setLoading(false);
          })
          .catch(err => console.log(err));
      }, [1500]);
    } catch (e) {
      console.log(e);
    }
  };

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
          /*  onSwiper={setSwiper} */
        >
          <SwiperSlide>
            <PlantSlide
              title="Q. 반려동물을 키운다면 어떤 동물을 선택 하시겠습니까?"
              questionA="강아지"
              questionB="고양이"
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 약속시간에 자주 늦는 친구를 만나기로 했습니다. 당신은 언제
              나갈건가요?"
              questionA="그 친구가 늦건 말건 제 시간에 맞춰 나간다"
              questionB="늘 늦는 친구이므로 나도 늦게 간다"
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 아는 사람이 울고 있습니다. 당신의 행동은?"
              questionA="걱정이 되어 말을 건다"
              questionB="왜우는지 궁금해서 말을 건다"
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 괜찮은 정보나 재미있는 내용을 발견하면 메모하거나 스크랩해두는 편인가요?"
              questionA="그렇다"
              questionB="아니다"
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 당신은 계획을 세우면 꾸준히 지켜 나가는 편인가요?"
              questionA="그렇다"
              questionB="아니다"
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 당신은 한 가지 일을 할 때 쉽게 질리는 편인가요?"
              questionA="그렇다"
              questionB="아니다"
              checkQuestionHandler={checkQuestionHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlantSlide
              title="Q. 당신은 식물을 5가지 이상 키워봤나요?"
              questionA="그렇다"
              questionB="아니다"
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
  margin: 7rem 0 3rem;
  @media (max-width: 768px) {
    margin-top: 0;
  }
  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.8rem;
      margin-top: 45px;
    }
  }
  .guide_title_container {
    text-align: center;
  }
  .swiper_container {
    position: relative;
    max-width: 680px;
    width: 80%;

    overflow: hidden;
    margin: 0 auto;
    min-height: 60vh;
    box-sizing: border-box;
    border-radius: 16px;
    background: linear-gradient(154deg, #ebf1ec, #bbd4cd);
    padding: 4rem 5rem;
    box-sizing: border-box;

    pointer-events: none;
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
    }

    .swiper-container {
      height: 100%;
    }
    .slide_image_container {
      max-height: 300px;
      width: 100%;
      display: flex;
      justify-content: center;
      @media (max-width: 500px) {
        height: 180px;
      }
    }
    .slide_inner {
      display: flex;
      height: 100%;

      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 3rem 0;

      box-sizing: border-box;
      img {
        height: 100%;
      }
      .question_title {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 2.5rem;
        height: 50px;
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
