import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlantInfoSelect from '../../components/plantdiary/PlantInfoSelect';
import waterIcon from '../../assets/image/water_drop.png';
import shineIcon from '../../assets/image/wb_sunny.png';
import airIcon from '../../assets/image/air.png';
import repottingIcon from '../../assets/image/spa.png';
import nutritionIcon from '../../assets/image/scatter_plot.png';
import { palette } from '../../styles/palette';
import PlantEnv from '../../components/plantdiary/PlantEnv';
import { createPlantJournal } from '../../apis/plantDiary';

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
    e.preventDefault();

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
    console.log({ request });
    console.log(imgSrc.upload);
    const blob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });
    formData.append('request', blob);
    imgSrc.upload && formData.append('image', imgSrc.upload);
    console.log(formData);
    const res = await createPlantJournal(formData);
    console.log({ res });
    navigate(`/plantlist`);
  };
  console.log(plantName);
  return (
    <StAddPlantContainer>
      <StHeader>
        <h3>식물 추가하기</h3>
      </StHeader>
      <StPlantProfile>
        <h3>식물이름</h3>
        <StPlantNameInput
          onChange={onChangePlantName}
          placeholder="식물 이름을 입력해 주세요"
        />
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
      </StPlantProfile>
      <StGridContainer>
        <StGridWrapper>
          <StGridHeader>
            <h3 className="grid_header">식물환경</h3>
          </StGridHeader>
          <StPlantEnv>
            <PlantEnv
              title="물 주는 양"
              name="water"
              isDisabled={false}
              src={waterIcon}
              checkPoint={plantWaterData}
              handler={setPlantWaterData}
              gap="24px"
              appendText="분무"
              afterText="흠뻑"
            />
            <PlantEnv
              title="일조량"
              name="sunny"
              isDisabled={false}
              src={shineIcon}
              checkPoint={plantShineData}
              handler={setPlantShineData}
              gap="24px"
              appendText="그늘"
              afterText="양지"
            />
            <PlantEnv
              title="통풍"
              name="air"
              isDisabled={false}
              src={airIcon}
              checkPoint={plantWindeData}
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
      <StAddPlantButton onClick={onAddPlantHandler}>저장</StAddPlantButton>
    </StAddPlantContainer>
  );
}

const StAddPlantContainer = styled.div`
  width: 768px;
  margin: 0 auto;
  @media (max-width: 1280px) {
    box-sizing: border-box;
    width: 100%;
  }
`;
const StHeader = styled.div`
  margin-top: 32px;
  text-align: center;
  width: 100%;
  font-size: 34px;
`;
const StPlantProfile = styled.div`
  width: 100%;
  font-size: 20px;
`;
const StPlantNameInput = styled.input`
  width: 768px;
  height: 32px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid ${palette.borderColor1};
`;
const StImageWrapper = styled.div`
  margin: 0 auto;
  width: 500px;
  aspect-ratio: 16 / 9;
  border: 2px dashed ${palette.borderColor1};
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
  width: 384px;

  @media (max-width: 1280px) {
    box-sizing: border-box;
    width: 100%;
  }
`;
const StGridHeader = styled.div`
  .grid_header {
    font-size: 20px;
    color: ${palette.text.black_e1};
  }
  p {
    font-size: 14px;
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
  gap: 62px;
  width: 100%;

  h3 {
    font-size: 18px;
    text-align: center;
  }
`;
const StFlexInfoSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 55px;
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
