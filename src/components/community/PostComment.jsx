import styled from 'styled-components';
import { useState } from 'react';
import { formatDate } from '../../util/index';
import { palette } from '../../styles/palette';

const userNickName = 'ssori';

export function PostComment({ comment }) {
  /* 객체 비구조화 할당 */
  const { nickname, createdAt, content, replyList } = comment;
  const [commentContent, setCommentContent] = useState(content);
  const [isEditable, setIsEditable] = useState(false);
  const [openReComment, setOpenReComment] = useState(true);

  const onReplyHandler = e => {
    setCommentContent(e.target.value);
  };
  const onEditHandler = () => {
    setIsEditable(true);
  };
  const onDeleteHandler = () => {
    console.log('삭제');
  };
  const onEditCommentDoneHandler = () => {
    setIsEditable(false);
  };
  const onReCommentOpenHandler = () =>
    setOpenReComment(_openReComment => !_openReComment);

  return (
    <StCommentContainer>
      <StUserInfo>
        <div className="userProfilecotainer">
          <img src="https://lh3.googleusercontent.com/3wJ3kGLIiv3hDlhRRkEx1zSqHf5-4VbVTEPfsDHY8EP8n_wa4kPfGjlga4deb08rG14DYauPFuTmvdH434NPueF4XA" />
          <div className="usercontainer">
            <span>{nickname}</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
        {comment.nickname === userNickName && (
          <StButtonWrapper>
            <StButton
              type="button"
              value="수정버튼"
              name="수정네임"
              onClick={onEditHandler}
            >
              수정
            </StButton>
            <StButton type="button" onClick={onDeleteHandler}>
              삭제
            </StButton>
          </StButtonWrapper>
        )}
      </StUserInfo>
      <StTextFieldWrapper>
        {isEditable ? (
          <>
            <StContentarea value={commentContent} onChange={onReplyHandler} />
            <StEditDoneButtonWrapper>
              <StEditDoneButton
                type="button"
                onClick={onEditCommentDoneHandler}
              >
                수정 완료
              </StEditDoneButton>
            </StEditDoneButtonWrapper>
          </>
        ) : (
          <StCommentContentWrapper>{commentContent}</StCommentContentWrapper>
        )}
      </StTextFieldWrapper>
      <StReCommentButton type="button" onClick={onReCommentOpenHandler}>
        답글 달기
      </StReCommentButton>
      {replyList && openReComment && (
        <ReCommentWrapper>
          {/* 재귀를 사용해서 자기자신을 불러옴 */}
          {/* map함수를 사용해서 replyList를 여러개 생성 */}
          <PostComment comment={replyList} />
        </ReCommentWrapper>
      )}
    </StCommentContainer>
  );
}

const StCommentContainer = styled.div`
  padding-bottom: 24px;
`;
const StUserInfo = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .userProfilecotainer {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .usercontainer {
    display: flex;
    flex-direction: column;
  }
`;

const StTextFieldWrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`;
const StContentarea = styled.textarea`
  border: ${props => props.readOnly && 'none'};
  width: 100%;
  height: 72px;
  margin-top: 4px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  border-radius: 4px;
  border-color: lightgray;
`;
const StButtonWrapper = styled.div`
  float: right;
`;
const StButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: gray;
  margin: 10px;
`;
const StCommentContentWrapper = styled.div`
  padding: 10px;
  margin-top: 4px;
`;
const StEditDoneButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const StEditDoneButton = styled.button`
  background-color: #47ad8e;
  color: white;
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 8px;
`;
const StReCommentButton = styled.button`
  color: ${palette.mainColor};
  font-size: 0.8rem;
  border: none;
  font-weight: 900;
  cursor: pointer;
`;
const ReCommentWrapper = styled.div`
  margin: 24px 0px 24px 24px;
`;
