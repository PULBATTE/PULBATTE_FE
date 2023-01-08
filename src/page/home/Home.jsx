import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { SlArrowRight } from 'react-icons/sl';
import mainImage from '../../asset/image/main.png';
import MainImage2 from '../../asset/image/main_02.png';
import MainImage3 from '../../asset/image/main_03.png';
import MainImage4 from '../../asset/image/main_04.png';
import Button from '../../components/common/Button';

export default function Home() {
  return (
    <StWrapper>
      <div className="main_banner">
        <div className="banner_inner">
          <StBannerContainer>
            <StTitle>
              <span>식물 추천과 관리를 한 곳에서</span>
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
          <StBannerContainer className="order-02">
            <StTitle>
              <span>원하는 식물을 필터링해서</span>
              <span>찾을 수 있어요</span>
            </StTitle>
            <Button size="md" background="transparent">
              식물 검색 바로가기 <StArrowRight />
            </Button>
          </StBannerContainer>
          <StMainImage src={MainImage2} alt="" />
        </StBannerInner>
      </StBannerList>
      <StBannerList className="background_grey">
        <StBannerInner>
          <StBannerContainer>
            <StTitle>
              <span>내 식물을 자랑하고</span>
              <span>이웃의 식물을 구경해요 </span>
            </StTitle>
            <Button size="md" background="transparent">
              커뮤니티 바로가기 <StArrowRight />
            </Button>
          </StBannerContainer>
          <StMainImage src={MainImage3} alt="" />
        </StBannerInner>
      </StBannerList>
      <StBannerList>
        <StBannerInner>
          <StBannerContainer className="order-02">
            <StTitle>
              <span> 초보자도 키울 수 있어요!</span>
              <span>내 성격에 맞는 식물을 찾아</span>
              <span>성장 그래프를 따라 키워보세요</span>
            </StTitle>
            <Button size="md" background="transparent">
              테스트 하러가기
              <StArrowRight />
            </Button>
          </StBannerContainer>
          <StMainImage src={MainImage4} alt="" />
        </StBannerInner>
      </StBannerList>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  .main_banner {
    background: linear-gradient(to right, #eaeaea, #b4b4b4);
    position: relative;
    height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
    @media (max-width: 1280px) {
      height: calc(10vh + 50vw);
    }
    @media (max-width: 768px) {
      padding: 8rem 2rem 2rem;
      height: 60vh;
    }
    h3 {
      font-size: calc(15px + 2vw);
      margin: 0;
      @media (max-width: 768px) {
        font-size: calc(14px + 3vw);
        justify-content: space-evenly;
      }
    }
    .banner_inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1350px;
      padding-top: calc(30px + 13vw);
      margin: 0 auto;
      width: 80%;
      @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        padding-top: 0;
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
        @media (max-width: 768px) {
          width: 62vw;
          max-width: 300px;
        }
      }
      .main_img_container {
        @media (max-width: 768px) {
          width: 100%;
          text-align: right;
        }
      }
    }
  }
`;
const StBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  button {
    display: flex;
    gap: 0 10px;
    align-items: center;
    text-align: left;
    padding: 0;
  }
  @media (max-width: 768px) {
    gap: 8px 0;
  }
`;
const StTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  @media (max-width: 768px) {
    gap: 5px 0;
  }
  span {
    font-size: calc(12px + 1.5vw);
    @media (max-width: 768px) {
      font-size: calc(11px + 1.5vw);
      font-weight: 500;
    }
  }
`;
const StArrowRight = styled(SlArrowRight)`
  font-size: 0.8rem;
  margin-bottom: 2px;
`;
const StArrowDown = styled(IoIosArrowDown)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  animation: fadeIn 1.3s ease-in-out infinite;
  @media (max-width: 768px) {
    display: none;
  }
  @keyframes fadeIn {
    0% {
      bottom: 70px;
      opacity: 0;
    }
    100% {
      bottom: 50px;
      opacity: 1;
    }
  }
`;
const StBannerList = styled.div`
  padding: 2rem;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  &.background_grey {
    background: #f3f3f3;
  }
  .order-02 {
    order: 2;
  }
  @media (max-width: 1280px) {
    height: calc(10vh + 50vw);
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const StBannerInner = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  align-items: center;
  padding-top: 16vw;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding-top: 0;
    justify-content: space-evenly;
    gap: 0 20px;
  }
`;
const StMainImage = styled.img`
  object-fit: contain;
  aspect-ratio: 16/12;
  max-width: 420px;
  width: 30vw;
  @media (max-width: 768px) {
    object-fit: contain;
    aspect-ratio: 16/12;
    max-width: 390px;
    width: 33vw;
  }
`;
