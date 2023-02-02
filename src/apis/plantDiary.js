import { authInstance, instance } from './axios';

export const getPlantListApi = async () => {
  try {
    const data = await authInstance.get('/api/plantjournals');
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getPlantDetailApi = async plantJournalId => {
  try {
    const data = await authInstance.get(`/api/plantjournal/${plantJournalId}`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const createPlantJournalApi = async formData => {
  try {
    const data = await authInstance.post('/api/plantjournal', formData, {
      headers: {
        'Content-Type': 'multippart/form-data',
      },
    });
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const doneDdayCheckApi = async (plantJournalId, clickTag) => {
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

export const getPlantDiaryListApi = async plantJournalId => {
  try {
    const data = await authInstance.get(
      `/api/plantjournal/diarys/${plantJournalId}`,
    );

    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const postPlantDiaryApi = async (plantJournalId, diaryContent) => {
  try {
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

export const getPlantDiaryApi = async (plantjournalid, plantjournaldiaryid) => {
  try {
    const data = await authInstance.get(
      `/api/plantjournal/diary/${plantjournalid}/${plantjournaldiaryid}`,
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const putPlantDiaryApi = async (
  plantjournalid,
  plantjournaldiaryid,
  content,
) => {
  try {
    const data = await authInstance.put(
      `/api/plantjournal/diary/${plantjournalid}/${plantjournaldiaryid}`,
      {
        content,
      },
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const deletePlantDiaryApi = async (
  plantjournalid,
  plantjournaldiaryid,
) => {
  try {
    const data = await authInstance.delete(
      `/api/plantjournal/diary/${plantjournalid}/${plantjournaldiaryid}`,
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getCalendarDataApi = async plantjournalid => {
  try {
    const data = await authInstance.get(
      `/api/plantjournal/diary/calendar/${plantjournalid}`,
    );
    const returnData = data;
    return returnData;
  } catch (error) {
    throw Error(error);
  }
};
