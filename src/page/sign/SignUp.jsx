/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { postSignUpApi, getSignUpCheckApi } from '../../apis/auth';
import { palette } from '../../styles/palette';

let cnt = 0;

export default function SignUp() {
  const Navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);
  const formSchema = yup.object({
    userId: yup
      .string()
      .email('이메일 형식이 아닙니다.')
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        {
          message: <p>이메일 양식에 맞게 입력해 주세요.</p>,
        },
      ),
    password: yup
      .string()
      .min(8, '최소 8자리 이상 가능합니다')
      .max(15, '최대 15자리 까지 가능합니다')
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/g,
        '영문, 숫자, 특수문자를 포함해주세요',
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
  });

  const onSubmit = async ({ userId, password }) => {
    if (!checkEmail) return alert('이메일 중복확인을 확인해주세요.');

    const res = await postSignUpApi({ userId, password });
    console.log(res);
    if (res.status == 200) {
      alert('회원가입이 완료되었습니다.');
      return Navigate('/api/user/signin');
    }
  };

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  cnt += 1;

  const onCheckEmailHandler = async () => {
    const check =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const emailValue = getValues('userId');
    // 유효성 검사 > 내가 입력한 이메일이 정규식에 매치 안할 때
    if (!emailValue.match(new RegExp(check))) {
      return alert('이메일의 양식을 확인해주세요.');
    }
    // 유효성 검사 > 내가 입력한 이메일이 정규식에 매치할 때
    const data = await getSignUpCheckApi(emailValue);
    console.log(data);
    if (data.data.statusCode == 200) {
      setCheckEmail(true);
      return alert('사용가능한 이메일입니다.');
    }
    return alert('중복된 이메일이 존재합니다.');
  };

  return (
    <StSignUpContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>회원가입</h2>
        <p>이메일</p>
        <div className="email_field">
          <StInput
            name="userId"
            placeholder="이메일을 입력해 주세요"
            {...register('userId')}
          />
          <button type="button" onClick={() => onCheckEmailHandler()}>
            중복확인
          </button>
        </div>
        <StErrorMessage>
          {errors.userId && <p>{errors.userId.message}</p>}
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
        <StSubmitButton
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          회원 가입하기
        </StSubmitButton>
      </form>
    </StSignUpContainer>
  );
}

const StSignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6rem auto;
  > form {
    padding: 2rem;
    box-sizing: border-box;
    max-width: 460px;
    width: 100%;
  }
  h2 {
    text-align: center;
  }
  .email_field {
    display: flex;
    gap: 0 10px;

    button {
      min-width: fit-content;
      border: 1px solid #eaeaea;
      padding: 0 10px;
      cursor: pointer;
    }
  }
`;
const StInput = styled.input`
  width: 100%;
  height: 50px;
  display: block;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  text-indent: 10px;
`;
const StSubmitButton = styled.button`
  background-color: ${palette.mainColor};
  border: none;
  border-radius: 4px;
  display: block;
  color: white;
  width: 100%;
  height: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
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
