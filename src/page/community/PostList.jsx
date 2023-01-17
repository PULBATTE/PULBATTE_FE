import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { palette } from '../../styles/palette';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { LeftArrow, RightArrow } from '../../components/community/Arrow';
import Button from '../../components/common/Button';
import Tag from '../../components/common/Tag';
import { TAGS } from '../../assets/constants';

const MOCK_DATA = {
  content: [
    {
      id: 1,
      title: '제목',
      nickname: '닉네임',
      content: '내용',
      tag: '자유',
      likeCount: 1,
      commentCount: 2,
      createAt: '2023-01-11T11:12:30.686',
      modifiedAt: '2023-01-11T11:12:30.686',
    },
    {
      id: 2,
      title: '제목2',
      nickname: '닉네임2',
      content: '내용2',
      tag: '자유2',
      likeCount: 1,
      commentCount: 2,
      createAt: '2023-01-11T11:12:30.686',
      modifiedAt: '2023-01-11T11:12:30.686',
    },
  ],
  pageable: 'INSTANCE',
  last: true,
  totalPages: 1,
  totalElements: 6,
  size: 6,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  first: true,
  numberOfElements: 6,
  empty: false,
};
const PAV_MOCK_DATA = [
  {
    id: 3,
    title: '제목',
    image:
      'https://mypotato.s3.ap-northeast-2.amazonaws.com/static/36a14fe7-9d35-4c97-b3b2-98ecd47fd7abUntitled.png',
  },
  {
    id: 6,
    title: '제목',
    image:
      'https://mypotato.s3.ap-northeast-2.amazonaws.com/static/5a127896-5795-4b2e-9828-7747df39e569Untitled.png',
  },
  {
    id: 5,
    title: '제목',
    image:
      'https://mypotato.s3.ap-northeast-2.amazonaws.com/static/2ec8ffd8-84d7-4eba-b21e-f465286cdcefUntitled.png',
  },
  {
    id: 4,
    title: '제목',
    image:
      'https://mypotato.s3.ap-northeast-2.amazonaws.com/static/7249f99b-51f4-446c-b86d-c3577bee6cbbUntitled.png',
  },
  {
    id: 2,
    title: '제목',
    image:
      'https://mypotato.s3.ap-northeast-2.amazonaws.com/static/51d80a82-c81c-45f2-a60d-90e0802b4f03Untitled.png',
  },
];
export default function PostList() {
  return (
    <StPostListContainer>
      <StHorizontalPaddingLayout>
        <StPostListHeader>
          <h1>커뮤니티</h1>
        </StPostListHeader>
      </StHorizontalPaddingLayout>
      <StBest5Wrapper>
        <StHorizontalPaddingLayout>
          <Best5ImgHeader>
            <h3>인기 게시물 Top5</h3>
            <Button
              width="124px"
              size="md"
              type="button"
              background={palette.mainColor}
              color={palette.white}
            >
              글 작성하기
            </Button>
          </Best5ImgHeader>
        </StHorizontalPaddingLayout>
        <Best5ImgWrapper>
          <ScrollMenuStInjection>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
              <Best5Img />
              <Best5Img />
              <Best5Img />
              <Best5Img />
              <Best5Img />
            </ScrollMenu>
          </ScrollMenuStInjection>
        </Best5ImgWrapper>
      </StBest5Wrapper>
      <StHorizontalPaddingLayout>
        <StTagWrapper>
          {TAGS.map(v => (
            <Tag
              key={`${v}_tag_key`}
              // active={tag === v} // true
              // value={v}
              // onClick={onTagHandler}
            >
              {v}
            </Tag>
          ))}
        </StTagWrapper>
      </StHorizontalPaddingLayout>
      <StHorizontalPaddingLayout>
        <StPostWrapper>
          <StFilterdWrapper>
            <StPost>
              <StPostContentWrapper>
                <StPostContent>
                  <h3>바질은 물을 얼마나 줘야 하나요</h3>
                  <p>
                    기관과 노래하며 인간의 평화스러운 피가 갑 이상을 끓는 미인을
                    이것이다. 싸인 불어 내려온 실로 피가 우리의 보라. 되려니와,
                    눈이
                  </p>
                </StPostContent>
                <StPostImg src="http://image.babosarang.co.kr/product/detail/E92/2107270935232163/_600.jpg" />
              </StPostContentWrapper>
              <StPostFooter>
                <img />
                <p className="nickName">footer</p>
                <p>
                  좋아요 <span>3</span>
                </p>
                <p>
                  댓글<span>3</span>
                </p>
              </StPostFooter>
            </StPost>
            <StPost>
              <StPostContentWrapper>
                <StPostContent>
                  <h3>바질은 물을 얼마나 줘야 하나요</h3>
                  <p>
                    기관과 노래하며 인간의 평화스러운 피가 갑 이상을 끓는 미인을
                    이것이다. 싸인 불어 내려온 실로 피가 우리의 보라. 되려니와,
                    눈이
                  </p>
                </StPostContent>
                <StPostImg src="http://image.babosarang.co.kr/product/detail/E92/2107270935232163/_600.jpg" />
              </StPostContentWrapper>
              <StPostFooter>
                <img />
                <p className="nickName">footer</p>
                <p>
                  좋아요 <span>3</span>
                </p>
                <p>
                  댓글<span>3</span>
                </p>
              </StPostFooter>
            </StPost>
            <StPost>
              <StPostContentWrapper>
                <StPostContent>
                  <h3>바질은 물을 얼마나 줘야 하나요</h3>
                  <p>
                    기관과 노래하며 인간의 평화스러운 피가 갑 이상을 끓는 미인을
                    이것이다. 싸인 불어 내려온 실로 피가 우리의 보라. 되려니와,
                    눈이
                  </p>
                </StPostContent>
                <StPostImg src="http://image.babosarang.co.kr/product/detail/E92/2107270935232163/_600.jpg" />
              </StPostContentWrapper>
              <StPostFooter>
                <img />
                <p className="nickName">footer</p>
                <p>
                  좋아요 <span>3</span>
                </p>
                <p>
                  댓글<span>3</span>
                </p>
              </StPostFooter>
            </StPost>
          </StFilterdWrapper>
        </StPostWrapper>
      </StHorizontalPaddingLayout>
    </StPostListContainer>
  );
}

const StHorizontalPaddingLayout = styled.div`
  @media (max-width: 1280px) {
    padding: 0px 20px;
  }
`;
const StPostListContainer = styled.div`
  margin: 0 auto;
  margin-top: 84px;
  margin-bottom: 84px;
  width: 1280px;
  @media (max-width: 1280px) {
    width: 100%;
    padding: 0px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StPostListHeader = styled.div``;
const StBest5Wrapper = styled.div``;
const StPostWrapper = styled.div``;

const StPost = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid black;
`;
const StPostFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-size: 13px;
  }
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    margin-left: 4px;
  }
  .nickName {
    font-weight: bold;
  }
`;
const StPostContent = styled.div`
  width: 100%;
  margin-right: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const StPostContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 16px;
  }
  p {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 17px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 8px;
    }
    p {
      margin-top: 8px;
      font-size: 15px;
    }
  }
`;
const StPostImg = styled.img`
  display: flex;
  flex-shrink: 0;
  width: 152px;
  height: 152px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 92px;
    height: 92px;
  }
`;
const StTagWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-flow: wrap;
  padding: 20px 0px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;
const StFilterdWrapper = styled.div``;
const Best5ImgHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 32px;
    height: 100%;
  }
`;
const Best5ImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: auto;
`;
const ScrollMenuStInjection = styled.div`
  width: 1280px;
  overflow: hidden;
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    @media (min-width: 1280px) {
      justify-content: center;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

// img 컴포
const Best5Img = () => (
  <StBestContainer>
    <StBest5ImgWrapper>
      <StBest5Img
        alt="plantImg"
        src="http://image.babosarang.co.kr/product/detail/E92/2107270935232163/_600.jpg"
      />
    </StBest5ImgWrapper>
    <p>
      ddsfㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㅇㄹㅁㅁㅇㅁㅇㄴㅇㅁㅇㅇㄹㅁsdfs
    </p>
  </StBestContainer>
);

const StBestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
  p {
    margin: 0;
    margin-top: 8px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const StBest5ImgWrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  overflow: hidden;
  border-radius: 16px;

  ::after {
    content: 'Best';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    left: 10px;
    top: 10px;
    width: 62px;
    height: 36px;
    background-color: ${palette.white};
    z-index: 100;
    font-size: 16px;
    font-weight: bold;
    color: ${palette.mainColor};
  }
`;
const StBest5Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
`;
