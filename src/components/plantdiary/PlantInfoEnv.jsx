import styled from 'styled-components';

export default function PlantInfoEnv({ title }) {
  return (
    <StPlantInfoEnvWrapper>
      <StPlantInfoEnv>
        <span>{title}</span>
      </StPlantInfoEnv>
    </StPlantInfoEnvWrapper>
  );
}

const StPlantInfoEnvWrapper = styled.div`
  flex-direction: column;
`;

const StPlantInfoEnv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
