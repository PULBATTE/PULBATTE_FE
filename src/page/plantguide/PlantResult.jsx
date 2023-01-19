import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import testImg from '../../assets/image/testResult_01.png';
import { getTestInfo } from '../../apis/plantGuide';
import { palette } from '../../styles/palette';
import Button from '../../components/common/Button';
import { testPath, choicePath } from '../../apis/path';

export default function PlantResult() {
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState(null);
  console.log(testResult);
  useEffect(() => {
    getTestInfo()
      .then(res => setTestResult(res))
      .catch(error => console.log(error));
  }, []);
  return (
    <StWrapper>
      <div className="guide_title_container">
        <h3>식집사 테스트</h3>
      </div>
      <StContent>
        <StTypeCard>
          <span className="title_type">{testResult?.resultTitle}</span>
          <img src={testResult?.resultImage} alt="" />
          <span>{testResult?.resultPlantString}</span>
          <div />
        </StTypeCard>
        <StPlantCard>
          <div className="plant_image_container">
            <span className="title_recommend">이런식물과 어울려요!</span>
            <div className="recommended_plants_container">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNXl-21PEqWGmGAZTd2cQ3W5Lk0yZhmkFsKA&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="recommended_plants_comment">
                <span className="recommend_plants_name">
                  {testResult?.beginnerPlantName}
                </span>
                <span className="recommend_plants_described">
                  {testResult?.resultString}
                </span>
              </div>
            </div>
          </div>
          <div className="recommended_platns_btn">
            <StButton
              type="button"
              size="md"
              onClick={() => navigate(choicePath)}
            >
              식집사 가이드 식물 구경하기
            </StButton>
            <StButton
              type="button"
              size="md"
              onClick={() => navigate(testPath)}
            >
              테스트 다시하기
            </StButton>
          </div>
        </StPlantCard>
      </StContent>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  h3 {
    text-align: center;
    font-size: 2.1rem;
    margin-top: 65px;
    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin-top: 45px;
    }
  }
  .guide_title_container {
    text-align: center;
  }
`;
const StContent = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  gap: 0 30px;
  width: 80%;
  max-width: 1372px;
  width: 80%;
  margin-top: 50px;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    gap: 5rem 0;
    margin: 50px auto;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const StTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw;
  box-sizing: border-box;
  max-width: 400px;
  height: 65vh;
  justify-content: space-between;
  box-shadow: 0 0 7px 2px rgb(0 0 0 / 20%);
  border-radius: 16px;
  @media (max-width: 1000px) {
    min-height: 60vh;
    padding: 40px;
  }
  @media (max-width: 500px) {
    height: 70vh;
  }
  .title_type {
    font-size: 1.4rem;
    font-weight: 800;
    color: ${palette.mainColor};
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
  span {
    line-height: 25px;
  }
  img {
    max-width: 240px;
    @media (max-width: 500px) {
      max-width: 200px;
    }
  }
`;
const StPlantCard = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 45px 0;
  .title_recommend {
    font-size: 1.2rem;
    font-weight: 800;
    color: ${palette.mainColor};
  }
  .plant_image_container {
    display: flex;
    flex-direction: column;
    gap: 25px 0;
    padding: 30px 2vw;
    border-top: 1px solid ${palette.borderColor1};
    border-bottom: 1px solid ${palette.borderColor1};
  }
  .recommended_plants_container {
    display: flex;
    gap: 0 25px;
    @media (max-width: 500px) {
      gap: 25px;
      flex-direction: column;
    }
    .recommend_plants_name {
      font-size: 1.2rem;
      font-weight: 800;
    }
    .recommend_plants_described {
      line-height: 25px;
    }
    .recommended_plants_comment {
      display: flex;
      flex-direction: column;
      gap: 10px 0;
    }
    img {
      border-radius: 20px;
      max-width: 180px;
    }
  }
  .recommended_platns_btn {
    display: flex;
    justify-content: center;
    gap: 10px 0;
    flex-direction: column;
    align-items: center;
    button {
      border-radius: 30px;
    }
  }
`;
const StButton = styled.button`
  padding: 15px 25px;
  border: none;
  width: 300px;
  border-radius: 30px;
  background: #47ad8e;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  cursor: pointer;
  &:active {
    background: #337461;
  }
`;
