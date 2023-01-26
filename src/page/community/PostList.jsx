import styled from 'styled-components';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../styles/palette';
import { LeftArrow, RightArrow } from '../../components/community/Arrow';
import Button from '../../components/common/Button';
import Tag from '../../components/community/Tag';
import { TAGS } from '../../assets/constants';
import { getBestPost, getPostByTag } from '../../apis/community';
import TagPost from '../../components/community/TagPost';
import Best5Img from './Best5Img';

export default function PostList() {
  const [bestPostList, setBestPostList] = useState([]);
  const [tagPostList, setTagPostList] = useState([]);
  const [tag, setTag] = useState('질문과 답변');
  console.log({ bestPostList });
  const navigate = useNavigate();
  const getBestPostListApi = useCallback(async () => {
    const data = await getBestPost();
    setBestPostList(data.data);
  }, []);

  const getPostByTagApi = useCallback(async () => {
    const data = await getPostByTag(tag);
    console.log('getPostByTagApi');
    console.log(data);
    setTagPostList(data.data.content);
  }, [tag]);

  const onTagHandler = e => {
    e.preventDefault();
    console.log(e.target.value);
    setTag(e.target.value);
  };

  useEffect(() => {
    getBestPostListApi();
  }, [getBestPostListApi]);

  useEffect(() => {
    getPostByTagApi();
  }, [getPostByTagApi]);

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
            <button type="button" onClick={() => navigate('/createpost')}>
              글 작성하기
            </button>
          </Best5ImgHeader>
        </StHorizontalPaddingLayout>
        <Best5ImgWrapper>
          <ScrollMenuStInjection>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
              {bestPostList.map(v => (
                <Best5Img key={v.id} bestPostList={v} id={v.id} />
              ))}
            </ScrollMenu>
          </ScrollMenuStInjection>
        </Best5ImgWrapper>
      </StBest5Wrapper>
      <StHorizontalPaddingLayout>
        <StTagWrapper>
          {TAGS.map(v => (
            <Tag
              key={`${v}_tag_key`}
              active={tag === v} // true
              value={v}
              onClick={onTagHandler}
            >
              {v}
            </Tag>
          ))}
        </StTagWrapper>
      </StHorizontalPaddingLayout>
      <StHorizontalPaddingLayout>
        <StPostWrapper>
          <StFilterdWrapper>
            {tagPostList.map(v => (
              <TagPost key={v.id} postData={v} />
            ))}
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
  max-width: 1280px;
  width: 80%;
  margin: 7rem auto 3rem;
  @media (max-width: 768px) {
    margin: 4rem auto 3rem;
  }
  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.8rem;
      margin-top: 45px;
    }
  }
  @media (max-width: 1280px) {
    padding: 0px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StPostListHeader = styled.div``;
const StBest5Wrapper = styled.div``;
const StPostWrapper = styled.div``;
const StTagWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-flow: wrap;
  padding: 20px 0px;
  border-top: 1px solid ${palette.borderColor2};
  border-bottom: 1px solid ${palette.borderColor};
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
  button {
    min-width: 125px;
    padding: 13px 35px;
    font-size: 1.1rem;
    cursor: pointer;
    background: #47ad8e;
    border-radius: 12px;
    background: ${palette.mainColor};
    border: none;
    color: ${palette.white};
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
      justify-content: flex-start;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
