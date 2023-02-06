import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { palette } from '../../styles/palette';
import { createPostApi } from '../../apis/community';
import Tag from '../../components/community/Tag';
import { TAGS } from '../../assets/constants';
import photoFilter from '../../assets/image/photo_filter.png';
import { customNotify } from '../../util/toastMessage';

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
    setTag(e.target.value);
  };
  const onUploadImgHandler = () => {
    setImgSrc({
      upload: imgInputRef.current.files[0],
      preview: URL.createObjectURL(imgInputRef.current.files[0]),
    });
  };
  const onSubmitHandler = async e => {
    if (title === '') {
      return customNotify.warnning('제목을 입력해주세요.');
    }
    if (content === '') {
      return customNotify.warnning('내용을 입력해주세요.');
    }

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
      return customNotify.warnning('태그를 선택해 주세요');
    }
    const res = await createPostApi(formData);
    const postId = res.data.id;
    return navigate(`/donepost/${postId}`);
  };

  return (
    <StCreateContainer>
      <StCreateHeader>
        <h3>글 작성하기</h3>
      </StCreateHeader>
      <form onSubmit={onSubmitHandler}>
        <StTopicArea>
          <h4>주제 선택</h4>
          <span className="section_subtitle">
            작성하려는 글에 맞는 주제를 선택해주세요.
          </span>
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
          maxLength={30}
          value={title}
          onChange={onChangeTitleHandler}
        />
        <div>
          <StContentArea
            placeholder="내용을 작성해 주세요"
            value={content}
            onChange={onChangeContentHandler}
            spellcheck="false"
          />
        </div>
        {/* <StUploadInputPText>+ 사진 업로드</StUploadInputPText> */}
        <div>
          <StTopicArea>
            <h4>사진 추가</h4>
            <span className="section_subtitle">
              버튼을 눌러 사진을 추가할 수 있어요.
            </span>
          </StTopicArea>
          <label htmlFor="image">
            <StUploadImgWrapper>
              <input
                hidden
                id="image"
                ref={imgInputRef}
                type="file"
                onChange={onUploadImgHandler}
              />
              {imgSrc.preview ? (
                <StPrevImg
                  className="profile_image"
                  src={imgSrc.preview}
                  name="uploadImg"
                  alt="uploadImg"
                />
              ) : (
                <StUploadImg>
                  <img src={photoFilter} alt="사진 이미지" />
                  <span>사진 추가</span>
                </StUploadImg>
              )}
            </StUploadImgWrapper>
          </label>
        </div>
        <StSubmitButton type="button" onClick={onSubmitHandler}>
          글 등록하기
        </StSubmitButton>
      </form>
      <ToastContainer
        position="bottom-center" // 알람 위치 지정
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        theme="colored"
        limit={2} // 알람 개수 제한
      />
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
    margin: 5rem 0 4rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.5rem;
      margin: 2rem 0;
    }
  }
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
    color: ${palette.text.gray_7};
  }
`;
const StCreateHeader = styled.div`
  margin-top: 32px;
  text-align: center;
  width: 100%;
  h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 500px) {
      font-size: 1.8rem;
      margin: 0;
    }
  }
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
  .section_subtitle {
    font-size: 1.1rem;
    font-weight: 400;
    color: ${palette.text.gray_7};
  }
`;
const StTitleArea = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  font-size: 26px;
  word-break: break-all;
  word-break: break-all;
  resize: none;
  border: none;
  border-bottom: solid 1px;
  margin-top: 60px;
`;
const StContentArea = styled.textarea`
  display: block;
  width: 100%;
  height: 600px;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  box-sizing: border-box;
  word-break: break-all;
  resize: none;
  border: none;
  border-bottom: solid 1px;
`;
const StSubmitButton = styled.button`
  background-color: ${palette.mainColor};
  color: ${palette.white};
  width: 170px;
  height: 50px;
  border-radius: 8px;
  font-size: 1.1rem;
  border: none;
  margin: auto;
  display: block;
`;
const StUploadImgWrapper = styled.div`
  padding: 24px;
  height: 200px;
  background-color: ${palette.lightGray};
  border-radius: 8px;
  margin-bottom: 24px;
  position: relative;
  cursor: pointer;
`;
const StPrevImg = styled.img`
  height: 100%;
`;
const StUploadImg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 6px 0;
  align-items: center;

  img {
    width: 40px;
    aspect-ratio: 1/1;
  }
  span {
    color: ${palette.borderColor3};
  }
`;
