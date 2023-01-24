import { useState, useEffect, useCallback, Suspense } from 'react';
import styled from 'styled-components';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import { formatDate } from '../../util/index';
import { Comment } from '../../components/community/Comment';
import {
  getPostUser,
  getPostGuest,
  postLike,
  postComment,
} from '../../apis/community';
import { getInfo } from '../../apis/auth';
import { getCookie } from '../../apis/cookie';

export default function DonePost() {
  const [postData, setPostData] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [nickName, setNickName] = useState('');
  const [Like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  const Token = getCookie('Token');

  const getPostApi = useCallback(async () => {
    setIsLoading(true);
    if (Token) {
      console.log('user');
      const data = await getPostUser(postId);
      console.log('postApi : ');
      console.log(data.data);

      const { likeStatus } = data.data;
      setLike(likeStatus);

      setPostData(data.data);
      setIsLoading(false);
    } else {
      console.log('guest');
      const data = await getPostGuest(postId);
      setPostData(data.data);
      setIsLoading(false);
    }
  }, [Token, postId]);

  const getInfoApi = useCallback(async () => {
    const data = await getInfo();
    setNickName(data.nickName);
    return data;
  }, []);

  const PostLikeApi = useCallback(async () => {
    const data = await postLike(postId);
    console.log({ data });
    setLike(_postLike => !_postLike);
    await getPostApi();
  }, [getPostApi, postId]);

  useEffect(() => {
    getInfoApi();
    getPostApi();
  }, [getInfoApi, getPostApi]);

  if (isLoading) {
    return <div> Loading...</div>;
  }

  const onLikeHandler = () => {
    if (Token) {
      // -postLikeApi 호출
      PostLikeApi();
      // -getPostPostLike
    }
    if (!Token) {
      alert('로그인이 필요합니다.');
    }
    // Token
    //   ? setIsClicked(_isClicked => !_isClicked)
    //   :
  };

  const onCommentHandler = e => {
    setComment(e.target.value);
  };
  const onRegCommentHandler = async () => {
    setIsLoading(true);
    await postComment(postId, 0, comment);
    setComment('');
    await getPostApi();
    setIsLoading(false);
  };
  console.log({ postData });
  return (
    <StDonePostContainer>
      {postData && (
        <>
          <StNavBar>
            <span>게시글 목록</span>
          </StNavBar>
          <StBoardContainer>
            <h3>{postData.title}</h3>
            <StUserInfo>
              <img alt="profileImg" src={postData.profileImage} />
              <div className="usercontainer">
                <span>{postData.nickname}</span>
                <span>{formatDate(postData.createdAt)}</span>
              </div>
            </StUserInfo>
            <StContentWrapper>
              <img alt="plantImg" src={postData.image} />
              <span>{postData.content}</span>
            </StContentWrapper>
            <StTagWrappeer>
              <Button size="sd" background={palette.borderColor2}>
                {postData.tag}
              </Button>
            </StTagWrappeer>
            <StDivider />
            {Like === true ? (
              <StLikeWrapper>
                <BsFillHeartFill onClick={onLikeHandler} />
                <span>{postData.likeCnt}</span>
              </StLikeWrapper>
            ) : (
              <StLikeWrapper>
                <BsHeart onClick={onLikeHandler} />
                <span>{postData.likeCnt}</span>
              </StLikeWrapper>
            )}
          </StBoardContainer>
          <StCreateCommentWrapper>
            <span>{postData.commentCnt}개의 댓글</span>
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
          </StCreateCommentWrapper>
          {/* map함수를 사용해서 PostComment 여러개 생성 */}
          {/* PostComment는 컴포넌트로 분리 */}
          {postData.commentList &&
            postData.commentList.map(v => {
              return (
                <Comment
                  key={v.commentId}
                  comment={v}
                  getPostUser={getPostApi}
                  nickName={nickName}
                />
              );
            })}
        </>
      )}
    </StDonePostContainer>
  );
}

const StDonePostContainer = styled.div`
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
const StBoardContainer = styled.div`
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
const StContentWrapper = styled.div`
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

const StTagWrappeer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 08px;
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
const StLikeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0 5px;
  margin-top: 20px;
`;
const StCreateCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const StCreateCommentArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  margin-top: 10px;
`;
const StButton = styled.button`
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
