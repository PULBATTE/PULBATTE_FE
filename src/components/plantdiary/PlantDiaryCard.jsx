import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import moreIcon from '../../assets/image/more_vert.png';
// import useModal from '../../../hooks/useModal';

const MockData = [
  {
    plantJournalDiaryId: '0',
    content: 'string',
    createdAt: '2023-01-25T13:20:33.270Z',
    modifiedAt: '2023-01-25T13:20:33.270Z',
  },
];

export default function PlantDiaryCard({ plantDiary, onChangeModalHandler }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // console.log({ plantDiary });
  const { content, createdAt } = plantDiary;
  // console.log(format(new Date(createdAt), 'M/dd'));

  const menuRef = useRef(null);

  const onClickHandler = () => {
    setIsOpenMenu(_isOpenMenu => !_isOpenMenu);
  };

  // // 사이드바 외부 클릭시 닫히는 함수
  // const handleClose = async e => {
  //   console.log(e);
  //   const sideArea = menuRef.current;
  //   // const sideCildren = menuRef.current.contains(e.target);
  //   console.log(sideArea);
  //   // console.log(sideCildren);
  //   // if (isOpenMenu && (!sideArea || !sideCildren)) {
  //   // await setX(-width);
  //   // await setOpen(false);
  //   // }
  // };

  // useEffect(() => {
  //   window.addEventListener('click', handleClose);
  //   return () => {
  //     window.removeEventListener('click', handleClose);
  //   };
  // });
  const onEditModal = () => {
    onChangeModalHandler();
  };
  return (
    <StDiaryContainer>
      <StDiary>
        <StDateCircle>{format(new Date(createdAt), 'M/dd')}</StDateCircle>
        <StPlantDiaryCardContent>{content}</StPlantDiaryCardContent>
        <STMenuButton className="edit_button" onClick={onClickHandler}>
          <img src={moreIcon} alt="수정삭제 아이콘" />
        </STMenuButton>
      </StDiary>
      {isOpenMenu && (
        <StMenuWrapper ref={menuRef}>
          <ul>
            <li>
              <button type="button" onClick={onEditModal}>
                수정
              </button>
            </li>
            <li>삭제</li>
          </ul>
        </StMenuWrapper>
      )}
    </StDiaryContainer>
  );
}

const StDiaryContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 150px; */
`;
const StDiary = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${palette.Diary.green};
  border-radius: 14px;
  margin-bottom: 16px;
  padding: 12px 16px;
  box-sizing: border-box;
`;
const StDateCircle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  span {
    font-size: 16px;
    font-weight: bold;
    color: ${palette.text.green};
  }
`;
const StPlantDiaryCardContent = styled.div`
  width: 100%;
`;

const STMenuButton = styled.button`
  border-style: none;
  img {
    width: 24px;
    height: 24px;
  }
`;

const StMenuWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 45px;
  width: 100px;
  height: 80px;
  background-color: ${palette.white};
  box-shadow: 0px 2px 22px rgba(0, 0, 0, 0.15);
  z-index: 3;
  border-radius: 10px;
  overflow: hidden;
  ul {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px;
    gap: 10px;
  }
  li {
    text-align: center;
  }
`;
