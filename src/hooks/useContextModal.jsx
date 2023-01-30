import { useContext } from 'react';
import { ModalsDispatchContext } from '../context/plantDiary/ModalsContext';

export default function useContextModal() {
  const { open, close } = useContext(ModalsDispatchContext);
  const openModal = (Component, props) => {
    open(Component, props);
  };
  const closeModal = Component => {
    close(Component);
  };
  return {
    openModal,
    closeModal,
  };
}
