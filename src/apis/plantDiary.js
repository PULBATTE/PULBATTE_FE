import { authInstance, instance } from './axios';

export const getPlantList = async () => {
  try {
    const data = await authInstance.get('/api/plantjournals');
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getPlantDetail = async plantJournalId => {
  try {
    const data = await authInstance.get(`/api/plantjournal/${plantJournalId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const createPlantJournal = async formData => {
  try {
    console.log(formData);
    const data = await authInstance.post('/api/plantjournal', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const doneDdayCheck = async (plantJournalId, clickTag) => {
  try {
    const temp = await authInstance.post(
      `/api/plantjorunal/${plantJournalId}/click/${clickTag}`,
    );
    const data = JSON.stringify(temp);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getPlantDiaryList = async () => {
  try {
    const data = await authInstance.get('/api/plantjournal/diarys');
    return data;
  } catch (error) {
    throw Error(error);
  }
};

// 실제로 함수가 호출될 때 넘기는 변수값을 인수라고 정의. 매개변수를 순서대로 넘겨받기 때문에 이름은 뭐든 상관 없다.
export const postPlantDiary = async (plantJournalId, diaryContent) => {
  try {
    console.log(plantJournalId, diaryContent);
    const data = await authInstance.post(
      `/api/plantjournal/diary/${plantJournalId}`,
      {
        content: diaryContent,
      },
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getPlantDiary = async (plantjournalid, plantjournaldiaryid) => {
  try {
    const data = await authInstance.get(
      `/api/plantjournal/diary/${plantjournalid}/${plantjournaldiaryid}`,
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const putPlantDiary = async (plantjournalid, plantjournaldiaryid) => {
  try {
    const data = await authInstance.put(
      `/api/plantjournal/diary/${plantjournalid}/${plantjournaldiaryid}`,
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const deletePlantDiary = async (plantjournalid, plantjournaldiaryid) => {
  try {
    const data = await authInstance.delete(
      `/api/plantjournal/diary/${plantjournalid}/${plantjournaldiaryid}`,
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};
