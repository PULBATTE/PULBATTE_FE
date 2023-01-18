import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdOutlineWaterDrop } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';
import { GiWateringCan } from 'react-icons/gi';
import { CiTempHigh } from 'react-icons/ci';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';

export default function PlantDetail() {
  return (
    <StWrapper>
      <div className="container_inner">
        <h3>식물 찾아보기</h3>
        <Button background="none" size="md">
          <StLeftArrow />
          목록으로
        </Button>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <div>
              <span>코찰 선인장</span>
              <StFilterBtnContainer>
                <button type="button">#초보자용</button>
              </StFilterBtnContainer>
            </div>
            <div>
              <span>Tip</span>
              <div>
                <div>
                  <CiTempHigh />
                  <span>40~70%</span>
                  <span>주변 공기가 너무 촉촉하지 않게 관리해주세요</span>
                </div>
                <div>
                  <MdOutlineWaterDrop />
                  <span>40~70%</span>
                  <span>주변 공기가 너무 촉촉하지 않게 관리해주세요</span>
                </div>
                <div>
                  <BsSun />
                  <span>40~70%</span>
                  <span>주변 공기가 너무 촉촉하지 않게 관리해주세요</span>
                </div>
                <div>
                  <GiWateringCan />
                  <span>40~70%</span>
                  <span>주변 공기가 너무 촉촉하지 않게 관리해주세요</span>
                </div>
              </div>
              <div>
                <span>식물 관련된 내용</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  .container_inner {
    display: flex;
    flex-direction: column;
    max-width: 1150px;
    margin: 0 auto;
    > button {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      line-height: 1;
      color: ${palette.textColor1};
    }
    h3 {
      text-align: center;
      font-size: 2.2rem;
      margin-top: 80px;
      @media (max-width: 768px) {
        font-size: 1.7rem;
      }
      @media (max-width: 500px) {
        font-size: 1.4rem;
      }
    }
  }
`;
const StLeftArrow = styled(MdKeyboardArrowLeft)`
  font-size: 1.5rem;
`;
const StFilterBtnContainer = styled.div`
  button {
    font-size: 1rem;
    padding: 6px 20px;
    border-radius: 20px;
    border: none;
    border: 1px solid #d9d9d9;
    color: #d9d9d9;
    cursor: pointer;
  }
`;
