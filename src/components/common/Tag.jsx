import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function Tag({ active, value, onClick, children }) {
  return (
    <StTagButton type="button" active={active} value={value} onClick={onClick}>
      {children}
    </StTagButton>
  );
}
const StTagButton = styled.button`
  background-color: ${props =>
    props.active ? palette.mainColor : palette.lightGray};
  color: ${palette.textColor1};
  color: ${props => (props.active ? palette.white : palette.textColor1)};
  font-weight: ${props => (props.active ? 'bold' : 'unset')};
  font-weight: bold;
  font-size: 14px;
  border-radius: 30px;
  border: none;
  padding: 4px 8px;
  width: 112px;
  height: 36px;
`;
