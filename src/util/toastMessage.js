import { toast } from 'react-toastify';

export const customNotify = {
  success: (toastMessage = 'success :)') =>
    toast(toastMessage, {
      type: 'success',
      autoClose: 500,
    }),
  error: (toastMessage = 'error :(') =>
    toast(toastMessage, {
      type: 'error',
      autoClose: 500,
    }),
  warnning: (toastMessage = '다시 시도해 주세요') =>
    toast(toastMessage, {
      type: 'warning',
      autoClose: 500,
    }),
};
