import React, { useState } from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import Modal from '../common/Modal';
import { palette } from '../../styles/palette';

export default function CreateDiaryModal({
  modal,
  onSubmitHandler,
  closeModal,
}) {
  const [diaryContent, setDiaryContent] = useState('');
  console.log({ diaryContent });
  const onChangeDiaryHandler = e => {
    console.log(e.target.value);
    setDiaryContent(e.target.value);
  };
  console.log(diaryContent);
  return (
    <Modal modal={modal} width="700px">
      <StContainer>
        <StCloseButton onClick={closeModal} />
        <StModalContents>
          <h3>일기 작성</h3>
          <textarea value={diaryContent} onChange={onChangeDiaryHandler} />
          <StButton type="button" onClick={() => onSubmitHandler(diaryContent)}>
            작성완료
          </StButton>
        </StModalContents>
      </StContainer>
    </Modal>
  );
}

const StModalContents = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }
  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    height: 250px;
    resize: none;
    z-index: 10;
    border: 2px solid ${palette.borderColor2};
    border-radius: 16px;
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
