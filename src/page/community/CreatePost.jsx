import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { palette } from '../../styles/palette';
import { createPostApi } from '../../apis/community';
import Tag from '../../components/community/Tag';
import { TAGS } from '../../assets/constants';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState();
  const [imgSrc, setImgSrc] = useState({
    preview: undefined,
    upload: '',
  });

  const navigate = useNavigate();
  const imgInputRef = useRef(null);
  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
  };
  const onChangeContentHandler = e => {
    setContent(e.target.value);
  };
  const onTagHandler = e => {
    e.preventDefault();
    console.log(e.target.value);
    setTag(e.target.value);
  };
  const onUploadImgHandler = () => {
    console.log('?');
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
    const blob = new Blob([JSON.stringify(request)], {
      type: 'application/json',
    });
    formData.append('request', blob);
    imgSrc.upload && formData.append('image', imgSrc.upload);
    if (!tag) {
      alert('태그를 선택해 주세요');
    }
    const res = await createPostApi(formData);
    console.log(res);
    const postId = res.data.id;
    navigate(`/donepost/${postId}`);
  };

  return (
    <StCreateContainer>
      <StCreateHeader>
        <h3>글 작성하기</h3>
      </StCreateHeader>
      <form onSubmit={onSubmitHandler}>
        <StTopicArea>
          <h4>주제 선택</h4>
          <h5>작성하려는 글에 맞는 주제를 선택해주세요.</h5>
        </StTopicArea>
        <StTagWrapper>
          {TAGS.map(v => (
            <Tag
              key={`${v}_tag_key`}
              active={tag === v} // true
              value={v}
              onClick={onTagHandler}
            >
              {v}
            </Tag>
          ))}
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
  max-width: 1280px;
  padding: 4rem 0 2rem;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.8rem;
      margin-top: 45px;
    }
  }
  /* margin: 0 auto;
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
  } */
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  margin: 50px;
  max-width: 1372px;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  h4 {
    font-size: 26px;
    color: #767676;
  }
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
  background-color: ${palette.mainColor};
  color: ${palette.white};
  width: 308px;
  height: 72px;
  border: none;
  font-size: 24px;
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
  background-color: ${palette.inputTextColor};
  font-size: 14px;
  color: ${palette.white};
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
