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
    const data = await authInstance.post(
      `/api/plantjorunal/${plantJournalId}/click/${clickTag}`,
    );
    return data;
  } catch (error) {
    throw Error(error);
  }
};
