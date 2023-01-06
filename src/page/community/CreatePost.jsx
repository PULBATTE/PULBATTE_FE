import React, { useState } from 'react';
import styled from 'styled-components';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
  };
  const onChangeContentHandler = e => {
    setContent(e.target.value);
  };
  return (
    <StCreateForm>
      <h3>글 작성하기</h3>
      <StButton>글 등록하기</StButton>
      <h4>주제 선택</h4>
      <StTitlearea
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={onChangeTitleHandler}
      />
      <StContentarea
        placeholder="내용을 작성해 주세요"
        value={content}
        onChange={onChangeContentHandler}
      />
    </StCreateForm>
  );
}

const StCreateForm = styled.div`
  width: 1000px;
  margin: 0 auto;
  h3 {
    font-size: 30px;
  }
  h4 {
    font-size: 26px;
  }
`;
const StButton = styled.button`
  border-radius: 10px;
  float: right;
  padding: 4px 8px;
`;
const StTitlearea = styled.textarea`
  display: block;
  width: 100%;
  height: 50px;
  padding: 15px 16px;
  font-size: 45px;
  word-break: break-all;
  resize: none;
  border: none;
  border-bottom: solid 1px;
`;
const StContentarea = styled.textarea`
  display: block;
  width: 100%;
  height: 600px;
  padding: 15px 16px;
  font-size: 25px;
  word-break: break-all;
  resize: none;
  border: none;
  border-bottom: solid 1px;
`;
