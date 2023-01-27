import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import testImg from '../../assets/image/testResult_01.png';
import { getTestInfoApi } from '../../apis/plantGuide';
import { palette } from '../../styles/palette';
import Button from '../../components/common/Button';
import { testPath, choicePath } from '../../apis/path';
import pgBack from '../../assets/image/pg_back.png';

export default function PlantResult() {
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState(null);
  console.log(testResult);
  useEffect(() => {
    getTestInfoApi()
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
          <span>{testResult?.resultString}</span>
          <div />
        </StTypeCard>
        <StPlantCard>
          <div className="plant_image_container">
            <span className="title_recommend">이런 식물과 어울려요!</span>
            <div className="recommended_plants_container">
              <div>
                <img src={testResult?.resultPlantImage} alt="" />
              </div>
              <div className="recommended_plants_comment">
                <span className="recommend_plants_name">
                  {testResult?.beginnerPlantName}
                </span>
                <span className="recommend_plants_described">
                  {testResult?.resultPlantString}
                </span>
              </div>
            </div>
          </div>
          <StGuideComment>
            <div className="guide_comment_container">
              <span className="comment_title">✔️ 식집사 가이드 </span>
              <span className="comment_content">
                식집사 가이드는 초보 식집사가 식물을 성공적으로 키울 수 있도록
                동기를 부여하기 위해 만들어졌어요. 한달간의 성장 그래프와 내
                식물의 성장을 비교하며 식집사로 거듭나보세요!
              </span>
            </div>
          </StGuideComment>
          <div className="recommended_platns_btn">
            <StButton type="button" onClick={() => navigate(choicePath)}>
              식집사 가이드 식물 구경하기
            </StButton>
            <StButton type="button" onClick={() => navigate(testPath)}>
              테스트 다시하기
            </StButton>
          </div>
        </StPlantCard>
      </StContent>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  padding: 4rem 0 3rem;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 71px);
  position: relative;
  background: linear-gradient(
    175.58deg,
    rgba(235, 241, 236, 0.8) 28.42%,
    rgba(187, 213, 205, 0.8) 97.79%
  );
  @media (max-width: 1280px) {
    height: 100%;
  }
  @media (max-width: 768px) {
    margin-top: 0;
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
  @media (max-width: 1280px) {
    flex-direction: column;
    align-items: center;
    gap: 5rem 0;
    margin: 50px auto;
  }
  @media (max-width: 768px) {
    width: 90%;
    gap: 2rem 0;
  }
`;

const StTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw;
  box-sizing: border-box;
  background: ${palette.white};
  max-width: 400px;
  gap: 10px 0;

  justify-content: space-between;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  @media (max-width: 1000px) {
    min-height: 60vh;
    padding: 40px;
  }

  .title_type {
    font-size: 1.9rem;
    font-weight: 800;
    color: ${palette.mainColor};
    @media (max-width: 500px) {
      font-size: 1.3rem;
    }
  }

  span {
    font-size: 1.1rem;
    line-height: 1.6rem;
    @media (max-width: 500px) {
      font-size: 0.9rem;
    }
  }
  img {
    max-width: 15rem;
    @media (max-width: 500px) {
      max-width: 200px;
    }
  }
`;
const StPlantCard = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 35px 0;
  .title_recommend {
    font-size: 1.6rem;
    font-weight: 800;
    color: ${palette.mainColor};
    @media (max-width: 500px) {
      font-size: 1.3rem;
    }
  }
  .plant_image_container {
    display: flex;
    flex-direction: column;
    gap: 25px 0;
    padding: 40px;
    border-top: 1px solid ${palette.borderColor1};
    border-bottom: 1px solid ${palette.borderColor1};
    background: ${palette.white};
    border-radius: 24px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      align-items: center;
    }
  }

  .recommended_plants_container {
    display: flex;
    gap: 0 25px;
    @media (max-width: 500px) {
      gap: 25px;
      flex-direction: column;
      align-items: center;
    }
    .recommend_plants_name {
      font-size: 1.3rem;
      font-weight: 800;
      @media (max-width: 500px) {
        font-size: 1.1rem;
      }
    }
    .recommend_plants_described {
      font-size: 1.2rem;
      line-height: 25px;
      @media (max-width: 500px) {
        font-size: 0.9rem;
        line-height: 1.3rem;
      }
    }
    .recommended_plants_comment {
      display: flex;
      flex-direction: column;
      gap: 10px 0;
      @media (max-width: 768px) {
        align-items: center;
      }
    }
    img {
      border-radius: 20px;
      max-width: 180px;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }
  .recommended_platns_btn {
    display: flex;
    justify-content: center;
    gap: 10px 0;
    flex-direction: column;
    align-items: center;
    button {
      font-size: 1rem;
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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  &:last-child {
    background: ${palette.white};
    color: ${palette.text.gray_90};
    &:active {
      background: #b6ddd1;
      color: #fff;
    }
  }
  &:active {
    background: #337461;
  }
`;
const StGuideComment = styled.div`
  padding: 24px;
  box-sizing: border-box;
  border-radius: 24px;

  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background: ${palette.white};
  .guide_comment_container {
    display: flex;
    flex-direction: column;
    gap: 8px 0;
    align-items: center;

    .comment_title {
      font-size: 1.1rem;
      font-weight: 700;
      @media (max-width: 500px) {
        font-size: 1rem;
      }
    }
    .comment_content {
      font-size: 1.1rem;
      @media (max-width: 500px) {
        font-size: 0.9rem;
        line-height: 1.3rem;
      }
    }
  }
`;
