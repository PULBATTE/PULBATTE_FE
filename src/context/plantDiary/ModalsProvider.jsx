import { useState, useMemo } from 'react';
import Modals from './Modals';
import { ModalsDispatchContext, ModalsStateContext } from './ModalsContext';

export function ModalProvider({ children }) {
  const [openedModals, setOpenedModals] = useState([]);
  // state를 Component와  Component에 넘겨줄 props로 지정
  const open = (Component, props) => {
    console.log('Modal provider Open');
    setOpenedModals(moddals => {
      return [...moddals, { Component, props }];
    });
  };

  const close = Component => {
    console.log('Modal provider close');
    setOpenedModals(modals => {
      return modals.filter(modal => {
        return modal.Component !== Component;
      });
    });
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
}
