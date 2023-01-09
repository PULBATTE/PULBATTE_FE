/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { BsChatFill, BsWatch } from 'react-icons/bs';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { instance } from '../../apis/axios';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';

export default function SignIn() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  const onSigninHandler = result => {
    console.log(result.email, result.password);

    instance
      .post('/api/auth/signin', {
        userId: result.email,
        password: result.password,
      })
      .then(response => {
        alert('로그인이 되었습니다.');
        localStorage.setItem('Token', response.headers.authorization);
      })
      .catch(error => console.log(error));
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('유효하지 않은 이메일입니다.')
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        {
          message: <p>이메일 양식에 맞게 입력해 주세요.</p>,
        },
      )
      .required('이메일 입력은 필수입니다.'),
    password: yup
      .string()
      .min(8, '비밀번호는 최소 8글자 이상입니다.')
      .max(15, '비밀번호는 최대 15글자 입니다.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/g,
        {
          message: (
            <p>
              비밀번호는 최소 8자 이상, 15자 이하이며 공백을 제외한
              특수문자,알파벳 대소문자,숫자이어야 합니다.
            </p>
          ),
        },
      ),
  });
  const {
    register,
    getValues,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      // 초기값 설정
      email: '',
      password: '',
    },
  });

  const flex = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0 8px',
  };
  return (
    <StSignConatainer>
      <StSignInner>
        <StFormField action="" onSubmit={handleSubmit(onSigninHandler)}>
          <h2>로그인</h2>
          <input
            type="email"
            {...register('email', { required: true })}
            autoComplete="off"
            placeholder="이메일을 입력해주세요."
          />
          <input
            type="text"
            {...register('password', { required: true })}
            autoComplete="off"
            placeholder="비밀번호를 입력해주세요."
          />

          <StErrorMessage>
            {errors.email?.message || errors.password?.message}
          </StErrorMessage>

          <Button
            type="button"
            size="md"
            disabled="disabled"
            onClick={handleSubmit(onSigninHandler)}
            background={palette.buttonBackgroundColor}
          >
            로그인
          </Button>
        </StFormField>
        <StBorderContainer />
        <a href={KAKAO_AUTH_URL}>
          <Button
            type="button"
            size="md"
            flex={flex}
            background={palette.kakaoContainer}
          >
            <StKaKaoIcon />
            카카오로그인
          </Button>
        </a>
        <a href="/api/auth/signup">
          <Button
            type="button"
            size="md"
            flex={flex}
            background="#ffffff"
            border={`1px solid ${palette.borderColor1}`}
          >
            이메일로 로그인
          </Button>
        </a>
      </StSignInner>
    </StSignConatainer>
  );
}
const StErrorMessage = styled.span`
  min-height: 20px;
  font-size: 0.8rem;
  color: #de2626;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  p {
    margin: 0;
  }
`;
const StSignConatainer = styled.div`
  max-width: 460px;
  margin: 6rem auto;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  a {
    text-decoration: none;
  }
`;
const StSignInner = styled.div`
  padding: 2rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  h2 {
    text-align: center;
  }
`;
const StFormField = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  input {
    height: 35px;
    outline: none;
    text-indent: 10px;
  }
`;
const StBorderContainer = styled.div`
  border-top: 1px solid #ededed;
`;
const StKaKaoIcon = styled(BsChatFill)`
  font-size: 1.2rem;
`;
