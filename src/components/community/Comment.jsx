import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { formatDate } from '../../util/index';
import { palette } from '../../styles/palette';
import {
  deleteCommentApi,
  editCommentApi,
  postCommentApi,
} from '../../apis/community';
import { customNotify } from '../../util/toastMessage';
import DeleteConfirmModal from './modal/DeleteConfirmModal';

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
  const [commentContent, setCommentContent] = useState(content);
  const [isEditable, setIsEditable] = useState(false);
  const [createReply, setCreateReply] = useState();

  const [isOpenComments, setIsOpenComments] = useState(false);
  const [isOpenEditor, setIsOpenEditor] = useState(false);

  const [isDeleteModal, setIsDeleteModal] = useState(false);

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
    if (isOpenComments) {
      setIsOpenEditor(false);
    }
    setIsOpenComments(_openReply => !_openReply);
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

  const replyButton = () => {
    const replylength = comment.replyList.length;
    if (isOpenComments) {
      return (
        <StReCommentButton type="button" onClick={onOpenReplyHandler}>
          숨기기
        </StReCommentButton>
      );
    }
    if (replylength) {
      return (
        <StReCommentButton type="button" onClick={onOpenReplyHandler}>
          {replylength} 개의 답글
        </StReCommentButton>
      );
    }
    return (
      <StReCommentButton
        type="button"
        onClick={() => {
          setIsOpenEditor(true);
          setIsOpenComments(true);
        }}
      >
        답글 달기
      </StReCommentButton>
    );
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
        setIsOpenEditor(false);
        getPostUser();
      }
    }
  };
  const onCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };
  useEffect(() => {
    if (replyList.length === 0) {
      setIsOpenEditor(false);
      setIsOpenComments(false);
    }
  }, [replyList.length]);

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
              <StButton
                type="button"
                onClick={() => {
                  setIsDeleteModal(true);
                }}
              >
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
          <div>{!tempReplyReject && replyButton()}</div>
        </StTextFieldWrapper>
      </StCommentWrapper>
      {isOpenComments && (
        <div className="recomment_container">
          <div className="recomment_wrapper">
            {!!replyList.length &&
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
            {isOpenEditor ? (
              <StEditorWrapper>
                <StCommentTextArea
                  value={createReply}
                  onChange={onCreateReplyHandler}
                />
                <StAlignRightButtonWrapper>
                  <StRegReplyButton
                    type="button"
                    onClick={() => {
                      setIsOpenEditor(false);
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
                  onClick={() => setIsOpenEditor(true)}
                >
                  답글 달기
                </StOpenReplyButton>
              </StOpenReplyButtonWrapper>
            )}
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-center" // 알람 위치 지정
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        theme="colored"
        limit={2} // 알람 개수 제한
      />
      <DeleteConfirmModal
        open={isDeleteModal}
        onCloseHandler={onCloseDeleteModal}
        onDeleteHandler={onDeleteCommentHandler}
      />
    </StCommentContainer>
  );
}

const StCommentContainer = styled.div`
  .recomment_container {
    background-color: ${palette.mainBackground};
    border-radius: 16px;
    padding: 18px;
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
const StEditorWrapper = styled.div``;

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
