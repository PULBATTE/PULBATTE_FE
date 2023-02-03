import styled from 'styled-components';
import { palette } from '../../styles/palette';

/**
 * @param {number} rating
 * @param {number} maxRating
 * @returns {number[]}
 */
function makeRatingArr(rating, maxRating = 5) {
  const arr = [];
  for (let i = 0; i < maxRating; i += 1) {
    if (i < rating) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;
}

export default function CircleRating(props) {
  const {
    color,
    rating,
    gap,
    appendText,
    editable,
    onChangeRating,
    afterText,
  } = props;

  const ratingArr = makeRatingArr(rating);

  return (
    <StCircleContainer gap={gap}>
      <span>{appendText}</span>
      {ratingArr.map((v, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`rating_${i}`}>
          <label htmlFor={i}>
            <StInput
              id={i}
              type="checkbox"
              disabled={!editable}
              value={i + 1}
              readOnly
              onChange={onChangeRating}
            />
            <StSpan checked={v} color={color} />
          </label>
        </div>
      ))}
      <span>{afterText}</span>
    </StCircleContainer>
  );
}

const StCircleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => (props.gap ? props.gap : '10px')};

  label {
    position: relative;
  }
`;
const StInput = styled.input`
  /* cursor: pointer; */
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
`;

const StSpan = styled.div`
  background: ${props => (props.checked ? props.color : palette.borderColor1)};
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
  pointer-events: none;
`;
