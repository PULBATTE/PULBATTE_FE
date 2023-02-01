import { useState, useRef, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import moreIcon from '../../assets/image/more_vert.png';
import useContextModal from '../../hooks/useContextModal';
import { modals } from '../../context/plantDiary/Modals';
import { deletePlantDiaryApi } from '../../apis/plantDiary';

export default function PlantDiaryCard({
  plantDiary,
  plantJournalId,
  getPlantDiaryList,
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { content, createdAt, plantJournalDiaryId } = plantDiary;

  const menuRef = useRef(null);

  // contextModal
  const { openModal } = useContextModal();

  const onClickMenuHandler = () => {
    setIsOpenMenu(_isOpenMenu => !_isOpenMenu);
  };

  const onClickDetailHandler = () => {
    setIsOpenMenu(_isOpenMenu => !_isOpenMenu);
  };

  // 자식 컴포넌트에서 수정 모달에 필요한 값을 모달에 주입 - plantJournalDiaryId
  const onContextEditModalHandler = () => {
    onClickMenuHandler();
    // 해당모달을 열고 props전달
    openModal(modals.EditDiaryModal, {
      content,
      plantJournalId,
      plantJournalDiaryId,
      getPlantDiaryList,
    });
  };

  const onContextDetailModalHandler = () => {
    console.log('누름');
    // 해당모달을 열고 props전달
    openModal(modals.DetailDiaryModal, {
      content,
      day: format(new Date(createdAt), 'M/dd'),
    });
  };

  const onDeleteHandler = async () => {
    const data = await deletePlantDiaryApi(plantJournalId, plantJournalDiaryId);
    console.log(data);
    if (data.status === 200) {
      alert('삭제완료');
      getPlantDiaryList();
    } else {
      alert('error');
    }
    onClickMenuHandler();
    getPlantDiaryList();
  };

  const menuOutSideClick = useCallback(
    e => {
      // console.log(menuRef.current.contains(e.target));
      // contains는 e.target이 menuRef의 자식이냐를 알려주는 것 자식이 아니라면 메뉴를 닫아준다
      if (isOpenMenu && !menuRef.current.contains(e.target)) {
        setIsOpenMenu(false);
      }
    },
    [isOpenMenu],
  );

  useEffect(() => {
    if (isOpenMenu) document.addEventListener('mousedown', menuOutSideClick);
    return () => {
      document.removeEventListener('mousedown', menuOutSideClick);
    };
  }, [isOpenMenu, menuOutSideClick]);

  return (
    <StDiaryContainer>
      <StDiary>
        <StDateCircle>{format(new Date(createdAt), 'M/dd')}</StDateCircle>

        <StPlantDiaryCardContent onClick={onContextDetailModalHandler}>
          {content}
        </StPlantDiaryCardContent>
        <STMenuButton className="edit_button" onClick={onClickMenuHandler}>
          <img src={moreIcon} alt="수정삭제 아이콘" />
        </STMenuButton>
      </StDiary>
      {isOpenMenu && (
        <StMenuWrapper id="menuItem" ref={menuRef}>
          <ul>
            <li>
              <button type="button" onClick={onContextEditModalHandler}>
                수정
              </button>
            </li>
            <li>
              <button type="button" onClick={onDeleteHandler}>
                삭제
              </button>
            </li>
          </ul>
        </StMenuWrapper>
      )}
    </StDiaryContainer>
  );
}

const StDiaryContainer = styled.div`
  position: relative;
  width: 100%;
`;
const StDiary = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: ${palette.Diary.green};
  border-radius: 14px;
  margin-bottom: 16px;
  padding: 12px 16px;
  box-sizing: border-box;
  gap: 16px;
`;
const StDateCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.mainColor};
  font-size: 12px;
  font-weight: bold;
`;
const StPlantDiaryCardContent = styled.div`
  width: 100%;
  max-width: 300px;
  margin-right: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
  @media (max-width: 1120px) {
    max-width: 550px;
  }
`;

const STMenuButton = styled.button`
  position: absolute;
  right: 0px;
  border-style: none;
  margin: 10px;
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
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    /* justify-content: inherit; */
    padding: 0px;
  }
  li {
    flex: 1;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  button {
    width: 100%;
    height: 100%;
    border: none;
    &:hover {
      background-color: ${palette.mainColor};
      color: ${palette.white};
      border-radius: 10px;
      font-weight: bold;
    }
  }
`;
