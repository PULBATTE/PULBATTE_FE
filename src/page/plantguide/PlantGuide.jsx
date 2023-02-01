/* eslint-disable consistent-return */
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
import { postPlantsInfoApi } from '../../apis/plantGuide';

export default function PlantGuide() {
  const [modal, onChangeModalHandler] = useModal();
  const plantValue = useRef();
  const time = format(new Date(), 'yyyy-MM-dd');
  const { beginnerName } = useParams();

  const onSubmitHandler = async () => {
    const { value } = plantValue.current;
    if (value === '' || value === String) {
      return alert('키 입력은 숫자만 입력이 가능합니다');
    }
    await postPlantsInfoApi(time, Number(value))
      .then(response => {
        if (response.statusCode == 200) {
          window.location.reload();
        }
        if (response.statusCode == 400) {
          alert('키 입력은 하루에 한 번씩 가능합니다!');
        }
        onChangeModalHandler();
      })
      .catch(error => console.log(error));
  };

  const closeModal = () => {
    plantValue.current.value = '';
    onChangeModalHandler();
  };

  return (
    <StPageWrapper>
      <Modal
        modal={modal}
        width="500px"
        height="400px"
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
            <span>현재 내 식물의 키는?</span>
            <div>
              <input type="number" ref={plantValue} maxLength={3} />
              <span>cm</span>
            </div>
          </div>
          <StButton type="button" onClick={() => onSubmitHandler(beginnerName)}>
            입력
          </StButton>
        </StContainer>
      </Modal>
      <StPageInner>
        <StTitle>
          <h3>식집사가이드</h3>
        </StTitle>
        <PlantInfo onChangeModalHandler={onChangeModalHandler} />
      </StPageInner>
    </StPageWrapper>
  );
}
const StPageWrapper = styled.div`
  max-width: 1100px;
  width: 90%;
  padding: 4rem 0 3rem;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 0;
    height: auto;
    background: #fff;
  }
  @media (max-width: 768px) {
    margin-top: 0;
  }

  @media (max-width: 1280px) {
    height: 100%;
  }
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
const StTitle = styled.div`
  text-align: center;
  position: relative;
  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin: 5rem 0 4rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin: 2rem 0;
    }
  }
  @media (max-width: 500px) {
    display: flex;
    justify-content: space-between;
  }
`;
const StPageInner = styled.div`
  margin-top: 3rem;
  @media (max-width: 768px) {
    margin-top: 0;
  }
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
    font-size: 1.4rem;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  .modal_comment_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px 0;
    @media (max-width: 768px) {
      gap: 2px 0;
    }
    span {
      font-size: 1.2rem;
      color: #a3a3a3;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
  .modal_input_container {
    display: flex;
    align-items: center;
    gap: 0 5px;
    span {
      font-size: 1.2rem;
      color: #777777;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
    input {
      width: 4rem;
      padding: 5px;
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid black;
      outline: none;
      font-size: 1.4rem;
      font-weight: 600;
      text-align: center;
      &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
      }
      @media (max-width: 768px) {
        padding: 0;
      }
    }
  }
`;
const StButton = styled.button`
  padding: 9px 15px;
  font-size: 1rem;
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
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8rem;
    width: 90px;
  }
`;
const StCloseButton = styled(GrFormClose)`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.8rem;
  cursor: pointer;
`;
