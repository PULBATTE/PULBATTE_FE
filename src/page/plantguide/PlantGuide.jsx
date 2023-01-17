import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { GrFormClose } from 'react-icons/gr';
import { format, compareAsc } from 'date-fns';
import { de } from 'date-fns/locale';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import Modal from '../../components/common/Modal';
import useModal from '../../hooks/useModal';
import PlantInfo from '../../components/plantguide/PlantInfo';
import { postPlantsInfo } from '../../apis/plantGuide';

export default function PlantGuide() {
  const [modal, onChangeModalHandler] = useModal();
  const plantValue = useRef();
  const time = format(new Date(), 'yyyy-MM-dd');
  const { beginnerName } = useParams();

  const onSubmitHandler = () => {
    const { value } = plantValue.current;
    if (value == '') return;
    postPlantsInfo(time, Number(value))
      .then(response => {
        if (response.statusCode == 200) {
          window.location.reload();
        }
      })
      .catch(error => console.log(error));
    onChangeModalHandler();
  };

  const closeModal = () => {
    plantValue.current.value = '';
    onChangeModalHandler();
  };

  return (
    <StPageWrapper>
      <Modal
        modal={modal}
        width="400px"
        height="300px"
        submit={onChangeModalHandler}
      >
        <StContainer>
          <StCloseButton onClick={closeModal} />
          <h3>키 입력하기</h3>
          <div className="modal_comment_container">
            <span>식물의 키를 입력해주세요</span>
            <span>입력한 데이터가 성장 그래프에 반영됩니다.</span>
          </div>
          <div className="modal_input_container">
            <input type="number" ref={plantValue} maxLength={3} />
            <span>cm만큼 컸어요</span>
          </div>
          <StButton type="button" onClick={() => onSubmitHandler(beginnerName)}>
            입력
          </StButton>
        </StContainer>
      </Modal>
      <StPageInner>
        <StTitle>
          <h3>식집사가이드</h3>
          <button type="button" onClick={() => onChangeModalHandler()}>
            키 입력하기
          </button>
        </StTitle>
        <PlantInfo />
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
    font-weight: 800;
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
  button {
    float: right;
    position: absolute;
    right: 0;
    top: 50%;
    padding: 8px 16px;
    color: #fff;
    width: fit-content;
    background: ${palette.mainColor};
    border: none;
    cursor: pointer;
    transform: translateY(-53%);
    color: #fff;
    font-weight: 600;
    border-radius: 30px;
    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;
const StPageInner = styled.div`
  margin-top: 3rem;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;

  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 25px 0;
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
  .modal_comment_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px 0;
    span {
      color: #a3a3a3;
    }
  }
  .modal_input_container {
    display: flex;
    align-items: center;
    gap: 0 5px;
    span {
      color: #777777;
    }
    input {
      width: 4rem;
      padding: 5px;
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid black;
      outline: none;
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
      }
    }
  }
`;
const StButton = styled.button`
  padding: 7px 15px;
  width: 100px;
  border: none;
  border-radius: 18px;
  background: ${palette.mainColor};
  color: #fff;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;
  &:active {
    background: #337461;
  }
`;
const StCloseButton = styled(GrFormClose)`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.5rem;
  cursor: pointer;
`;
