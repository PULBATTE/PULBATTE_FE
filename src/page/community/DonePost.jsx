import { useState, useEffect, useCallback, useRef } from 'react';
import { RxDoubleArrowLeft } from 'react-icons/rx';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { palette } from '../../styles/palette';
import { formatDate } from '../../util/index';
import {
  getPostUserApi,
  getPostGuestApi,
  postLikeApi,
  postCommentApi,
  deletePostTextApi,
} from '../../apis/community';
import { getInfoApi } from '../../apis/auth';
import { customNotify } from '../../util/toastMessage';
import DeleteConfirmModal from '../../components/community/modal/DeleteConfirmModal';
import { Comment } from '../../components/community/Comment';
import Button from '../../components/common/Button';

export default function DonePost() {
  const [postData, setPostData] = useState();
  const [nickName, setNickName] = useState('');
  const [Like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const commentRef = useRef();
  const { postId } = useParams();
  const navigate = useNavigate();
  const Token = localStorage.getItem('access_Token');

  const getPost = useCallback(async () => {
    if (Token) {
      const data = await getPostUserApi(postId);
      setPostData(data.data);
    } else {
      const data = await getPostGuestApi(postId);
      setPostData(data.data);
    }
  }, [Token, postId]);

  const getInfo = useCallback(async () => {
    const data = await getInfoApi();
    setNickName(data.nickName);
    return data;
  }, []);

  const postLike = useCallback(async () => {
    try {
      await postLikeApi(postId);
      Like
        ? customNotify.success('좋아요를 취소했어요 :(')
        : customNotify.success('좋아요를 눌렀어요 :)');
    } catch (error) {
      const isNotSignIn = error.message.indexOf('403');
      if (isNotSignIn) {
        customNotify.error('로그인이 필요합니다.');
      } else {
        customNotify.error();
      }
    } finally {
      getPost();
    }
  }, [Like, getPost, postId]);

  useEffect(() => {
    if (postData) {
      setLike(postData.likeStatus);
    }
  }, [postData]);

  useEffect(() => {
    getInfo();
    getPost();
  }, [getInfo, getPost]);

  const onCommentHandler = e => {
    setComment(e.target.value);
  };

  const onRegCommentHandler = async () => {
    if (!comment) {
      customNotify.error('댓글을 작성하세요');
      return;
    }
    try {
      const data = await postCommentApi(postId, 0, comment);
      const { msg } = data.data;
      customNotify.success(msg);
    } catch (error) {
      const isNotSignIn = error.message.indexOf('403');
      if (isNotSignIn) {
        customNotify.error('로그인이 필요합니다.');
      } else {
        customNotify.error();
      }
    } finally {
      setComment('');
      getPost();
    }
  };

  const onDeletePostHandler = async () => {
    try {
      await deletePostTextApi(postId);
      customNotify.error('삭제 되었습니다.');
      navigate('/postlist');
    } catch (error) {
      customNotify.error();
    }
  };
  const onCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };

  return (
    <StWrapper>
      <StTitle>
        <StNavListBtn type="button" onClick={() => navigate('/postlist')}>
          <RxDoubleArrowLeft />
          게시글 목록
        </StNavListBtn>
        <h3>커뮤니티</h3>
      </StTitle>
      {postData && (
        <StDonePostContainer>
          <StBoardContainer>
            <h3>{postData.title}</h3>
            <StUserInfo>
              <div className="user">
                <img alt="profileImg" src={postData.profileImage} />
                <div className="usercontainer">
                  <span className="username">{postData.nickname}</span>
                  <span>{formatDate(postData.createdAt)}</span>
                </div>
              </div>
              {postData && postData.nickname === nickName && (
                <StEditDeleteBtnContainer>
                  <span
                    onClick={() => navigate(`/editPost/${postId}`)}
                    role="button"
                    aria-hidden="true"
                  >
                    수정
                  </span>
                  <span
                    onClick={() => {
                      setIsDeleteModal(true);
                    }}
                    role="button"
                    aria-hidden="true"
                  >
                    삭제
                  </span>
                </StEditDeleteBtnContainer>
              )}
            </StUserInfo>
            <StContentWrapper>
              {postData.image !== '' ? (
                <img alt="plantImg" src={postData.image} />
              ) : (
                ''
              )}
              <StContent>{postData.content}</StContent>
            </StContentWrapper>
            <StTagWrappeer>
              <Button size="sd" background={palette.borderColor2}>
                {postData.tag}
              </Button>
            </StTagWrappeer>
            {Like === true ? (
              <StLikeWrapper>
                <BsFillHeartFill onClick={postLike} />
                <span>{postData.likeCnt}</span>
              </StLikeWrapper>
            ) : (
              <StLikeWrapper>
                <BsHeart onClick={postLike} />
                <span>{postData.likeCnt}</span>
              </StLikeWrapper>
            )}
          </StBoardContainer>
          <StCreateCommentWrapper>
            <span className="count_comment">
              {postData.commentCnt}개의 댓글
            </span>
            <div>
              <StCreateCommentArea
                placeholder="댓글을 작성하세요"
                value={comment}
                onChange={onCommentHandler}
                ref={commentRef}
              />
              <div>
                <StButton type="button" onClick={onRegCommentHandler}>
                  등록
                </StButton>
              </div>
            </div>
          </StCreateCommentWrapper>
          <StRepleContainer>
            {postData.commentList &&
              postData.commentList.map(v => {
                return (
                  <Comment
                    key={v.commentId}
                    comment={v}
                    getPostUser={getPost}
                    nickName={nickName}
                  />
                );
              })}
          </StRepleContainer>
        </StDonePostContainer>
      )}

      <DeleteConfirmModal
        open={isDeleteModal}
        onCloseHandler={onCloseDeleteModal}
        onDeleteHandler={onDeletePostHandler}
      />
    </StWrapper>
  );
}

const StWrapper = styled.div`
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
  padding: 4rem 0 2rem;
`;
const StTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0 2rem;
  @media (max-width: 500px) {
    font-size: 1.5rem;
    margin: 1rem 0 0.5rem;
  }
  > h3 {
    font-size: 2.5rem;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
    }
  }
`;
const StNavListBtn = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  border: none;
  font-size: 1.5rem;
  gap: 8px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 6px;
  }
  @media (max-width: 500px) {
    font-size: 0.8rem;
    gap: 4px;
  }
`;
const StBoardContainer = styled.div`
  border-radius: 8px;

  h3 {
    font-size: 2.1rem;
    font-weight: 700;
    margin: 0 auto 40px;
  }
`;
const StDonePostContainer = styled.div`
  padding: 5vw 6vw;
  box-shadow: ${palette.containerShadow1};
  margin-top: 5rem;
`;
const StRepleContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 40px 0;
  white-space: pre-line;
`;
const StUserInfo = styled.div`
  margin-bottom: 5rem;
  padding-top: 36px;
  justify-content: space-between;
  border-top: 1px solid ${palette.borderColor2};
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .usercontainer {
    display: flex;
    flex-direction: column;
    gap: 3px 0;
  }
  .username {
    font-weight: 700;
  }
`;
const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  img {
    max-width: 700px;
    margin-bottom: 30px;
    object-fit: contain;
  }
  p {
    width: 100%;
    font-size: 1.2rem;
    line-height: 1.5rem;
    white-space: pre-line;
  }
`;
const StContent = styled.p`
  width: 100px;
  overflow: hidden;
  word-wrap: break-word;
`;

const StTagWrappeer = styled.div`
  display: flex;
  gap: 0 8px;
  margin-top: 4rem;
  button {
    border-radius: 20px;
    border: none;
    background: ${palette.borderColor4};
    color: ${palette.white};
    font-weight: 600;
    padding: 6px 24px 7px 24px;
    font-size: 1rem;
    cursor: unset;
  }
`;

const StLikeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 5px;
  margin: 35px 0;
  svg {
    width: 25px;
    height: 25px;
  }
  span {
    font-size: 1.3rem;
  }
`;
const StCreateCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .count_comment {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const StCreateCommentArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 14px 16px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  margin-top: 20px;
  font-size: 1rem;
  border: 1px solid ${palette.borderColor2};
  border-radius: 8px;
`;
const StButton = styled.button`
  background-color: ${palette.mainColor};
  color: ${palette.white};
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  float: right;
  margin-top: 20px;
`;
const StEditDeleteBtnContainer = styled.div`
  display: flex;
  gap: 0 10px;
  span {
    cursor: pointer;
    color: ${palette.text.gray_7};
  }
`;
