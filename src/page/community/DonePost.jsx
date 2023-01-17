import { useState, useEffect, useCallback, Suspense } from 'react';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import { formatDate } from '../../util/index';
import { PostComment } from '../../components/community/PostComment';
import { getPost, postComment } from '../../apis/community';

const MockData = {
  id: 30,
  title: '제목',
  content: '내용',
  nickname: 'qwer',
  tag: '자유',
  createdAt: '2022-12-22T00:04:45.020757',
  modifiedAt: '2022-12-22T00:04:45.020757',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgL2oyiz-0BuC-6UnKLmWDzn-0RQg4jsaQTNbs0Aq1W_JuxgOI2-BldCcAbaRZEy12pXs&usqp=CAU',
  likeCnt: 1,
  likeStatus: true,
  postImage: '',
  commentCnt: 3,
  commentList: [
    {
      id: 1,
      nickname: 'ssori',
      content: '댓글',
      createdAt: '2022-12-22T00:04:45.020757',
      modifiedAt: '2022-12-22T00:04:45.020757',
      replyList: {
        id: 1,
        nickname: '닉네임',
        content: '대 댓글 내용',
        createdAt: '2022-12-22T00:04:45.020757',
        modifiedAt: '2022-12-22T00:04:45.020757',
        replyList: {
          id: 1,
          nickname: '닉네임',
          content: '대 댓글 내용',
          createdAt: '2022-12-22T00:04:45.020757',
          modifiedAt: '2022-12-22T00:04:45.020757',
          replyList: {
            id: 1,
            nickname: '닉네임',
            content: '대 댓글 내용',
            createdAt: '2022-12-22T00:04:45.020757',
            modifiedAt: '2022-12-22T00:04:45.020757',
            replyList: {
              id: 1,
              nickname: '닉네임',
              content: '대 댓글 내용',
              createdAt: '2022-12-22T00:04:45.020757',
              modifiedAt: '2022-12-22T00:04:45.020757',
            },
          },
        },
      },
    },
    {
      id: 2,
      nickname: 'joon',
      content: '댓글 내용2',
      createdAt: '2022-12-22T00:04:45.020757',
      modifiedAt: '2022-12-22T00:04:45.020757',
      replyList: {
        id: 1,
        nickname: '닉네임',
        content: '댓글 내용',
        createdAt: '2022-12-22T00:04:45.020757',
        modifiedAt: '2022-12-22T00:04:45.020757',
      },
    },
  ],
};

export default function DonePost() {
  const [postData, setPostData] = useState();
  const [commentList, setCommentList] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  const getPostApi = useCallback(async () => {
    setIsLoading(true);
    const data = await getPost(postId);
    setPostData(data.data);
    setIsLoading(false);
  }, [postId]);

  useEffect(() => {
    getPostApi();
  }, [getPostApi]);

  useEffect(() => {
    postData && setCommentList(postData.commentList);
  });

  const onLikeHandler = () => {
    setIsClicked(_isClicked => !_isClicked);
  };

  const onCommentHandler = e => {
    setComment(e.target.value);
  };
  const onRegCommentHandler = async () => {
    const data = postComment(postId, 0, comment);
    console.log(data);
    console.log(postData);
    setIsLoading(true);
    await getPostApi();
    console.log(postData);
    setIsLoading(false);
  };
  console.log({ postData });
  return (
    <StDonePostContainer>
      {isLoading ? (
        <>loading..</>
      ) : (
        <>
          <StNavBar>
            <MdArrowBackIos />
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
            {postData.likeStatus ? (
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
          {console.log(commentList)}
          {/* {commentList.map(v => {
            return <PostComment key={v.id} comment={v} />;
          })} */}
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
