import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlantInfoSelect from '../../components/plantdiary/PlantInfoSelect';
import waterIcon from '../../assets/image/water_drop.png';
import repottingIcon from '../../assets/image/spa.png';
import nutritionIcon from '../../assets/image/scatter_plot.png';
import { palette } from '../../styles/palette';
import PlantEnv from '../../components/plantdiary/PlantEnv';
import { createPlantJournalApi } from '../../apis/plantDiary';
import HorizontalPlantEnv from '../../components/plantdiary/HorizontalPlantEnv';

// TODO: HookForm
export default function AddPlant() {
  const [plantName, setPlantName] = useState('');
  const [imgSrc, setImgSrc] = useState({
    preview: undefined,
    upload: '',
  });
  const [plantShineData, setPlantShineData] = useState(3);
  const [plantWaterData, setPlantWaterData] = useState(3);
  const [plantWindeData, setPlantWindData] = useState(3);
  const [waterCycle, setWaterCycle] = useState();
  const [repottingCycle, setRepottingCycle] = useState();
  const [nutritionCycle, setNutritionCycle] = useState();
  const navigate = useNavigate();
  const imgInputRef = useRef();

  console.log(imgSrc);

  const onChangePlantName = e => {
    setPlantName(e.target.value);
  };
  const onUploadImgHandler = () => {
    setImgSrc({
      upload: imgInputRef.current.files[0],
      preview: URL.createObjectURL(imgInputRef.current.files[0]),
    });
  };

  const onWaterHandler = e => {
    setWaterCycle(e.target.value);
  };
  const onRepottingHandler = e => {
    setRepottingCycle(e.target.value);
  };
  const onNutritionHandler = e => {
    setNutritionCycle(e.target.value);
  };

  const onAddPlantHandler = async e => {
    if (!imgSrc.upload) {
      alert('이미지를 추가해 주세요');
      return;
    }
    const formData = new FormData();
    const request = {
      plantName,
      waterCycle: Number(waterCycle),
      repottingCycle: Number(repottingCycle) * 30,
      nutritionCycle: Number(nutritionCycle) * 30,
      selectWater: Number(plantWaterData),
      selectSunshine: Number(plantShineData),
      selectWind: Number(plantWindeData),
    };
    const blob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });
    formData.append('request', blob);
    imgSrc.upload && formData.append('image', imgSrc.upload);

    await createPlantJournalApi(formData);

    navigate(`/plantlist`);
  };

  return (
    <StAddPlantContainer>
      <StHeader>
        <h3>식물 추가하기</h3>
      </StHeader>
      <StPlantProfile>
        <div>
          <h3>식물이름</h3>
          <StPlantNameInput
            onChange={onChangePlantName}
            placeholder="식물 이름을 입력해 주세요"
          />
        </div>
        <div>
          <h3>식물 사진</h3>
          <label htmlFor="image">
            <StImageWrapper>
              <input
                hidden
                id="image"
                ref={imgInputRef}
                type="file"
                onChange={onUploadImgHandler}
              />
              {imgSrc.preview && (
                <StPrevImg
                  className="profile_image"
                  src={imgSrc.preview}
                  name="uploadImg"
                  alt="uploadImg"
                />
              )}
            </StImageWrapper>
          </label>
        </div>
        <StGridContainer>
          <StGridWrapper>
            <StGridHeader>
              <h3 className="grid_header">식물환경</h3>
            </StGridHeader>
            <StPlantEnv>
              <HorizontalPlantEnv
                type="water"
                editable
                rating={plantWaterData}
                handler={setPlantWaterData}
                gap="24px"
                appendText="분무"
                afterText="흠뻑"
              />
              <HorizontalPlantEnv
                type="sunny"
                editable
                rating={plantShineData}
                handler={setPlantShineData}
                gap="24px"
                appendText="그늘"
                afterText="양지"
              />
              <HorizontalPlantEnv
                type="air"
                editable
                rating={plantWindeData}
                handler={setPlantWindData}
                gap="24px"
                appendText="적게"
                afterText="많이"
              />
            </StPlantEnv>
          </StGridWrapper>
          <StGridWrapper>
            <StGridHeader>
              <h3>식물알림</h3>
              <p>주기를 입력하면 일정알림을 받을 수 있어요</p>
            </StGridHeader>
            <StPlantInfo>
              <StFlexInfoSelectWrapper>
                <PlantInfoSelect
                  title="물 주기"
                  icon={waterIcon}
                  optionNum={30}
                  optionString="일"
                  onChange={onWaterHandler}
                />
                <PlantInfoSelect
                  title="분갈이"
                  icon={repottingIcon}
                  optionNum={12}
                  optionString="개월"
                  onChange={onRepottingHandler}
                />
                <PlantInfoSelect
                  title="영양제"
                  icon={nutritionIcon}
                  optionNum={12}
                  optionString="개월"
                  onChange={onNutritionHandler}
                />
              </StFlexInfoSelectWrapper>
            </StPlantInfo>
          </StGridWrapper>
        </StGridContainer>
      </StPlantProfile>
      <StAddPlantButton onClick={onAddPlantHandler}>저장</StAddPlantButton>
    </StAddPlantContainer>
  );
}

const StAddPlantContainer = styled.div`
  width: 80%;

  max-width: 900px;
  padding: 4rem 0 2rem;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 1280px) {
    box-sizing: border-box;
  }
  @media (max-width: 768px) {
    margin-top: 0;
    width: 90%;
  }
  input {
    outline: none;
    text-indent: 10px;
  }
`;
const StHeader = styled.div`
  margin-top: 32px;
  text-align: center;
  width: 100%;
  font-size: 34px;
  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.8rem;
    }
  }
`;
const StPlantProfile = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 40px 0;

  h3 {
    font-size: 1.6rem;
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
  input {
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
`;
const StPlantNameInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid ${palette.borderColor1};
  &::placeholder {
    font-size: 1.3rem;
  }
`;
const StImageWrapper = styled.div`
  margin: 25px auto;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  aspect-ratio: 16 / 9;
  border: 5px dashed ${palette.borderColor1};
  border-radius: 16px;
  background-color: ${palette.pageBackgroundGray};
  overflow: hidden;
`;
const StPrevImg = styled.img`
  height: 100%;
`;

const StGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  @media (max-width: 1280px) {
    grid-template-columns: none;
  }
`;
const StGridWrapper = styled.div`
  width: 100%;
  &:first-child {
    display: flex;
    flex-direction: column;
    gap: 40px 0;
    @media (max-width: 768px) {
      gap: 20px 0;
    }
  }
  &:last-child {
    > div {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 1280px) {
    box-sizing: border-box;
    width: 100%;
  }
`;
const StGridHeader = styled.div`
  .grid_header {
    font-size: 1.6rem;
    color: ${palette.text.black_e1};
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
  p {
    font-size: 1rem;
    color: ${palette.textGray7};
  }
`;
const StPlantInfo = styled.div`
  width: 100%;
  h3 {
    font-size: 18px;
    text-align: center;
  }
`;

const StPlantEnv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 62px;
  width: 100%;
  @media (max-width: 768px) {
    gap: 45px 0;
  }
  h3 {
    font-size: 18px;
    text-align: center;
  }
`;
const StFlexInfoSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 55px;
  @media (max-width: 768px) {
    gap: 25px;
    > div {
      display: flex;
      align-items: center;
      gap: 0 15px;
    }
  }
  .plant_alarm {
    margin-top: 20px;
  }
`;
const StAddPlantButton = styled.button`
  background-color: ${palette.mainColor};
  color: ${palette.white};
  font-size: 22px;

  width: 212px;
  height: 56px;
  border: none;
  border-radius: 8px;
  margin: auto;
  display: block;
  margin-top: 50px;
`;
