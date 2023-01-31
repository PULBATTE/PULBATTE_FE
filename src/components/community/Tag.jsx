import styled from 'styled-components';
import { palette } from '../../styles/palette';

export default function Tag({ props, active, value, onClick, children }) {
  return (
    <StTagButton type="button" active={active} value={value} onClick={onClick}>
      {children}
    </StTagButton>
  );
}
const StTagButton = styled.button`
  background-color: ${props =>
    props.active ? palette.borderColor4 : palette.white};
  color: ${palette.textColor1};
  color: ${props => (props.active ? palette.white : palette.textColor1)};
  font-weight: ${props => (props.active ? 'bold' : 'unset')};
  font-weight: bold;
  font-size: 14px;
  border-radius: 30px;
  border: 1px solid ${palette.borderColor4};
  padding: 4px 8px;
  width: 112px;
  cursor: pointer;
  height: 36px;
  @media (max-width: 500px) {
    width: fit-content;
    padding: 4px 20px;
    align-items: center;
  }
`;
