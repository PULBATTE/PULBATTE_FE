import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function ImgLoading() {
  return (
    <StLoadingContainer>
      <div className="loader1" />
    </StLoadingContainer>
  );
}

const StLoadingContainer = styled.div`
  width: 100%;
  display: block;
  aspect-ratio: 1/1;
  object-fit: cover;

  display: inline-block;
  height: 200px;
  position: relative;
  transition: all 0.2s ease;
  .loader1 {
    position: relative;
    height: 80px;
    width: 80px;
    border-radius: 80px;
    border: 3px solid ${palette.mainBackground};

    top: 28%;
    top: -webkit-calc(50% - 43px);
    top: calc(50% - 43px);
    left: 35%;
    left: -webkit-calc(50% - 43px);
    left: calc(50% - 43px);

    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: loader1 3s linear infinite;
    animation: loader1 3s linear infinite;
  }

  .loader1:after {
    content: '';
    position: absolute;
    top: -5px;
    left: 20px;
    width: 11px;
    height: 11px;
    border-radius: 10px;
    background-color: ${palette.mainColor};
  }

  @-webkit-keyframes loader1 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
