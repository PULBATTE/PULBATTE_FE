// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from 'react-modal';
import React from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import { palette } from '../../../styles/palette';

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

export default function DeleteConfirmModal(props) {
  const { open, onCloseHandler, onDeleteHandler } = props;

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      onRequestClose={onCloseHandler}
      contentLabel="Delete Modal"
      ariaHideApp={false}
    >
      <StContainer>
        <StCloseButton onClick={onCloseHandler} />
        <StModalContents>삭제 하시겠습니까?</StModalContents>
        <StModalFooter>
          <StButton type="button" btnStyle="outline" onClick={onCloseHandler}>
            취소
          </StButton>
          <StButton type="button" onClick={onDeleteHandler}>
            삭제
          </StButton>
        </StModalFooter>
      </StContainer>
    </ReactModal>
  );
}

const StModalContents = styled.div`
  display: flex;
  width: 240px;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  margin: 18px 0px;
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    color: ${palette.mainColor};
  }
  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    height: 250px;
    resize: none;
    z-index: 2;
    border: none;
    background-color: ${palette.mainBackground};
    border-radius: 16px;
    outline: none;
    font-size: 16px;
  }
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
  border: ${props =>
    props.btnStyle === 'outline' ? `2px solid ${palette.mainColor}` : 'none'};
  border-radius: 18px;
  background: ${props =>
    props.btnStyle === 'outline' ? palette.white : `${palette.mainColor}`};
  color: ${props =>
    props.btnStyle === 'outline' ? palette.mainColor : `${palette.white}`};
  font-weight: 600;
  cursor: pointer;
`;
const StCloseButton = styled(GrFormClose)`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.5rem;
  color: ${palette.mainColor};
  cursor: pointer;
`;

const StModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
