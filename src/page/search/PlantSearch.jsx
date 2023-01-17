/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import CustomLabel from '../../components/search/CustomLabel';
import { palette } from '../../styles/palette';
import PlantsList from '../../components/search/PlantsList';
import { plantsSearch, plantsGlobalList } from '../../apis/plantsFilter';

export default function PlantSearch() {
  /*   const [filter, setFilter] = useState(null); */
  const [isClicked, setIsClicked] = useState(false);
  const search = useRef();
  const [plantsList, setPlantsList] = useState(null);

  // 식물 전체 리스트
  useEffect(() => {
    onCheckList();
  }, []);

  const onCheckList = () => {
    plantsGlobalList()
      .then(res => setPlantsList(res.data.plantList), setIsClicked(false))
      .catch(error => console.log(error));
  };

  const onSearchHandler = () => {
    if (window.event.keyCode == 13) {
      plantsSearch(search.current.value)
        .then(res => setPlantsList(res), setIsClicked(false))
        .catch(error => console.log(error));
    }
  };

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
          <button
            type="button"
            className="globalBtn"
            onClick={() => onCheckList()}
          >
            전체
          </button>
          <CustomLabel
            dataname="cactus"
            button="#초보자"
            setPlantsList={setPlantsList}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          <CustomLabel
            dataname="leaf"
            button="#잎감상"
            setPlantsList={setPlantsList}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          <CustomLabel
            dataname="flower"
            button="#꽃이피는"
            setPlantsList={setPlantsList}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          <CustomLabel
            dataname="fruit"
            button="#열매"
            setPlantsList={setPlantsList}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        </StFilterContainer>
        <PlantsList plantsList={plantsList} />
      </div>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  .container_inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-size: 2.8rem;
      margin-top: 80px;
      @media (max-width: 768px) {
        font-size: 1.9rem;
      }
      @media (max-width: 500px) {
        font-size: 1.5rem;
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
  gap: 0 20px;
  margin: 3rem 0;
  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  button {
    font-size: 1rem;
    padding: 6px 20px;
    border-radius: 20px;
    border: none;
    border: 1px solid #d9d9d9;
    color: #d9d9d9;
    cursor: pointer;
    &.globalBtn {
      color: white;
      background: green;
      border: none;
      &:active {
        border: none;
      }
    }
    &:active {
      border: 1px solid red;
    }
    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 6px 15px;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
      padding: 10px 20px;
    }
  }
`;
