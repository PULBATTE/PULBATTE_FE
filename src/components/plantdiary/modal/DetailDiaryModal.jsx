/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import { palette } from '../../../styles/palette';
import { putPlantDiaryApi } from '../../../apis/plantDiary';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: '24px',
    border: `2px solid ${palette.mainColor}`,
    backgroundColor: palette.white,
    zIndex: 5,
    transform: 'translate(-50%, -50%)',
  },
};

export default function DetailDiaryModal(props) {
  const { onClose, content, day } = props;

  const onCloseHandler = () => {
    onClose();
  };

  return (
    <ReactModal
      isOpen
      style={customStyles}
      onRequestClose={onCloseHandler}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <StContainer>
        <StCloseButton onClick={onCloseHandler} />
        <StModalContents>
          <h3>{day} 일기</h3>
          <StContentWrapper>{content}</StContentWrapper>
          <StButton onClick={onCloseHandler} type="button">
            닫기
          </StButton>
        </StModalContents>
      </StContainer>
    </ReactModal>
  );
}

const StModalContents = styled.div`
  display: flex;
  width: 650px;
  height: 300px;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    color: ${palette.mainColor};
  }
`;
const StContentWrapper = styled.div`
  width: 100%;
  padding: 12px 16px;
  height: 250px;
  background-color: ${palette.mainBackground};
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StButton = styled.button`
  padding: 8px 15px;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 18px;
  background: ${palette.mainColor};
  color: #fff;
  font-weight: 600;
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
