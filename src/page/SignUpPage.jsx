/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function SignUpPage() {
  const formSchema = yup.object({
    email: yup
      .string()
      // .required('이메일을 입력해주세요')
      .email('이메일 형식이 아닙니다.'),
    password: yup
      .string()
      // .required('영문, 숫자포함 8자리를 입력해주세요')
      .min(8, '최소 8자리 이상 가능합니다')
      .max(15, '최대 15자리 까지 가능합니다')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        '영문 숫자포함 8자리를 입력해주세요.',
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
    nickname: yup
      .string()
      // .required('최소 2글자 이상을 입력해주세요')
      .min(2, '최소 2글자 이상 가능합니다')
      .max(12, '최대 12글자 까지 입니다')
      .matches(/^[a-zA-Z0-9가-힣]+$/, '영문, 한글, 숫자만 사용 가능합니다'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit}>
      <h1>회원가입</h1>
      <p>이메일</p>
      <StInput
        name="email"
        placeholder="이메일을 입력해 주세요"
        {...register('email')}
      />
      <StErrorMessage>
        {errors.email && <p>{errors.email.message}</p>}
      </StErrorMessage>
      <p>비밀번호</p>
      <StInput
        type="password"
        name="password"
        placeholder="영문, 숫자 조합 8글자 이상"
        {...register('password')}
      />
      <StErrorMessage>
        {errors.password && <p>{errors.password.message}</p>}
      </StErrorMessage>
      <StInput
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호를 한 번 더 입력해 주세요"
        {...register('passwordConfirm')}
      />
      <StErrorMessage>
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </StErrorMessage>
      <p>닉네임</p>
      <StInput
        name="nickname"
        placeholder="최소 2글자 이상의 별명을 입력해 주세요"
        {...register('nickname')}
      />
      <StErrorMessage>{errors.nickname?.message}</StErrorMessage>
      <StSubmitButton
        type="submit"
        // onClick={handleSubmit}
        // disabled={errors || watch()}
      >
        회원 가입하기
      </StSubmitButton>
    </form>
  );
}

const StInput = styled.input`
  width: 372px;
  height: 58px;
  display: block;
`;
const StSubmitButton = styled.button`
  display: block;
  width: 372px;
  height: 58px;
`;
const StErrorMessage = styled.span`
  min-height: 20px;
  font-size: 0.8rem;
  color: #de2626;
  display: flex;
  align-items: center;
  margin: 0;
  p {
    margin: 0;
  }
`;
