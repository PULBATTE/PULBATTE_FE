import styled from 'styled-components';

import PlantCalendar from '../../../components/plantdiary/PlantCalendar';

export default function PlantDiary() {
  return (
    <StTabSection>
      <StPlantInfoWrap>
        <PlantCalendar />
      </StPlantInfoWrap>
      <StPlantInfoWrap />
    </StTabSection>
  );
}

const StTabSection = styled.section`
  display: flex;
  gap: 0 5rem;
  margin: 40px 20px 20px 20px;
  max-width: 1120px;

  @media (max-width: 1120px) {
    flex-direction: column;
    width: 100%;
    min-width: 350px;
    gap: 4rem 0;
  }
  @media (max-width: 500px) {
    gap: 25px 0;
  }
`;
const StPlantInfoWrap = styled.article`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px 0;
  @media (max-width: 1120px) {
    padding: 0px;
  }
`;
