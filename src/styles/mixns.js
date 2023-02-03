import styled, { css } from 'styled-components';

const addCssType = css`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const flexAlignCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexVerticalAlignCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const flexSpaceBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Animations
const ImageExpandAnimation = css`
  transition: transform 0.3s ease 0.1s;
  :hover {
    transform: scale(1.08);
    transition: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

export {
  addCssType,
  flexAlignCenter,
  flexSpaceBetween,
  flexVerticalAlignCenter,
  ImageExpandAnimation,
};
