import styled, { css } from 'styled-components';
import { palette } from '../../styles/palette';

const SIZES = {
  sm: css`
    --button-width-size: 100%;
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
    --button-width-size: 100%;
    --button-font-size: 1rem;
    --button-padding: 12px 16px;
    --button-radius: 6px;
  `,
  lg: css`
    --button-font-size: 1.25rem;
    --button-padding: 16px 20px;
    --button-radius: 8px;
  `,
};

// eslint-disable-next-line react/prop-types
function Button({ disabled, size, background, children, ...option }) {
  const sizeStyle = SIZES[size];
  return (
    <StyledButton
      sizeStyle={sizeStyle}
      flex={option.flex}
      background={background || palette.buttonBackgroundColor}
      border={option.border || 'none'}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${props => props.sizeStyle};
  ${props => props.flex};
  width: var(--button-width-size);
  font-size: var(--button-font-size);
  background: ${props => props.background};
  padding: var(--button-padding);
  cursor: pointer;
  min-width: fit-content;
  letter-spacing: 0.6px;
  line-height: 1.5;
  border: ${props => props.border};
  border-radius: var(--button-radius);
`;

export default Button;
