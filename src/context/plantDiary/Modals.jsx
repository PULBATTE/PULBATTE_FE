/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from './ModalsContext';

import CreateDiaryModal from '../../components/plantdiary/modal/CreateDiaryModal';
import EditDiaryModal from '../../components/plantdiary/modal/EditDiaryModal';

export const modals = {
  CreateDiaryModal,
  EditDiaryModal,
};

export default function Modals() {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;
    const onClose = () => {
      close(Component);
    };
    const handleSubmit = async () => {
      if (typeof onSubmit === 'function') {
        await onSubmit();
      }
      onClose();
    };
    return (
      <Component
        {...restProps}
        key={index}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    );
  });
}
