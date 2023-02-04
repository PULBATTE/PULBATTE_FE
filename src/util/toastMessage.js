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
};
