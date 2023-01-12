import { useState } from 'react';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';

export default function DonePost() {
  const [isClicked, setIsClicked] = useState(false);
  const onLikeHandler = () => {
    setIsClicked(_isClicked => !_isClicked);
  };

  const [comment, setComment] = useState('');
  const onCommentHandler = e => {
    setComment(e.target.value);
  };
  /* axios호출  */
  // const onCommentHandler =

  return (
    <StDonePostWrapper>
      <StNavBar>
        <MdArrowBackIos />
        <span>게시글 목록</span>
      </StNavBar>
      <StBoardWrapper>
        <h3>이 식물 이름이 뭘까요?</h3>
        <StUserInfo>
          <img src="https://lh3.googleusercontent.com/3wJ3kGLIiv3hDlhRRkEx1zSqHf5-4VbVTEPfsDHY8EP8n_wa4kPfGjlga4deb08rG14DYauPFuTmvdH434NPueF4XA" />
          <div className="usercontainer">
            <span>닉네임</span>
            <span>2023.01.01</span>
          </div>
        </StUserInfo>
        <StContentContainer>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgL2oyiz-0BuC-6UnKLmWDzn-0RQg4jsaQTNbs0Aq1W_JuxgOI2-BldCcAbaRZEy12pXs&usqp=CAU" />
          <span>
            이곳은 텍스트를 입력하는 공간입니다. 텍스트를 입력하는 공간입니다.
            <br />
            이곳은 텍스트를 입력하는 공간입니다. 텍스트를 입력하는 공간입니다.
            <br />
            이곳은 텍스트를 입력하는 공간입니다. 텍스트를 입력하는 공간입니다.
            <br />
            이곳은 텍스트를 입력하는 공간입니다. 텍스트를 입력하는 공간입니다.
            <br />
            이곳은 텍스트를 입력하는 공간입니다. 텍스트를 입력하는 공간입니다.
            <br />
          </span>
        </StContentContainer>
        <StTagContainer>
          <Button size="sd" background={palette.borderColor2}>
            식물정보
          </Button>
          <Button size="sd" background={palette.borderColor2}>
            질문과 답변
          </Button>
        </StTagContainer>
        <StDivider />

        {isClicked === false ? (
          <StLikeContainer>
            <BsHeart onClick={onLikeHandler} />
            <span>9</span>
          </StLikeContainer>
        ) : (
          <StLikeContainer>
            <BsFillHeartFill onClick={onLikeHandler} />
            <span>10</span>
          </StLikeContainer>
        )}
      </StBoardWrapper>
      <div>
        <StCommentField>
          <span>22개의 댓글</span>
          <StCommentArea
            placeholder="댓글을 작성하세요"
            value={comment}
            onChange={onCommentHandler}
          />
          <StButton type="button" onClick={onCommentHandler}>
            등록
          </StButton>
        </StCommentField>
        <div>댓글 영역</div>
      </div>
    </StDonePostWrapper>
  );
}
const StDonePostWrapper = styled.div`
  max-width: 1280px;
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
`;
const StNavBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  span {
    font-size: 1.1rem;
  }
`;
const StBoardWrapper = styled.div`
  border: 1.5px solid #eaeaea;
  border-radius: 8px;
  padding: 30px;
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
const StUserInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .usercontainer {
    display: flex;
    flex-direction: column;
  }
`;

const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  img {
    max-height: 300px;
    width: 400px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  span {
    line-height: 1.5rem;
  }
`;

const StTagContainer = styled.div`
  margin-top: 30px;
  gap: 8px;
  button {
    border-radius: 16px;
    padding: 3px 6px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const StDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #eaeaea;
  margin-top: 30px;
`;

const StLikeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0 5px;
  margin-top: 20px;
`;

const StCommentField = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const StCommentArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  margin-top: 10px;
`;

const StButton = styled.button`
  background-color: #47ad8e;
  color: white;
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  float: right;
`;
