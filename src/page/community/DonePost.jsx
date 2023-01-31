import { useState, useEffect, useCallback, Suspense } from 'react';
import styled from 'styled-components';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import { formatDate } from '../../util/index';
import { Comment } from '../../components/community/Comment';
import {
  getPostUserApi,
  getPostGuestApi,
  postLikeApi,
  postCommentApi,
} from '../../apis/community';
import { getInfoApi } from '../../apis/auth';
import { getCookie } from '../../apis/cookie';

export default function DonePost() {
  const [postData, setPostData] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [nickName, setNickName] = useState('');
  const [Like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  const Token = localStorage.getItem('access_Token');
  console.log(Token);
  const getPost = useCallback(async () => {
    setIsLoading(true);
    if (Token) {
      console.log('user');
      const data = await getPostUserApi(postId);
      console.log(data.data);

      const { likeStatus } = data.data;
      setLike(likeStatus);

      setPostData(data.data);
      setIsLoading(false);
    } else {
      console.log('guest');
      const data = await getPostGuestApi(postId);
      setPostData(data.data);
      setIsLoading(false);
    }
  }, [Token, postId]);

  const getInfo = useCallback(async () => {
    const data = await getInfoApi();
    setNickName(data.nickName);
    return data;
  }, []);

  const postLike = useCallback(async () => {
    const data = await postLikeApi(postId);
    console.log({ data });
    setLike(_postLikeApi => !_postLikeApi);
    await getPost();
  }, [getPost, postId]);

  useEffect(() => {
    getInfo();
    getPost();
  }, [getInfo, getPost]);

  if (isLoading) {
    return <div> Loading...</div>;
  }

  const onCommentHandler = e => {
    setComment(e.target.value);
  };
  const onRegCommentHandler = async () => {
    setIsLoading(true);
    await postCommentApi(postId, 0, comment);
    setComment('');
    await getPost();
    setIsLoading(false);
  };
  console.log({ postData });
  return (
    <StWrapper>
      <h3>커뮤니티</h3>
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
              <StTagWrappeer>
                <Button size="sd" background={palette.borderColor2}>
                  {postData.tag}
                </Button>
              </StTagWrappeer>
            </StUserInfo>
            <StContentWrapper>
              {postData.image !== '' ? (
                <img alt="plantImg" src={postData.image} />
              ) : (
                ''
              )}
              <span>{postData.content}</span>
            </StContentWrapper>

            <StDivider />
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
              />
              <div>
                <StButton type="button" onClick={onRegCommentHandler}>
                  등록
                </StButton>
              </div>
            </div>
          </StCreateCommentWrapper>
          {/* map함수를 사용해서 PostComment 여러개 생성 */}
          {/* PostComment는 컴포넌트로 분리 */}
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
    </StWrapper>
  );
}

const StWrapper = styled.div`
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
  padding: 4rem 0 2rem;
  > h3 {
    text-align: center;
    font-size: 2.5rem;
    margin: 6rem 0 2rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin: 1rem 0 0.5rem;
    }
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
`;
const StUserInfo = styled.div`
  margin-bottom: 7rem;
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
    .username {
      font-weight: 700;
    }
  }
`;
const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    max-width: 700px;
    margin-bottom: 30px;
    object-fit: contain;
  }
  span {
    font-size: 1.2rem;
    line-height: 1.5rem;
    white-space: pre-line;
  }
`;

const StTagWrappeer = styled.div`
  display: flex;
  gap: 0 8px;
  button {
    border-radius: 20px;
    border: none;
    background: ${palette.borderColor4};
    color: ${palette.white};
    font-weight: 600;
    padding: 6px 24px 7px 24px;
    font-size: 1rem;
  }
`;
const StDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #eaeaea;
  margin-top: 30px;
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
    font-size: 1.1rem;
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
