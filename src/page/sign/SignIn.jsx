/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { BsChatFill } from 'react-icons/bs';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { setCookie, getCookie } from '../../apis/cookie';
import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import logo from '../../assets/image/logo.png';
import pbBack from '../../assets/image/pg_back.png';

export default function SignIn() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const [count, setCount] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const onSigninHandler = result => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/auth/signin`, {
        userId: result.email,
        password: result.password,
      })
      .then(response => {
        if (response.data.statusCode == 200) {
          const redirectUrl = searchParams.get('redirectUrl');
          localStorage.setItem('access_Token', response.data.accessToken);

          setCookie('refresh_Token', response.data.refreshToken);
          if (redirectUrl) {
            return navigate(redirectUrl);
          }
          return navigate('/');
        }

        return alert('아이디나 비밀번호를 다시 확인해주세요.');
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
      .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/g, {
        message: (
          <p>
            비밀번호는 최소 8자 이상, 15자 이하이며 공백을 제외한
            특수문자,알파벳 소문자,숫자이어야 합니다.
          </p>
        ),
      }),
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
          <div className="mobile_logo">
            <a href="/">
              <img src={logo} alt="로고이미지" />
            </a>
          </div>
          <h2>로그인</h2>
          <input
            type="email"
            {...register('email', { required: true })}
            autoComplete="off"
            placeholder="이메일을 입력해주세요."
          />
          <input
            type="password"
            {...register('password', { required: true })}
            autoComplete="off"
            placeholder="비밀번호를 입력해주세요."
          />

          <StErrorMessage>
            {errors.email?.message || errors.password?.message}
          </StErrorMessage>

          <Button
            style={{ fontWegiht: '600px' }}
            type="button"
            size="md"
            disabled="disabled"
            width="100%"
            color="#fff"
            onClick={handleSubmit(onSigninHandler)}
            background={palette.mainColor}
          >
            로그인
          </Button>
        </StFormField>
        <StBorderContainer />
        <a href={KAKAO_AUTH_URL}>
          <Button
            type="button"
            size="md"
            width="100%"
            flex={flex}
            border="transparent"
            background={palette.kakaoContainer}
          >
            <StKaKaoIcon />
            카카오로그인
          </Button>
        </a>
        <a href="/api/user/signup">
          <Button
            type="button"
            size="md"
            flex={flex}
            width="100%"
            background="#ffffff"
            border={`${palette.borderColor2}`}
          >
            이메일로 가입하기
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
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  height: calc(100vh - 80px);
  padding-top: 3rem;
  box-sizing: border-box;
  background: url(${pbBack}) no-repeat;
  @media (max-width: 768px) {
    max-width: none;
    padding: 2rem 0;
    margin: 0;
    position: fixed;
    width: 100vw;
    left: 0;
    top: 0;
    z-index: 6;
    background: #fff;
  }
  a {
    text-decoration: none;
  }
`;
const StSignInner = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 460px;
  width: 100%;
  gap: 2rem 0;
  margin: 0 auto;
  @media (max-width: 500px) {
    gap: 1rem 0;
  }
  h2 {
    text-align: center;
  }
`;
const StFormField = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  input {
    height: 50px;
    outline: none;
    text-indent: 10px;
    border: 1px solid ${palette.borderColor1};
    &::placeholder {
      color: ${palette.textColor1};
    }
  }

  .mobile_logo {
    text-align: center;
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
    img {
      width: 160px;
    }
  }
`;
const StBorderContainer = styled.div`
  border-top: 1px solid #ededed;
`;
const StKaKaoIcon = styled(BsChatFill)`
  font-size: 1.2rem;
`;
