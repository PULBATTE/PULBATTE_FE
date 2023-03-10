/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { SlArrowRight } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { searchPath, boardPath, testPath, diaryPath } from '../../apis/path';
import mainImage from '../../assets/image/main.png';
import MainImage2 from '../../assets/image/main_02.png';
import MainImage3 from '../../assets/image/main_03.png';
import MainImage4 from '../../assets/image/main_04.png';
import MainImage5 from '../../assets/image/main_05.png';
import PrivateRoute from '../../routes/PrivateRoute';
import { palette } from '../../styles/palette';
import pgBack from '../../assets/image/pg_back.png';

export default function Home() {
  const navigate = useNavigate();
  return (
    <StWrapper>
      <div className="main_banner">
        <div className="banner_inner">
          <StBannerContainer>
            <StTitle className="main_subtitle">
              <span>식물 추천과 관리를 한 곳에서,</span>
              <span>모든 식집사들을 위한 공간</span>
            </StTitle>
            <h3>풀밭에</h3>
          </StBannerContainer>
          <div className="main_img_container">
            <StMainImage src={mainImage} alt="" />
          </div>
        </div>
        <StArrowDown />
      </div>
      <StBannerList>
        <StBannerInner>
          <StBannerContainer>
            <StTitle>
              <span>내 성향에 맞는 식물</span>
              <span>키우기 도전!</span>
            </StTitle>
            <div className="subtitle_container">
              <div className="subtitle">
                <span>테스트로 내 성향에 맞는 식물을 알아보고,</span>
                <span>성장 그래프를 따라 초보자용 식물을 키워보세요.</span>
              </div>
              <button type="button" onClick={() => PrivateRoute(testPath)}>
                식집사 테스트 해보기
                <StArrowRight />
              </button>
            </div>
          </StBannerContainer>
          <StMainImage src={MainImage4} alt="" />
        </StBannerInner>
      </StBannerList>

      <StBannerList className="background_accent">
        <StBannerInner>
          <StBannerContainer className="order-02">
            <StTitle>
              <span>내가 원하는 식물을</span>
              <span>간편하게 검색</span>
            </StTitle>
            <div className="subtitle_container">
              <div className="subtitle">
                <span>식물의 특징을 필터링해서 검색할 수 있어요.</span>
                <span>식집사에게 필요한 식물 정보를 제공해 줍니다.</span>
              </div>
              <button type="button" onClick={() => navigate(searchPath)}>
                식물 검색 해보기 <StArrowRight />
              </button>
            </div>
          </StBannerContainer>
          <StMainImage src={MainImage2} alt="" />
        </StBannerInner>
      </StBannerList>
      <StBannerList>
        <StBannerInner>
          <StBannerContainer>
            <StTitle>
              <span>언제 줬더라?</span>
              <span>물주기, 분갈이를</span>
              <span>알림으로</span>
            </StTitle>
            <div className="subtitle_container">
              <div className="subtitle">
                <span>
                  궁금한 점을 물어보거나 내가 키운 식물을 자랑해보세요.
                </span>
                <span>식집사 이웃들과 다양한 정보를 공유할 수 있습니다.</span>
              </div>
              <button type="button" onClick={() => PrivateRoute(diaryPath)}>
                식물 등록하고 알림 받기
                <StArrowRight />
              </button>
            </div>
          </StBannerContainer>
          <StMainImage src={MainImage5} alt="" />
        </StBannerInner>
      </StBannerList>
      <StBannerList className="background_accent">
        <StBannerInner>
          <StBannerContainer className="order-02">
            <StTitle>
              <span>질문하기, 식물자랑</span>
              <span>식집사들과 소통해요 </span>
            </StTitle>
            <div className="subtitle_container">
              <div className="subtitle">
                <span>
                  궁금한 점을 물어보거나 내가 키운 식물을 자랑해보세요.
                </span>
                <span>식집사 이웃들과 다양한 정보를 공유할 수 있습니다.</span>
              </div>
              <button type="button" onClick={() => navigate(boardPath)}>
                커뮤니티 구경가기 <StArrowRight />
              </button>
            </div>
          </StBannerContainer>
          <StMainImage src={MainImage3} alt="" />
        </StBannerInner>
      </StBannerList>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  .main_banner {
    position: relative;
    height: 56vw;
    padding: 2rem;
    box-sizing: border-box;
    background: url(${pgBack}) no-repeat;
    background-size: cover;

    @media (max-width: 768px) {
      padding: 3rem 2rem 2rem;
      height: 100vh;
      .banner_inner {
        > div {
          align-items: flex-start;
        }
      }
    }
    h3 {
      font-size: calc(15px + 2vw);
      margin: 0;
      color: ${palette.mainColor};
      @media (max-width: 768px) {
        font-size: 38px;
        justify-content: space-evenly;
      }
      @media (max-width: 500px) {
        font-size: 38px;
      }
    }
    .banner_inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1350px;
      position: relative;
      top: 45%;
      transform: translateY(-40%);
      width: 80%;
      margin: 0 auto;
      .main_subtitle {
        align-items: flex-start;
      }
      @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        padding-top: 2rem;
        justify-content: center;
        flex-direction: column;
      }
      > div {
        @media (max-width: 768px) {
          width: 100%;
        }
      }
      span {
        @media (max-width: 768px) {
          font-size: calc(16px + 1vw);
          font-weight: 500;
        }
      }
      img {
        max-width: 700px;
        width: 49vw;
        @media (max-width: 768px) {
          width: 60vw;
          max-width: none;
        }
        @media (max-width: 500px) {
          width: 65vw;
        }
      }
      .main_img_container {
        @media (max-width: 768px) {
          width: 100%;
          position: unset;
          transform: unset;
          text-align: right;
        }
      }
    }
  }
`;
const StBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px 0;
  min-width: fit-content;
  .subtitle_container {
    display: flex;
    flex-direction: column;
    gap: 2rem 0;
  }
  .subtitle {
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    font-size: 1.3rem;
    span {
      word-break: keep-all;
    }
    @media (max-width: 768px) {
      font-size: 1rem;
      text-align: center;
    }
  }
  button {
    display: flex;
    gap: 0 10px;
    align-items: center;
    padding: 0;
    background: ${palette.white};
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 11px 13px 9px 13px;
    width: fit-content;
    font-weight: 600;
    border-radius: 30px;
    margin-top: 10px;
    color: ${palette.mainColor};
    box-shadow: 1px 1px 5px 2px rgb(0 0 0 / 8%);
    @media (max-width: 768px) {
      font-size: 0.875rem;
      margin: 20px auto;
    }
  }
  @media (max-width: 768px) {
    gap: 15px 0;
    align-items: center;
  }
`;
const StTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  @media (max-width: 768px) {
    gap: 5px 0;

    align-items: center;
  }
  span {
    font-size: calc(12px + 1.5vw);
    color: ${palette.text.black_e1};

    font-weight: 600;
    @media (max-width: 768px) {
      text-align: center;
      font-size: calc(15px + 2vw);
      font-weight: 800;
    }
  }
`;
const StArrowRight = styled(SlArrowRight)`
  font-size: 0.8rem;
  margin-bottom: 2px;
`;
const StArrowDown = styled(IoIosArrowDown)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  animation: fadeIn 1.3s ease-in-out infinite;
  @media (max-width: 768px) {
    display: none;
  }
  @keyframes fadeIn {
    0% {
      bottom: 40px;
      opacity: 0;
    }
    100% {
      bottom: 30px;
      opacity: 1;
    }
  }
`;
const StBannerList = styled.div`
  padding: 2rem;
  height: 56vw;
  box-sizing: border-box;
  position: relative;
  margin-top: 80px;

  &.background_accent {
    background: ${palette.mainBackground};
  }
  .order-02 {
    order: 2;
  }
  @media (max-width: 1280px) {
    height: calc(10vh + 50vw);
  }
  @media (max-width: 768px) {
    padding: 1rem;
    height: 100vh;
  }
`;
const StBannerInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1350px;
  align-items: center;
  padding-top: 13vw;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding-top: 0;
    justify-content: center;
    gap: 3rem 0;
    flex-direction: column;
  }
`;
const StMainImage = styled.img`
  object-fit: contain;
  aspect-ratio: 16/12;
  max-width: 700px;
  width: 40vw;
  position: relative;

  @media (max-width: 768px) {
    object-fit: contain;
    aspect-ratio: 16/12;
    max-width: 390px;
    width: 100%;
  }
`;
