import React, { useState } from 'react'; // eslint-disable-line no-unused-vars

const useModal = () => {
  const [modal, setModal] = useState(false);
  const handler = () => {
    setModal(!modal);
    modal
      ? (document.body.style.overflowY = 'visible')
      : (document.body.style.overflowY = 'hidden');
  };

  return [modal, handler];
};

export default useModal;
