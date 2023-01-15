import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { createRef, useState, useRef } from 'react';
import { ChevronLeft } from '../../assets/svgs';
import { palette } from '../../styles/palette';
import { createPostApi } from '../../apis/community';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [imgSrc, setImgSrc] = useState({
    preview: undefined,
    upload: '',
  });
  const navigate = useNavigate();

  const imgInputRef = useRef(null);

  console.log({ imgInputRef });
  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
  };
  const onChangeContentHandler = e => {
    setContent(e.target.value);
  };
  // button value : Qa, 자랑, etc, 추천
  const onTagHandler = e => {
    e.preventDefault();
    setTag(e.target.value);
  };
  const onUploadImgHandler = () => {
    console.log({ imgInputRef });
    setImgSrc({
      upload: imgInputRef.current.files[0],
      preview: URL.createObjectURL(imgInputRef.current.files[0]),
    });
  };
  const onSubmitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    const request = {
      title,
      content,
      tag,
    };
    console.log(request);
    const blob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });
    console.log(blob);
    formData.append('image', blob);
    imgSrc.upload && formData.append('multipartFile', imgSrc.upload);
    const res = await createPostApi(formData);
    console.log(res);
    navigate('/');
  };
  return (
    <StCreateContainer>
      <StCreateHeader>
        <StChevronWrpper>
          <ChevronLeft />
        </StChevronWrpper>
        <h3>글 작성하기</h3>
      </StCreateHeader>
      <form onSubmit={onSubmitHandler}>
        <StTopicArea>
          <h4>주제 선택</h4>
          <h5>작성하려는 글에 맞는 주제를 선택해주세요.</h5>
        </StTopicArea>
        <StTagWrapper>
          <StTagButton value="QA" onClick={onTagHandler}>
            질문과 답변
          </StTagButton>
          <StTagButton value="contest" onClick={onTagHandler}>
            식물자랑
          </StTagButton>
          <StTagButton value="etc" onClick={onTagHandler}>
            기타
          </StTagButton>
          <StTagButton value="recommend" onClick={onTagHandler}>
            추천
          </StTagButton>
        </StTagWrapper>
        <StTitleArea
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={onChangeTitleHandler}
        />
        <div>
          <StContentArea
            placeholder="내용을 작성해 주세요"
            value={content}
            onChange={onChangeContentHandler}
          />
        </div>
        <label>
          <StUploadInputPText>+ 사진 업로드</StUploadInputPText>
          <input
            hidden
            ref={imgInputRef}
            type="file"
            onChange={onUploadImgHandler}
          />
        </label>
        {imgSrc.preview && (
          <StUploadImgWrapper>
            <StPrevImg
              className="profile_image"
              src={imgSrc.preview}
              name="uploadImg"
              alt="uploadImg"
            />
          </StUploadImgWrapper>
        )}

        <StSubmitButton onClick={onSubmitHandler}>글 등록하기</StSubmitButton>
      </form>
    </StCreateContainer>
  );
}

const StCreateContainer = styled.div`
  margin: 0 auto;
  padding: 0px 50px;
  margin-top: 84px;
  margin-bottom: 84px;
  width: 1280px;
  h3 {
    font-size: 30px;
    text-align: center;
  }
  h4 {
    font-size: 26px;
  }
  @media (max-width: 1280px) {
    padding: 0px 20px;
    width: 100%;
  }
`;
const StChevronWrpper = styled.div`
  float: left;
`;
const StCreateHeader = styled.div`
  margin-top: 32px;
  text-align: center;
  width: 100%;
`;
const StTagWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-flow: wrap;
`;
const StTagButton = styled.button`
  background-color: #ebf1ec;
  font-size: 14px;
  color: #a3a3a3;
  border-radius: 30px;
  border: none;
  padding: 4px 8px;
  width: 112px;
  height: 36px;
  :focus {
    background-color: #bacdc6;
    color: #fff;
    font-weight: bold;
  }
`;
const StTopicArea = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const StTitleArea = styled.textarea`
  display: block;
  width: 100%;
  height: 50px;
  font-size: 45px;
  word-break: break-all;
  resize: none;
  border: none;
  border-bottom: solid 1px;
  margin-top: 80px;
`;
const StContentArea = styled.textarea`
  display: block;
  width: 100%;
  height: 600px;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 25px;
  word-break: break-all;
  resize: none;
  border: none;
  border-bottom: solid 1px;
`;

const StSubmitButton = styled.button`
  background-color: #47ad8e;
  width: 308px;
  height: 72px;
  border: none;
  font-size: 24px;
  color: white;
  margin: auto;
  display: block;
`;

const StUploadImgWrapper = styled.div`
  width: 100%;
  padding: 24px;
  height: 200px;
  background-color: ${palette.lightGray};
  border-radius: 8px;
  margin-bottom: 24px;
`;

const StUploadInputPText = styled.p`
  background-color: #bacdc6;
  font-size: 14px;
  color: #fff;
  border-radius: 30px;
  font-weight: bold;
  border: none;
  padding: 4px 8px;
  width: 112px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StPrevImg = styled.img`
  height: 100%;
`;
