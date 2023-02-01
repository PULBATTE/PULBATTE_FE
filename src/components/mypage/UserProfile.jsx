import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BiImageAlt } from 'react-icons/bi';
import Button from '../common/Button';
import { palette } from '../../styles/palette';

export default function UserProfile({
  onChangeImgHandler,
  uploadProfileImg,
  changeProfile,
  uploadNickName,
  nickName,
  onCheckNickNameHandler,
  setChangeNickName,
  changeNickName,
}) {
  return (
    <div className="image_container">
      <StUserImageContainer>
        <img
          src={uploadProfileImg?.preview || uploadProfileImg?.image}
          alt="프로필 이미지"
        />
        {changeProfile ? (
          <StBackgroundContainer className="background_container">
            <label htmlFor="upload_img">
              <BiImageAlt />
              <span>사진변경</span>
            </label>
            <input
              type="file"
              id="upload_img"
              onChange={onChangeImgHandler}
              hidden
            />
          </StBackgroundContainer>
        ) : (
          ''
        )}
      </StUserImageContainer>
      {changeProfile ? (
        <StModifyContainer>
          {changeNickName ? (
            <>
              <input
                type="text"
                ref={nickName}
                defaultValue={uploadNickName}
                maxLength="10"
              />
              <Button
                type="button"
                size="sm"
                width="fit-content"
                border={palette.mainColor}
                color={palette.mainColor}
                background={palette.white}
                submit={onCheckNickNameHandler}
              >
                중복확인
              </Button>
            </>
          ) : (
            <>
              <input
                type="text"
                ref={nickName}
                defaultValue={uploadNickName}
                disabled
              />
              <Button
                type="button"
                size="sm"
                width="fit-content"
                border={palette.mainColor}
                color={palette.mainColor}
                background={palette.white}
                submit={() => setChangeNickName(true)}
              >
                닉네임수정
              </Button>
            </>
          )}
        </StModifyContainer>
      ) : (
        <span className="nickname">{uploadNickName}</span>
      )}
    </div>
  );
}
const StUserImageContainer = styled.div`
  position: relative;
  &:hover .background_container {
    opacity: 1;
  }
`;
const StBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in-out;
  opacity: 0;
  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px 0;
    cursor: pointer;
  }
  svg,
  span {
    color: ${palette.white};
  }
  svg {
    font-size: 1.5rem;
  }
  span {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;
const StModifyContainer = styled.div`
  display: flex;
  gap: 0 10px;
  width: 100%;
  input {
    width: 100%;
    text-indent: 10px;
    outline: none;
  }
`;
