import styled from 'styled-components';
import { useState } from 'react';
import { formatDate } from '../../util/index';
import { palette } from '../../styles/palette';
import {
  deleteCommentApi,
  editCommentApi,
  postCommentApi,
} from '../../apis/community';

export function Comment({ comment, getPostUserApi, nickName }) {
  /* 객체 비구조화 할당 */
  const {
    replyList,
    content,
    postId,
    commentId,
    createdAt,
    nickname,
    profileImage,
  } = comment;

  console.log({ comment });
  const [commentContent, setCommentContent] = useState(content);
  const [isEditable, setIsEditable] = useState(false);
  const [isHideComment, setIsHideComment] = useState(true);

  const [isOpenReply, setIsOpenReply] = useState(false);
  const [createReply, setCreateReply] = useState();

  const onOpenEditCommentHandler = () => {
    setIsEditable(true);
  };
  const onDeleteCommentHandler = async () => {
    await deleteCommentApi(commentId);
    await getPostUserApi();
  };
  const onEditCommentHandler = e => {
    setCommentContent(e.target.value);
  };
  const onEditCommentDoneHandler = async () => {
    await editCommentApi(commentId, commentContent);

    await getPostUserApi();
  };
  const onOpenReplyHandler = e => {
    setIsOpenReply(_openReply => !_openReply);
  };
  const onCreateReplyHandler = e => {
    setCreateReply(e.target.value);
  };
  const onRegReplyHandler = async () => {
    await postCommentApi(postId, commentId, createReply);
    await getPostUserApi();
  };
  return (
    <StCommentContainer>
      <StUserInfo>
        <div className="userProfilecotainer">
          <img alt="profileImage" src={profileImage} />
          <div className="usercontainer">
            <span>{nickname}</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
        {comment.nickname === nickName && (
          <StButtonWrapper>
            <StButton
              type="button"
              value="수정버튼"
              onClick={onOpenEditCommentHandler}
            >
              수정
            </StButton>
            <StButton type="button" onClick={onDeleteCommentHandler}>
              삭제
            </StButton>
          </StButtonWrapper>
        )}
      </StUserInfo>
      <StTextFieldWrapper>
        {isEditable ? (
          <>
            <StCommentTextArea
              value={commentContent}
              onChange={onEditCommentHandler}
            />
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
      <StReCommentButton type="button" onClick={onOpenReplyHandler}>
        {isOpenReply ? '숨기기' : '답글 달기'}
      </StReCommentButton>
      {isOpenReply && (
        <>
          <StCommentTextArea
            value={createReply}
            onChange={onCreateReplyHandler}
          />
          <StRegReplyButton type="button" onClick={onRegReplyHandler}>
            등록
          </StRegReplyButton>
        </>
      )}
      {replyList.length !== 0 &&
        replyList.map(v => (
          <ReCommentWrapper key={v.commentId}>
            {/* 재귀를 사용해서 자기자신을 불러옴 */}
            {/* map함수를 사용해서 replyList를 여러개 생성 */}
            <Comment
              comment={v}
              getPostUserApi={getPostUserApi}
              nickName={nickName}
            />
          </ReCommentWrapper>
        ))}
    </StCommentContainer>
  );
}

const StCommentContainer = styled.div`
  margin-bottom: 8px;
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
const StCommentTextArea = styled.textarea`
  border: ${props => props.readOnly && 'none'};
  width: 100%;
  height: 72px;
  margin-top: 8px;
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
  padding: 24px 0px 24px 24px;
  border-left: 4px solid ${palette.borderColor1};
`;

const StRegReplyButton = styled.button`
  background-color: ${palette.mainColor};
  color: ${palette.white};
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  float: right;
  margin-top: 8px;
`;
