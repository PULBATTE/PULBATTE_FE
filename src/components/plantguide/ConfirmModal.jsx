import React from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import Modal from '../common/Modal';
import { palette } from '../../styles/palette';

export default function ConfirmModal({ modal, onSubmitHandler, closeModal }) {
  return (
    <Modal modal={modal} width="350px" height="200px">
      <StContainer>
        <StCloseButton onClick={closeModal} />
        <div className="modal_comment_container">
          <h3>이 식물을 선택하시겠습니까?</h3>
        </div>
        <div className="btn_container">
          <StButton
            type="button"
            size="sm"
            background="#fff"
            color="grey"
            onClick={() => closeModal()}
          >
            취소
          </StButton>
          <StButton type="button" onClick={() => onSubmitHandler()}>
            입력
          </StButton>
        </div>
      </StContainer>
    </Modal>
  );
}
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 25px 0;
  justify-content: space-between;
  h3 {
    padding: 15px 0 0 0;
    margin: 0;
    font-size: 1.2rem;

    font-weight: 500;
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
  .btn_container {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0 15px;
  }
`;
const StButton = styled.button`
  padding: 8px 15px;
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
