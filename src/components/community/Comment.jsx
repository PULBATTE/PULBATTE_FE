import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { formatDate } from '../../util/index';
import { palette } from '../../styles/palette';
import {
  deleteCommentApi,
  editCommentApi,
  postCommentApi,
} from '../../apis/community';
import { customNotify } from '../../util/toastMessage';

export function Comment({ comment, getPostUser, nickName, tempReplyReject }) {
  const {
    replyList,
    content,
    postId,
    commentId,
    createdAt,
    nickname,
    profileImage,
  } = comment;

  const replyButtonText = () => {
    const replylength = comment.replyList.length;
    if (isOpenReply) {
      return '숨기기';
    }
    if (replylength) {
      return `${replylength}개의 답글`;
    }
    return '답글달기';
  };

  const [commentContent, setCommentContent] = useState(content);
  const [isEditable, setIsEditable] = useState(false);
  const [isOpenReplyEditor, setIsOpenReplyEditor] = useState(false);
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [createReply, setCreateReply] = useState();

  const onEditCommentHandler = e => {
    setCommentContent(e.target.value);
  };

  const onCreateReplyHandler = e => {
    setCreateReply(e.target.value);
  };

  const onOpenEditCommentHandler = () => {
    setIsEditable(true);
  };

  const onOpenReplyHandler = e => {
    setIsOpenReply(_openReply => !_openReply);
  };

  const onDeleteCommentHandler = async () => {
    const data = await deleteCommentApi(commentId);
    const alertMsg = data.data.msg;
    customNotify.success(alertMsg);
    getPostUser();
  };

  const onEditCommentDoneHandler = async () => {
    if (!commentContent) {
      customNotify.error('내용을 입력해주세요.');
    } else {
      const data = await editCommentApi(commentId, commentContent);
      const alertMsg = data.data.msg;
      customNotify.success(alertMsg);
      setIsEditable(false);
      getPostUser();
    }
  };

  const onRegReplyHandler = async () => {
    if (!createReply) {
      customNotify.error('내용을 입력해주세요.');
    } else {
      try {
        const data = await postCommentApi(postId, commentId, createReply);
        const alertMsg = data.data.msg;
        customNotify.success(alertMsg);
        setIsEditable(false);
      } catch (error) {
        const isNotSignIn = error.message.indexOf('403');
        if (isNotSignIn) {
          customNotify.error('로그인이 필요합니다.');
        } else {
          customNotify.error();
        }
      } finally {
        setCreateReply('');
        getPostUser();
      }
    }
  };

  return (
    <StCommentContainer>
      <StCommentWrapper>
        <StUserInfo>
          <div className="userProfilecotainer">
            <img alt="profileImage" src={profileImage} />
            <div className="usercontainer">
              <span className="username">{nickname}</span>
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
            <StEditorWrapper>
              <StCommentTextArea
                value={commentContent}
                onChange={onEditCommentHandler}
              />
              <StAlignRightButtonWrapper>
                <StEditDoneButton
                  type="button"
                  onClick={onEditCommentDoneHandler}
                >
                  수정 완료
                </StEditDoneButton>
              </StAlignRightButtonWrapper>
            </StEditorWrapper>
          ) : (
            <StCommentContentWrapper>{commentContent}</StCommentContentWrapper>
          )}
        </StTextFieldWrapper>
        {/* TODO: 대댓글 api 수정 전 임시 조치 */}
        <div>
          {!tempReplyReject && (
            <StReCommentButton type="button" onClick={onOpenReplyHandler}>
              {replyButtonText()}
            </StReCommentButton>
          )}
        </div>
      </StCommentWrapper>
      {isOpenReply && (
        <div className="recomment_container">
          <div className="recomment_wrapper">
            {replyList.length !== 0 &&
              replyList.map(v => (
                <ReCommentWrapper key={v.commentId}>
                  {/* 재귀를 사용해서 자기자신을 불러옴 */}
                  {/* map함수를 사용해서 replyList를 여러개 생성 */}
                  <Comment
                    comment={v}
                    getPostUser={getPostUser}
                    nickName={nickName}
                    tempReplyReject
                  />
                </ReCommentWrapper>
              ))}
          </div>
          {isOpenReplyEditor ? (
            <StEditorWrapper>
              <StCommentTextArea
                value={createReply}
                onChange={onCreateReplyHandler}
              />
              <StAlignRightButtonWrapper>
                <StRegReplyButton
                  type="button"
                  onClick={() => {
                    setIsOpenReplyEditor(false);
                  }}
                >
                  취소
                </StRegReplyButton>
                <StRegReplyButton type="button" onClick={onRegReplyHandler}>
                  등록
                </StRegReplyButton>
              </StAlignRightButtonWrapper>
            </StEditorWrapper>
          ) : (
            <StOpenReplyButtonWrapper>
              <StOpenReplyButton
                type="button"
                onClick={() => setIsOpenReplyEditor(true)}
              >
                답글 달기
              </StOpenReplyButton>
            </StOpenReplyButtonWrapper>
          )}
        </div>
      )}
      <ToastContainer
        position="bottom-center" // 알람 위치 지정
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        theme="colored"
        limit={2} // 알람 개수 제한
      />
    </StCommentContainer>
  );
}

const StCommentContainer = styled.div`
  .recomment_container {
    background-color: ${palette.mainBackground};
    border-radius: 16px;
  }
  .usercontainer {
    display: flex;
    flex-direction: column;
    gap: 3px 0;
    .username {
      font-weight: 700;
    }
  }
`;
const StCommentWrapper = styled.div``;
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
`;
const StEditorWrapper = styled.div`
  padding: 0px 24px 24px 24px;
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
  border-color: ${palette.borderColor5};
  white-space: pre-line;
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
  font-size: 15px;
`;
const StCommentContentWrapper = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  padding: 10px;
  margin-top: 4px;
`;
const StAlignRightButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;
const StEditDoneButton = styled.button`
  background-color: ${palette.mainColor};
  color: ${palette.white};
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
  margin-top: 8px;
  padding: 24px;
`;
const StOpenReplyButtonWrapper = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 24px;
  background-color: inherit;
`;
const StOpenReplyButton = styled.button`
  background-color: ${palette.white};
  color: ${palette.mainColor};
  width: 100%;
  height: 40px;
  border: 2px solid ${palette.mainColor};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
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

  margin-top: 20px;
`;
