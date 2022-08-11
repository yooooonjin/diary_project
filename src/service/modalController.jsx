export const openModal = (target, showModal) => {
  const newModalState = { ...showModal, [target]: true };
  return newModalState;
};

export const closeModal = (target, showModal) => {
  const newModalState = { ...showModal, [target]: false };
  return newModalState;
};

export const closeAllModal = (target, showModal) => {
  let newModalState = { ...showModal };
  target.forEach((modal) => {
    newModalState = { ...newModalState, [modal]: false };
  });
  return newModalState;
};
