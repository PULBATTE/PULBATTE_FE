// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import { palette } from '../../../styles/palette';
import { postPlantDiaryApi } from '../../../apis/plantDiary';

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

export default function CreateDiaryModal(props) {
  const {
    // onSubmit, // submit을 modal에서 정의
    onClose,
    content,
    plantJournalId,
    getPlantDiaryList,
  } = props;
  console.log({ props });
  const [diaryContent, setDiaryContent] = useState(content);

  const onSubmitHandler = async () => {
    const data = await postPlantDiaryApi(plantJournalId, diaryContent);
    if (data.status === 200) {
      alert('작성 완료');
      onClose();
      getPlantDiaryList();
    } else {
      alert('error');
    }
  };

  const onCloseHandler = () => {
    onClose();
  };

  const onChangeDiaryHandler = e => {
    setDiaryContent(e.target.value);
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
          <h3>일기 작성</h3>
          <textarea value={diaryContent} onChange={onChangeDiaryHandler} />
          <StButton type="button" onClick={onSubmitHandler}>
            일기 작성
          </StButton>
        </StModalContents>
      </StContainer>
    </ReactModal>
  );
}

const StModalContents = styled.div`
  display: flex;
  width: 650px;
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
  border: none;
  border-radius: 18px;
  background: ${palette.mainColor};
  color: ${palette.white};
  font-weight: 600;
  cursor: pointer;
  &:active {
    background: ${palette.mainColor};
  }
`;
const StCloseButton = styled(GrFormClose)`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.5rem;
  color: ${palette.mainColor};
  cursor: pointer;
`;
