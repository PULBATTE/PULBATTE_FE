import React, { useState } from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import Button from '../../components/common/Button';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';
import { palette } from '../../styles/palette';
import PlantGraph from '../../components/plantguide/PlantGraph';
import PlantEnviroment from '../../components/plantguide/PlantEnviroment';
import Modal from '../../components/common/Modal';
import useModal from '../../hooks/useModal';

export default function PlantGuide() {
  const [modal, onChangeModalHandler] = useModal();
  const [openModal, setOpenModal] = useState(false);

  const closeModalHandler = () => {
    document.body.style.overflowY = 'visible';
    onChangeModalHandler();
  };

  const openModalHandler = () => {
    onChangeModalHandler();
    document.body.style.overflowY = 'hidden';
  };

  return (
    <StPageWrapper>
      <Modal>
        <div>
          <GrFormClose />
        </div>
        <h3>키 입력하기</h3>
        <div>
          <div>
            <span>식물의 키를 입력해주세요</span>
            <span>입력한 데이터가 성장 그래프에 반영됩니다.</span>
          </div>
          <div>
            <div>
              <input type="text" />
            </div>
            <span>cm만큼 컸어요</span>
          </div>
        </div>
        <Button size="md" background="F2F3F7" />
      </Modal>
      <StPageInner>
        <StTitle>
          <h3>식집사가이드</h3>
          <Button
            background="#47AD8E"
            size="sm"
            color="#fff"
            width="fit-content"
            onClick={() => onChangeModalHandler()}
          >
            키 입력하기
          </Button>
        </StTitle>
        <StContent>
          <div className="comment_message">
            식물을 직접 키우며 성장을 입력하고 성장그래프 가이드와 비교해보세요
          </div>
          <div>
            <StGrid>
              <div className="image_container">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReOF8aynNvcPEJjrdeaurtuSRUcRSaW8VDDw&usqp=CAU"
                  alt="식물이미지"
                />
                <span className="plant_name">스파티필름</span>
              </div>
              <div className="graph_container">
                <PlantGraph />
              </div>
              <StGridInner>
                <PlantEnviroment
                  title="빛"
                  src={shineIcon}
                  checkPoint="4"
                  name="sunny"
                />
                <PlantEnviroment
                  title="물"
                  src={waterIcon}
                  checkPoint="2"
                  name="water"
                />
                <PlantEnviroment
                  title="통풍"
                  src={airIcon}
                  checkPoint="3"
                  name="air"
                />
              </StGridInner>
              <StTipContainer>
                <h4>TIP</h4>
                <ul>
                  <li>
                    <span>∙ 비교적 꽃을 피우기 쉬운 식물이에요 </span>
                  </li>
                  <li>
                    <span>
                      ∙ 해가 적은 곳에서도 잘 자라요. 쨍한 직사광선은 피해
                      주세요
                    </span>
                  </li>
                  <li>
                    <span>
                      ∙ 독성이 있어요! 반려동물이나 어린 아이에게 닿지 않는 곳에
                      배치해 주세요
                    </span>
                  </li>
                </ul>
              </StTipContainer>
            </StGrid>
          </div>
        </StContent>
      </StPageInner>
    </StPageWrapper>
  );
}
const StPageWrapper = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
`;
const StTitle = styled.div`
  text-align: center;
  position: relative;
  h3 {
    font-size: 2.1rem;
  }
  button {
    float: right;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-weight: 600;
    border-radius: 30px;
  }
`;
const StPageInner = styled.div`
  margin-top: 3rem;
`;

const StContent = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px 0;
  .comment_message {
    text-align: center;
    font-size: 1.1rem;
    color: ${palette.textColor1};
  }
`;

const StGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1.5fr;
  gap: 15px;
  .image_container {
    position: relative;

    img {
      width: 100%;
      border-radius: 20px;
      aspect-ratio: 1/1;
    }
  }
  .plant_name {
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .graph_container {
    display: flex;
    align-items: center;
  }
`;
const StGridInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 24px;
  gap: 0 20px;
`;

const StTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  background: #ebf1ec;
  border-radius: 24px;
  gap: 5px 0;
  h4 {
    color: #0ba47f;
    font-size: 20px;
    margin: 7px 0;
  }
  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    span {
      font-weight: 500;
    }
  }
`;
