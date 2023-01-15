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
      <StCreateHeader>
        <h3>글 작성하기</h3>
        <StButton>글 등록하기</StButton>
      </StCreateHeader>
      <StTopicarea>
        <h4>주제 선택</h4>
        <h5>작성하려는 글에 맞는 주제를 선택해주세요.</h5>
      </StTopicarea>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  width: 1000px;
  h3 {
    font-size: 30px;
    text-align: center;
  }
  h4 {
    font-size: 26px;
  }
`;
const StCreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const StButton = styled.button`
  background-color: #e8e8e8;
  font-size: 25px;
  border-radius: 30px;
  border: none;
  padding: 4px 8px;
  width: 189px;
  height: 61px;
`;
const StTopicarea = styled.div`
  display: flex;
  justify-content: left;
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
