import styled, { css } from 'styled-components';
import { palette } from '../../styles/palette';

const SIZES = {
  sm: css`
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 4px;
  `,
  md: css`
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

function Button({
  disabled,
  size,
  width,
  color,
  background,
  children,
  click,
  submit,
  border,
  ...option
}) {
  const sizeStyle = SIZES[size];
  return (
    <StyledButton
      sizeStyle={sizeStyle}
      flex={option.flex}
      color={color}
      width={width}
      onClick={() => submit}
      background={background}
      border={border}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${props => props.sizeStyle};
  ${props => props.flex};
  width: ${props => props.width};
  font-size: var(--button-font-size);
  background: ${props => props.background};
  padding: var(--button-padding);
  cursor: pointer;
  min-width: fit-content;
  color: ${props => props.color};
  letter-spacing: 0.6px;
  line-height: 1.5;
  border: 1px solid ${props => props.border};
  border-radius: var(--button-radius);
`;

export default Button;
