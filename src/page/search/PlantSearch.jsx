/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import CustomLabel from '../../components/search/CustomLabel';
import { palette } from '../../styles/palette';
import PlantsList from '../../components/search/PlantsList';
import {
  plantsSearchApi,
  plantsGlobalListApi,
  plantsSearchBeginnerlApi,
  plantsFilterApi,
} from '../../apis/plantsFilter';
import PagingCard from '../../components/search/PagingCard';

export default function PlantSearch() {
  const [isClicked, setIsClicked] = useState(false);
  const search = useRef();
  const [plantsList, setPlantsList] = useState(null);
  const [category, setCategory] = useState('all');

  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['category', category],
    ({ pageParam = 0 }) => plantsFilterApi(category, pageParam),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    },
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  /*   if (status === 'loading') return console.log('loading');
  if (status === 'error') return console.log('error'); */

  const onSearchHandler = () => {
    if (window.event.keyCode == 13) {
      setIsClicked(false);
      plantsSearchApi(search.current.value)
        .then(res => setPlantsList(res))
        .catch(error => console.log(error));
    }
  };

  const addTodo = async () => {};

  return (
    <StWrapper>
      <div className="container_inner">
        <h3>식물 찾아보기</h3>
        <StSearchContainer>
          <StSearchIcon />
          <input
            type="search"
            placeholder="식물 이름을 검색해보세요"
            onKeyUp={() => onSearchHandler()}
            ref={search}
          />
        </StSearchContainer>
        <StFilterContainer>
          <CustomLabel
            dataname="all"
            button="#전체"
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setCategory={setCategory}
          />
          <CustomLabel
            dataname="beginner"
            button="#초보자"
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setCategory={setCategory}
          />
          <CustomLabel
            dataname="leaf"
            button="#잎이있는"
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            setCategory={setCategory}
          />
          <CustomLabel
            dataname="flower"
            button="#꽃이피는"
            setCategory={setCategory}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          <CustomLabel
            dataname="fruit"
            button="#열매가있는"
            setCategory={setCategory}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          <CustomLabel
            dataname="cactus"
            button="#다육/선인장"
            setCategory={setCategory}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        </StFilterContainer>

        {isClicked ? (
          <StContent>
            {data?.pages.map((page, index) => (
              <StListInner key={index}>
                {page?.posts?.map(post => (
                  <PagingCard key={post.id} post={post} />
                ))}
              </StListInner>
            ))}
            {isFetchingNextPage ? <div>Loading</div> : <div ref={ref} />}
          </StContent>
        ) : (
          <PlantsList plantsList={plantsList} />
        )}
      </div>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  padding: 4rem 0 3rem;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 71px);
  position: relative;

  @media (max-width: 1280px) {
    height: 100%;
  }
  @media (max-width: 768px) {
    margin-top: 0;
  }
  .container_inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
      gap: 20px 0;
    }
    h3 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
      @media (max-width: 500px) {
        font-size: 1.5rem;
        margin: 2rem 0;
      }
    }
  }
`;
const StSearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.8rem;
  color: #aeaeae;
  @media (max-width: 768px) {
    transform: translateY(-55%);
    font-size: 1.4rem;
  }
`;
const StSearchContainer = styled.div`
  position: relative;
  max-width: 620px;
  width: 80%;
  border-bottom: 1px solid ${palette.borderColor1};
  input {
    padding: 15px 30px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 1.4rem;
    text-indent: 10px;
    &::placeholder {
      font-size: 1.4rem;
    }
    @media (max-width: 768px) {
      &::placeholder {
        font-size: 1.2rem;
      }
      font-size: 1.2rem;
      padding: 10px 20px;
    }
    @media (max-width: 500px) {
      &::placeholder {
        font-size: 0.9rem;
      }
      font-size: 0.9rem;
      padding: 10px 20px;
    }
  }
`;
const StFilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 2.5rem 0 6rem;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1.5rem 0 1rem;
    width: 90%;
  }
  button {
    padding: 10px 30px;
    border-radius: 25px;
    font-size: 1.2rem;
    border: none;
    border: 1px solid #d9d9d9;
    color: #d9d9d9;
    cursor: pointer;
    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 6px 12px;
    }
    &.globalBtn {
      color: white;
      background: ${palette.mainColor};
      border: none;
      &:active {
        border: none;
      }
    }
    &.beginnerBtn {
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 6px 15px;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;
const StListInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  max-width: 1372px;
  gap: 35px 20px;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const StContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px 0;
  @media (max-width: 1440px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
