import { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { palette } from '../../styles/palette';

function Left({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}
function Right({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

const Button = styled.button`
  font-size: 32px;
  cursor: pointer;
  width: 32px;
  color: ${palette.mainColor};
  background-color: ${palette.lightGray};
  opacity: 20%;
  border: 0px;
  cursor: pointer;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  @media (min-width: 1280px) {
    display: none;
  }
`;

export function LeftArrow() {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Left onClick={() => scrollPrev()}>
      <BsChevronCompactLeft />
    </Left>
  );
}
export function RightArrow() {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Right onClick={() => scrollNext()}>
      <BsChevronCompactRight />
    </Right>
  );
}
